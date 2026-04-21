import { nanoid } from '@reduxjs/toolkit';
import type { ListenerEffectAPI } from '@reduxjs/toolkit';
import { matchPath } from 'react-router';

import { Mutex } from 'async-mutex';
import axios from 'axios';

import { MediaType, MEDIA_TYPE_EXT, REFRESH_ACCESS_TOKEN_ON_UPLOAD_DELTA } from '@/constants';
import * as routes from '@/routes';

import { API_BASE_URL } from '@/store/apiSlice';
import {
  selectAccessToken,
  selectAccessTokenRefreshedAt,
  selectRefreshToken,
  signedOut,
  tokenRefreshed,
} from '@/store/authSlice';
import { selectFeatureUploadFileMaxSize, selectPhotosLibraryPath } from '@/store/features';
import { filesAdapter, filesApi, selectListFolderData, type FileSchema } from '@/store/files';
import { mediaItemsAdapter, photosApi } from '@/store/mediaItems';

import type { AppDispatch, RootState } from '@/store/store';
import type { IUpload } from '@/types/files';
import type { IMediaItem } from '@/types/photos';

import { uploadsAdded, uploadRejected, uploadFulfilled, uploadProgressed } from './slice';
import type { IFileEntriesAddedPayload } from './slice';

const mutex = new Mutex();

interface StoreAPI {
  dispatch: AppDispatch;
  getState: () => RootState;
}

interface RefreshTokenResult {
  accessToken: string;
  refreshToken: string;
}

function hasExtension(name: string, extensions: string[]): boolean {
  const lowerCasedName = name.toLowerCase();
  return extensions.some((extension) => lowerCasedName.endsWith(extension));
}

async function normalize(
  entry: FileSystemFileEntry | File,
  uploadTo: string,
  maxUploadSize: number,
  allowedMediaTypes: string[] | undefined,
  photosLibraryPath: string,
): Promise<[IUpload, File]> {
  const upload: IUpload = {
    id: nanoid(),
    name: entry.name,
    mediatype: null,
    uploadPath: `${uploadTo}/${entry.name}`,
    parentPath: '',
    progress: 0,
    thumbnail: null,
    mtime: null,
    error: null,
    done: false,
  };

  let fileObj: File;

  if (entry instanceof File) {
    fileObj = entry;
  } else {
    upload.uploadPath = `${uploadTo}${entry.fullPath}`;
    try {
      fileObj = await new Promise<File>((resolve, reject) => {
        entry.file(resolve, reject);
      });
    } catch {
      upload.error = { code: 'badFile' };
      return [upload, new File([], entry.name)];
    }
  }

  upload.mediatype = fileObj.type;
  upload.mtime = fileObj.lastModified;

  if (uploadTo === photosLibraryPath) {
    const dt = upload.mtime ? new Date(upload.mtime) : new Date();
    const year = dt.getUTCFullYear();
    const month = `0${dt.getUTCMonth() + 1}`.slice(-2);
    upload.uploadPath = `${uploadTo}/${year}/${month}/${upload.name}`;
  }

  upload.parentPath = routes.parent(upload.uploadPath) ?? '';

  if (allowedMediaTypes) {
    if (!upload.mediatype) {
      const extensions = allowedMediaTypes.flatMap(
        (type) => (MEDIA_TYPE_EXT as Record<string, string[]>)[type] ?? [],
      );
      if (!hasExtension(upload.name, extensions)) {
        upload.error = { code: 'unsupportedMediaType' };
      }
    } else if (!allowedMediaTypes.includes(upload.mediatype)) {
      upload.error = { code: 'unsupportedMediaType' };
    }
  }

  if (!upload.error && MediaType.isImage(upload.mediatype ?? '')) {
    upload.thumbnail = URL.createObjectURL(fileObj);
  }

  if (fileObj.size > maxUploadSize) {
    upload.error = { code: 'uploadTooLarge' };
  }

  return [upload, fileObj];
}

