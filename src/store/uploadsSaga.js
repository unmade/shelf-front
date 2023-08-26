import { nanoid } from '@reduxjs/toolkit';

import { END, buffers, channel, eventChannel } from 'redux-saga';
import { all, call, fork, put, select, take } from 'redux-saga/effects';

import { matchPath } from 'react-router-dom';

import { MediaType } from '../constants';
import * as routes from '../routes';

import apiSlice, { API_BASE_URL } from './apiSlice';
import { selectAccessToken } from './authSlice';
import { selectFeatureValue } from './features';
import { filesAdapter, selectListFolderData } from './files';
import {
  fileEntriesAdded,
  uploadsAdded,
  uploadProgressed,
  uploadFulfilled,
  uploadRejected,
} from './uploads';

const MAX_PARALLEL_UPLOADS = 1;

function* updateListFolderCache(file) {
  const { path, size } = file;
  const { selectAll } = filesAdapter.getSelectors();

  // when uploading a folder we need to re-fetch files in the current path for the folder to appear
  const match = matchPath(routes.FILES.route, window.location.pathname);
  if (match != null) {
    const { '*': dirPath } = match.params;
    const currentPath = dirPath === '' ? '.' : dirPath;
    const files = yield select((state) => {
      const { selectAll: s } = filesAdapter.getSelectors((state_) =>
        selectListFolderData(state_, currentPath)
      );
      return s(state);
    });
    const paths = new Set(Object.values(files).map((entry) => entry.path.toLowerCase()));
    paths.add(file.name.toLowerCase());
    const existingPath = routes.parents(path).filter((entry) => paths.has(entry.toLowerCase()));
    if (existingPath.length === 0) {
      yield put(apiSlice.util.invalidateTags([{ type: 'Files', id: currentPath }]));
    }
  }

  const cacheOptimisticUpdates = routes.parents(path).map((pathToUpdate) =>
    put(
      apiSlice.util.updateQueryData('listFolder', routes.parent(pathToUpdate), (draft) => {
        // we can calculate parents, but we don't know the ID of the parent, so just loop.
        // on average there shouldn't be a lot of files to loop through.
        const entries = selectAll(draft);
        Object.values(entries).forEach((value) => {
          if (value.path === pathToUpdate) {
            filesAdapter.updateOne(draft, { id: value.id, changes: { size: value.size + size } });
          }
        });
      })
    )
  );
  cacheOptimisticUpdates.push(
    put(
      apiSlice.util.updateQueryData('listFolder', routes.parent(path), (draft) => {
        filesAdapter.upsertOne(draft, file);
      })
    )
  );
  yield all(cacheOptimisticUpdates);
}

// taken from: https://decembersoft.com/posts/file-upload-progress-with-redux-saga/
function createUploadFileChannel({ url, accessToken, requestId, fileObj, fullPath }) {
  return eventChannel((emitter) => {
    const onProgress = (event) => {
      if (event.lengthComputable) {
        emitter({ progress: event.loaded / event.total });
      }
    };

    const onFailure = () => {
      emitter({ error: { code: 'uploadError' } });
      emitter(END);
    };

    const xhr = new XMLHttpRequest();
    xhr.upload.addEventListener('progress', onProgress);
    xhr.upload.addEventListener('error', onFailure);
    xhr.upload.addEventListener('abort', onFailure);
    xhr.onreadystatechange = () => {
      const { readyState, status } = xhr;
      if (readyState === 4) {
        if (status === 200) {
          emitter({ response: JSON.parse(xhr.response) });
          emitter(END);
        } else {
          onFailure();
        }
      }
    };

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
    xhr.setRequestHeader('X-Request-ID', requestId);

    const formData = new FormData();
    formData.append('file', fileObj);
    formData.append('path', fullPath);

    xhr.send(formData);
    return () => {
      xhr.upload.removeEventListener('progress', onProgress);
      xhr.upload.removeEventListener('error', onFailure);
      xhr.upload.removeEventListener('abort', onFailure);
      xhr.onreadystatechange = null;
      xhr.abort();
    };
  }, buffers.sliding(MAX_PARALLEL_UPLOADS));
}

function* uploadFile(upload, file) {
  if (upload.error) {
    yield put(uploadRejected(upload, null, upload.error));
    return;
  }

  const url = `${API_BASE_URL}/files/upload`;
  const accessToken = yield select(selectAccessToken);
  const requestId = nanoid();
  const { uploadPath } = upload;
  const chan = yield call(createUploadFileChannel, {
    url,
    accessToken,
    requestId,
    fileObj: file,
    fullPath: uploadPath,
  });

  let prevProgressCeiled = 0;
  while (true) {
    const { progress = prevProgressCeiled, error, response } = yield take(chan);
    if (error) {
      yield put(uploadRejected({ upload, error }));
      return;
    }
    if (response) {
      yield put(uploadFulfilled({ upload }));
      yield updateListFolderCache(response.file ?? response);
      return;
    }
    const progressCeiled = Math.ceil(100 * progress);
    if (progressCeiled !== prevProgressCeiled) {
      yield put(uploadProgressed({ upload, progress: progressCeiled }));
      prevProgressCeiled = progressCeiled;
    }
  }
}

function* normalize(file, uploadTo) {
  const upload = {
    id: nanoid(),
    name: file.name,
    mediatype: null,
    uploadPath: `${uploadTo}/${file.name}`,
    parentPath: '',
    progress: 0,
    thumbnail: null,
    error: null,
    done: false,
  };

  let fileObj = file;

  const { fullPath } = file;
  if (fullPath != null) {
    // must be FileSystemFileEntry
    try {
      fileObj = yield new Promise((resolve, reject) => file.file(resolve, reject));
      upload.uploadPath = `${uploadTo}${fullPath}`;
      upload.mediatype = fileObj.type;
    } catch (e) {
      upload.error = { code: 'badFile' };
    }

    if (MediaType.isImage(upload.mediatype)) {
      upload.thumbnail = URL.createObjectURL(fileObj);
    }

    upload.parentPath = routes.parent(fullPath);
  }

  const maxUploadSize = yield select(selectFeatureValue, 'upload_file_max_size');
  if (fileObj.size > maxUploadSize) {
    upload.error = { code: 'uploadTooLarge' };
  }

  return [upload, fileObj];
}

function* handleUpload(queue) {
  while (true) {
    const [upload, file] = yield take(queue);
    yield uploadFile(upload, file);
  }
}

function* uploadsWatcher() {
  const queue = yield call(channel);

  for (let i = 0; i < MAX_PARALLEL_UPLOADS; i += 1) {
    yield fork(handleUpload, queue);
  }

  while (true) {
    const action = yield take(fileEntriesAdded);
    const { files, uploadTo } = action.payload;
    const uploads = yield all(files.map((file) => normalize(file, uploadTo)));
    yield put(uploadsAdded({ uploads: uploads.map(([upload]) => upload) }));
    yield all(uploads.map((upload) => put(queue, upload)));
  }
}

export default [uploadsWatcher()];
