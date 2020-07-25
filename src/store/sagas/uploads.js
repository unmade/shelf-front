import {
  END,
  buffers,
  channel,
  eventChannel,
} from 'redux-saga';
import {
  call,
  fork,
  put,
  select,
  take,
} from 'redux-saga/effects';

import API_BASE_URL from '../api-config';
import * as actions from '../actions/uploads';
import { getAccessToken } from '../reducers/auth';

const MAX_PARALLEL_UPLOADS = 3;

// taken from: https://decembersoft.com/posts/file-upload-progress-with-redux-saga/
function createUploadFileChannel(url, accessToken, fileObj, fullPath) {
  return eventChannel((emitter) => {
    const xhr = new XMLHttpRequest();
    const onProgress = (event) => {
      if (event.lengthComputable) {
        const progress = Math.ceil(100 * (event.loaded / event.total));
        emitter({ progress });
      }
    };

    const onFailure = () => {
      emitter({ err: new Error('Upload failed') });
      emitter(END);
    };

    xhr.upload.addEventListener('progress', onProgress);
    xhr.upload.addEventListener('error', onFailure);
    xhr.upload.addEventListener('abort', onFailure);
    xhr.onreadystatechange = () => {
      const { readyState, status } = xhr;
      if (readyState === 4) {
        if (status === 200) {
          emitter({ success: true });
          emitter(END);
        } else {
          onFailure(null);
        }
      }
    };
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);

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
  }, buffers.sliding(3));
}

function* getFileObj(file) {
  if (file.fileObj) {
    return file.fileObj;
  }
  const resolveFile = new Promise((resolve, reject) => file.fileEntry.file(resolve, reject));
  return yield resolveFile;
}

function getFullPath(file) {
  if (file.fileObj) {
    return `${file.baseDir}${file.name}`;
  }
  return `${file.baseDir}${file.fileEntry.fullPath}`;
}

function* uploadFile(file) {
  const url = `${API_BASE_URL}/files/upload`;
  const accessToken = yield select(getAccessToken);
  const fileObj = yield getFileObj(file);
  const fullPath = getFullPath(file);
  const chan = yield call(createUploadFileChannel, url, accessToken, fileObj, fullPath);

  yield put(actions.uploadRequest(file));
  while (true) {
    const { progress = 0, err, success } = yield take(chan);
    if (err) {
      yield put(actions.uploadFailure(file, err));
      return;
    }
    if (success) {
      yield put(actions.uploadSuccess(file));
      return;
    }
    yield put(actions.uploadProgress(file, progress));
  }
}

function* handleUpload(queue) {
  while (true) {
    const file = yield take(queue);
    yield uploadFile(file);
  }
}

function* uploadsWatcher() {
  const queue = yield call(channel);

  for (let i = 0; i < MAX_PARALLEL_UPLOADS; i++) {
    yield fork(handleUpload, queue);
  }

  while (true) {
    const action = yield take(actions.types.ADD_UPLOAD_FILES);
    const files = action.payload;
    for (let i = 0; i < files.length; i++) {
      yield put(queue, files[i]);
    }
  }
}

export default [
  uploadsWatcher(),
];
