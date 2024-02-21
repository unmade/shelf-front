import { nanoid } from '@reduxjs/toolkit';
import { matchPath } from 'react-router-dom';

import { Mutex } from 'async-mutex';
import axios from 'axios';

import { MediaType, MEDIA_TYPE_EXT, REFRESH_ACCESS_TOKEN_ON_UPLOAD_DELTA } from '../../constants';
import * as routes from '../../routes';

import apiSlice, { API_BASE_URL } from '../apiSlice';
import {
  selectAccessToken,
  selectAccessTokenRefreshedAt,
  selectRefreshToken,
  signedOut,
  tokenRefreshed,
} from '../authSlice';
import { selectFeatureUploadFileMaxSize, selectPhotosLibraryPath } from '../features';
import { filesAdapter, selectListFolderData } from '../files';
import { mediaItemsAdapter } from '../photos';

import { uploadsAdded, uploadRejected, uploadFulfilled, uploadProgressed } from './slice';

const mutex = new Mutex();

function hasExtension(name, extensions) {
  const lowerCasedName = name.toLowerCase();
  return extensions.some((extension) => lowerCasedName.endsWith(extension));
}

async function normalize(file, uploadTo, maxUploadSize, allowedMediaTypes, photosLibraryPath) {
  const upload = {
    id: nanoid(),
    name: file.name,
    mediatype: null,
    uploadPath: `${uploadTo}/${file.name}`,
    parentPath: '',
    progress: 0,
    thumbnail: null,
    mtime: null,
    error: null,
    done: false,
  };

  let fileObj = file;

  const { fullPath } = file;
  if (fullPath != null) {
    // must be FileSystemFileEntry
    try {
      fileObj = await new Promise((resolve, reject) => {
        file.file(resolve, reject);
      });
    } catch (e) {
      upload.error = { code: 'badFile' };
    }

    upload.uploadPath = `${uploadTo}${fullPath}`;
  }

  upload.mediatype = fileObj.type;
  upload.mtime = fileObj.lastModified;

  if (uploadTo === photosLibraryPath) {
    const dt = upload.mtime ? new Date(upload.mtime) : new Date();
    const year = dt.getUTCFullYear();
    const month = `0${dt.getUTCMonth() + 1}`.slice(-2);
    upload.uploadPath = `${uploadTo}/${year}/${month}/${upload.name}`;
  }

  upload.parentPath = routes.parent(upload.uploadPath);

  if (allowedMediaTypes) {
    if (!upload.mediatype) {
      const extensions = allowedMediaTypes.map((type) => MEDIA_TYPE_EXT[type]).flat();
      if (!hasExtension(upload.name, extensions)) {
        upload.error = { code: 'unsupportedMediaType' };
      }
    } else if (!allowedMediaTypes.includes(upload.mediatype)) {
      upload.error = { code: 'unsupportedMediaType' };
    }
  }

  if (!upload.error && MediaType.isImage(upload.mediatype)) {
    upload.thumbnail = URL.createObjectURL(fileObj);
  }

  if (fileObj.size > maxUploadSize) {
    upload.error = { code: 'uploadTooLarge' };
  }

  return [upload, fileObj];
}

function updateListFolderCache(file, { dispatch, getState }) {
  const { path, size } = file;

  // When uploading a folder we need to re-fetch files in the current path for the folder to appear.
  // Consider the case when user uploads a `Scans/img.jpeg` to the `Documents` folder. Thus,
  // we need to add 'Scans' folder to the `listFolder('Documents')` cache. But the upload endpoint
  // returns data about uploaded file. So, we need to re-fetch files in the current path in order
  // for missing folders to appear.
  const invalidatesTags = [];
  const match = matchPath(routes.FILES.route, window.location.pathname);
  if (match != null) {
    const { '*': dirPath } = match.params;
    const currentPath = dirPath === '' ? '.' : dirPath;

    const files = filesAdapter
      .getSelectors((state) => selectListFolderData(state, currentPath))
      .selectAll(getState());

    const paths = new Set(Object.values(files).map((entry) => entry.path.toLowerCase()));
    paths.add(file.name.toLowerCase());
    const existingPath = routes.parents(path).filter((entry) => paths.has(entry.toLowerCase()));
    if (existingPath.length === 0) {
      invalidatesTags.push({ type: 'Files', id: currentPath });
    }
  }

  if (invalidatesTags.length) {
    dispatch(apiSlice.util.invalidateTags(invalidatesTags));
  }

  const { selectAll } = filesAdapter.getSelectors();
  routes.parents(path).forEach((pathToUpdate) =>
    dispatch(
      apiSlice.util.updateQueryData('listFolder', routes.parent(pathToUpdate), (draft) => {
        // we don't know the ID of the parent, so loop through and search by path.
        // on average there shouldn't be a lot of files to loop over.
        const entries = selectAll(draft);
        Object.values(entries).forEach((value) => {
          if (value.path === pathToUpdate) {
            filesAdapter.updateOne(draft, { id: value.id, changes: { size: value.size + size } });
          }
        });
      }),
    ),
  );

  dispatch(
    apiSlice.util.updateQueryData('listFolder', routes.parent(path), (draft) => {
      if (draft != null) {
        filesAdapter.upsertOne(draft, file);
      }
    }),
  );
}

