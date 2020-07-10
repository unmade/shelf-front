import { buffers, eventChannel, END } from 'redux-saga';
import {
  call,
  put,
  select,
  take,
  takeEvery,
} from 'redux-saga/effects';

import API_BASE_URL from '../api-config';
import * as actions from '../actions/uploads';
import { getAccessToken } from '../reducers/auth';

function createUploadFileChannel(url, accessToken, file) {
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
    formData.append('file', file.file);
    formData.append('path', '.');

    xhr.send(formData);
    return () => {
      xhr.upload.removeEventListener('progress', onProgress);
      xhr.upload.removeEventListener('error', onFailure);
      xhr.upload.removeEventListener('abort', onFailure);
      xhr.onreadystatechange = null;
      xhr.abort();
    };
  }, buffers.sliding(2));
}

function* uploadFile({ payload }) {
  const url = `${API_BASE_URL}/files/upload`;
  const { file } = payload;
  const accessToken = yield select(getAccessToken);
  const channel = yield call(createUploadFileChannel, url, accessToken, file);
  while (true) {
    const { progress = 0, err, success } = yield take(channel);
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

export default [
  takeEvery(actions.types.UPLOAD_FILE, uploadFile),
];
