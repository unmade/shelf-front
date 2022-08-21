import { nanoid } from '@reduxjs/toolkit';

import { END, buffers, channel, eventChannel } from 'redux-saga';
import { all, call, fork, put, select, take } from 'redux-saga/effects';

import { MediaType } from '../../constants';
import * as routes from '../../routes';

import API_BASE_URL from '../api';
import * as actions from '../actions/uploads';
import { getAccessToken } from '../reducers/auth';

const MAX_PARALLEL_UPLOADS = 1;

// taken from: https://decembersoft.com/posts/file-upload-progress-with-redux-saga/
function createUploadFileChannel({ url, accessToken, requestId, fileObj, fullPath }) {
  return eventChannel((emitter) => {
    const onProgress = (event) => {
      if (event.lengthComputable) {
        emitter({ progress: event.loaded / event.total });
      }
    };

    const onFailure = () => {
      emitter({ error: true });
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
  const url = `${API_BASE_URL}/files/upload`;
  const accessToken = yield select(getAccessToken);
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
      yield put(actions.uploadRejected(upload, requestId, error));
      return;
    }
    if (response) {
      yield put(actions.uploadFulfilled(upload, response));
      return;
    }
    const progressCeiled = Math.ceil(100 * progress);
    if (progressCeiled !== prevProgressCeiled) {
      yield put(actions.uploadProgressed(upload, progressCeiled));
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
  };

  let fileObj = file;

  const { fullPath } = file;
  if (fullPath != null) {
    // must be FileSystemEntry
    try {
      fileObj = yield new Promise((resolve, reject) => file.file(resolve, reject));
      upload.uploadPath = `${uploadTo}${fullPath}`;
      upload.mediatype = fileObj.type;
    } catch (e) {
      upload.error = true;
    }

    if (MediaType.isImage(upload.mediatype)) {
      upload.thumbnail = URL.createObjectURL(fileObj);
    }

    upload.parentPath = routes.parent(fullPath);
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
    const action = yield take(actions.fileEntriesAdded);
    const { files, uploadTo } = action.payload;
    const uploads = yield all(files.map((file) => normalize(file, uploadTo)));
    yield put(actions.uploadsAdded(uploads.map(([upload]) => upload)));
    yield all(uploads.map((upload) => put(queue, upload)));
  }
}

export default [uploadsWatcher()];