function updateMediaItemsCache(file, upload, { dispatch, getState }) {
  // when uploading a folder we need to re-fetch files in the current path for the folder to appear
  const match = matchPath(routes.PHOTOS.route, window.location.pathname);
  if (match == null) {
    return;
  }

  const mediaItem = {
    id: file.id,
    fileId: file.id,
    name: file.name,
    size: file.size,
    modifiedAt: file.modified_at,
    mediatype: file.mediatype,
    thumbnailUrl: upload.thumbnail ?? file.thumbnail_url,
  };

  // eslint-disable-next-line no-restricted-syntax
  for (const { endpointName, originalArgs } of apiSlice.util.selectInvalidatedBy(getState(), [
    { type: 'MediaItems', id: 'list' },
  ])) {
    if (endpointName === 'listMediaItems') {
      dispatch(
        apiSlice.util.updateQueryData(endpointName, originalArgs, (draft) => {
          mediaItemsAdapter.addOne(draft, mediaItem);
        }),
      );
    }
  }

  dispatch(
    apiSlice.util.updateQueryData('countMediaItems', undefined, (draft) => {
      if (draft.total != null) {
        // eslint-disable-next-line no-param-reassign
        draft.total += 1;
      }
    }),
  );
}

async function refreshAccessToken(refreshToken) {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/refresh_token`, null, {
      headers: {
        'x-shelf-refresh-token': refreshToken,
      },
    });
    const { access_token: accessToken, refresh_token: nextRefreshToken } = data;
    return { accessToken, refreshToken: nextRefreshToken };
  } catch (e) {
    return null;
  }
}

async function uploadFile(upload, fileObj, { dispatch, getState }) {
  if (upload.error) {
    dispatch(uploadRejected({ upload, error: upload.error }));
    return;
  }

  await mutex.waitForUnlock();
  const release = await mutex.acquire();

  const accessTokenRefreshedAt = selectAccessTokenRefreshedAt(getState());
  const delta = new Date() - new Date(accessTokenRefreshedAt);
  if (delta > REFRESH_ACCESS_TOKEN_ON_UPLOAD_DELTA) {
    const refreshToken = selectRefreshToken(getState());
    const tokens = await refreshAccessToken(refreshToken);
    if (tokens == null) {
      release();
      dispatch(signedOut());
      return;
    }
    dispatch(tokenRefreshed(tokens));
  }

  const accessToken = selectAccessToken(getState());
  const url = `${API_BASE_URL}/files/upload`;
  const body = new FormData();
  body.append('file', fileObj);
  body.append('path', upload.uploadPath);
  body.append('mtime', upload.mtime / 1000);

  let prevProgressCeiled = 0;

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data',
      'X-Request-ID': nanoid(),
    },
    onUploadProgress: ({ progress }) => {
      const progressCeiled = Math.ceil(100 * progress);
      if (progressCeiled !== prevProgressCeiled) {
        dispatch(uploadProgressed({ upload, progress: progressCeiled }));
        prevProgressCeiled = progressCeiled;
      }
    },
  };

  let response;
  try {
    response = await axios.post(url, body, config);
  } catch (e) {
    dispatch(uploadRejected({ upload, error: { code: 'uploadError' } }));
    return;
  } finally {
    release();
  }

  if (response.status !== 200) {
    dispatch(uploadRejected({ upload, error: { code: 'uploadError' } }));
    return;
  }

  const { data } = response;

  dispatch(uploadFulfilled({ upload }));
  updateListFolderCache(data, { dispatch, getState });
  updateMediaItemsCache(data, upload, { dispatch, getState });
}

async function listenFileEntriesAdded(action, listenerApi) {
  const { allowedMediaTypes, files, uploadTo } = action.payload;
  const photosLibraryPath = selectPhotosLibraryPath(listenerApi.getState());
  const maxUploadSize = selectFeatureUploadFileMaxSize(listenerApi.getState());

  const uploads = await Promise.all(
    files.map(
      async (file) =>
        // eslint-disable-next-line no-return-await
        await normalize(file, uploadTo, maxUploadSize, allowedMediaTypes, photosLibraryPath),
    ),
  );

  listenerApi.dispatch(uploadsAdded({ uploads: uploads.map(([upload]) => upload) }));

  // eslint-disable-next-line no-restricted-syntax
  for (const [upload, fileObj] of uploads) {
    // eslint-disable-next-line no-await-in-loop
    await uploadFile(upload, fileObj, {
      dispatch: listenerApi.dispatch,
      getState: listenerApi.getState,
    });
  }
}

export default listenFileEntriesAdded;
