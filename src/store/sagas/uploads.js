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

const MAX_PARALLEL_UPLOADS = 1;

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
          emitter({ response: JSON.parse(xhr.response) });
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
  }, buffers.sliding(MAX_PARALLEL_UPLOADS));
}

function* getFileObj(upload) {
  if (upload.fileObj) {
    return upload.fileObj;
  }
  const resolveFile = new Promise((resolve, reject) => upload.fileEntry.file(resolve, reject));
  return yield resolveFile;
}

function getFullPath(upload) {
  if (upload.fileObj) {
    return `${upload.baseDir}${upload.name}`;
  }
  return `${upload.baseDir}${upload.fileEntry.fullPath}`;
}

function* uploadFile(upload) {
  const url = `${API_BASE_URL}/files/upload`;
  const accessToken = yield select(getAccessToken);
  let fileObj;
  try {
    fileObj = yield getFileObj(upload);
  } catch (err) {
    console.log(err);
    yield put(actions.uploadFailure(upload, err));
    return;
  }
  const fullPath = getFullPath(upload);
  const chan = yield call(createUploadFileChannel, url, accessToken, fileObj, fullPath);

  yield put(actions.uploadRequest(upload));
  while (true) {
    const { progress = 0, err, response } = yield take(chan);
    if (err) {
      yield put(actions.uploadFailure(upload, err));
      return;
    }
    if (response) {
      yield put(actions.uploadSuccess(upload, response));
      return;
    }
    yield put(actions.uploadProgress(upload, progress));
  }
}

function* handleUpload(queue) {
  while (true) {
    const upload = yield take(queue);
    yield uploadFile(upload);
  }
}

function* uploadsWatcher() {
  const queue = yield call(channel);

  for (let i = 0; i < MAX_PARALLEL_UPLOADS; i++) {
    yield fork(handleUpload, queue);
  }

  while (true) {
    const action = yield take(actions.types.ADD_UPLOAD_FILES);
    const { uploads } = action.payload;
    for (let i = 0; i < uploads.length; i++) {
      yield put(queue, uploads[i]);
    }
  }
}

export default [
  uploadsWatcher(),
];