function updateListFolderCache(file: FileSchema, { dispatch, getState }: StoreAPI): void {
  const { path, size } = file;

  // When uploading a folder we need to re-fetch files in the current path for the folder to appear.
  // Consider the case when user uploads a `Scans/img.jpeg` to the `Documents` folder. Thus,
  // we need to add 'Scans' folder to the `listFolder('Documents')` cache. But the upload endpoint
  // returns data about uploaded file. So, we need to re-fetch files in the current path in order
  // for missing folders to appear.
  const invalidatesTags: { type: 'Files'; id: string }[] = [];
  const match = matchPath(routes.FILES.route, window.location.pathname);
  if (match != null) {
    const { '*': dirPath } = match.params;
    const currentPath = dirPath === '' ? '.' : dirPath!;

    const files = filesAdapter
      .getSelectors((state: RootState) => selectListFolderData(state, currentPath))
      .selectAll(getState());

    const paths = new Set(Object.values(files).map((entry) => entry.path.toLowerCase()));
    paths.add(file.name.toLowerCase());
    const existingPath = routes.parents(path).filter((entry) => paths.has(entry.toLowerCase()));
    if (existingPath.length === 0) {
      invalidatesTags.push({ type: 'Files', id: currentPath });
    }
  }

  if (invalidatesTags.length) {
    dispatch(filesApi.util.invalidateTags(invalidatesTags));
  }

  const { selectAll } = filesAdapter.getSelectors();
  routes.parents(path).forEach((pathToUpdate) =>
    dispatch(
      filesApi.util.updateQueryData('listFolder', routes.parent(pathToUpdate)!, (draft) => {
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
    filesApi.util.updateQueryData('listFolder', routes.parent(path)!, (draft) => {
      if (draft != null) {
        filesAdapter.upsertOne(draft, file);
      }
    }),
  );
}

function updateMediaItemsCache(
  file: FileSchema,
  upload: IUpload,
  { dispatch, getState }: StoreAPI,
): void {
  const match = matchPath(routes.PHOTOS.route, window.location.pathname);
  if (match == null) {
    return;
  }

  const mediaItem: IMediaItem = {
    id: file.id,
    name: file.name,
    size: file.size,
    mediaType: file.mediatype,
    takenAt: null,
    createdAt: file.modified_at,
    modifiedAt: file.modified_at,
    thumbnailUrl: upload.thumbnail ?? file.thumbnail_url,
    deletedAt: null,
  };

  for (const { endpointName, originalArgs } of photosApi.util.selectInvalidatedBy(getState(), [
    { type: 'MediaItems', id: 'list' },
  ])) {
    if (endpointName === 'listMediaItems') {
      dispatch(
        photosApi.util.updateQueryData(endpointName, originalArgs, (draft) => {
          mediaItemsAdapter.addOne(draft, mediaItem);
        }),
      );
    }
  }

  dispatch(
    photosApi.util.updateQueryData('countMediaItems', undefined, (draft) => {
      if (draft.total != null) {
        draft.total += 1;
      }
    }),
  );
}

async function refreshAccessToken(refreshToken: string): Promise<RefreshTokenResult | null> {
  try {
    const { data } = await axios.post<{
      access_token: string;
      refresh_token: string;
    }>(`${API_BASE_URL}/auth/refresh_token`, null, {
      headers: { 'x-shelf-refresh-token': refreshToken },
    });
    return { accessToken: data.access_token, refreshToken: data.refresh_token };
  } catch {
    return null;
  }
}

async function uploadFile(upload: IUpload, fileObj: File, storeAPI: StoreAPI): Promise<void> {
  const { dispatch, getState } = storeAPI;

  if (upload.error) {
    dispatch(uploadRejected({ upload, error: upload.error }));
    return;
  }

  await mutex.waitForUnlock();
  const release = await mutex.acquire();

  try {
    const accessTokenRefreshedAt = selectAccessTokenRefreshedAt(getState());
    const delta = Date.now() - new Date(accessTokenRefreshedAt!).getTime();
    if (delta > Number(REFRESH_ACCESS_TOKEN_ON_UPLOAD_DELTA)) {
      const currentRefreshToken = selectRefreshToken(getState());
      const tokens = await refreshAccessToken(currentRefreshToken!);
      if (tokens == null) {
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
    body.append('mtime', String(upload.mtime! / 1000));

    let prevProgressCeiled = 0;
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
        'X-Request-ID': nanoid(),
      },
      onUploadProgress: ({ progress }: { progress?: number }) => {
        const progressCeiled = Math.ceil(100 * (progress ?? 0));
        if (progressCeiled !== prevProgressCeiled) {
          dispatch(uploadProgressed({ upload, progress: progressCeiled }));
          prevProgressCeiled = progressCeiled;
        }
      },
    };

    let response: Awaited<ReturnType<typeof axios.post<FileSchema>>>;
    try {
      response = await axios.post<FileSchema>(url, body, config);
    } catch {
      dispatch(uploadRejected({ upload, error: { code: 'uploadError' } }));
      return;
    }

    if (response.status !== 200) {
      dispatch(uploadRejected({ upload, error: { code: 'uploadError' } }));
      return;
    }

    dispatch(uploadFulfilled({ upload }));
    updateListFolderCache(response.data, storeAPI);
    updateMediaItemsCache(response.data, upload, storeAPI);
  } finally {
    release();
  }
}

export default async function listenFileEntriesAdded(
  action: { payload: IFileEntriesAddedPayload },
  listenerApi: ListenerEffectAPI<RootState, AppDispatch>,
): Promise<void> {
  const { allowedMediaTypes, files, uploadTo } = action.payload;
  const state = listenerApi.getState();
  const photosLibraryPath = selectPhotosLibraryPath(state);
  const maxUploadSize = selectFeatureUploadFileMaxSize(state);

  const uploads = await Promise.all(
    files.map((file) =>
      normalize(file, uploadTo, maxUploadSize, allowedMediaTypes, photosLibraryPath),
    ),
  );

  listenerApi.dispatch(uploadsAdded({ uploads: uploads.map(([upload]) => upload) }));

  const storeAPI: StoreAPI = {
    dispatch: listenerApi.dispatch,
    getState: listenerApi.getState,
  };

  for (const [upload, fileObj] of uploads) {
    await uploadFile(upload, fileObj, storeAPI);
  }
}
