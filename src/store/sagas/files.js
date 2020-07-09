import { buffers, eventChannel, END } from 'redux-saga';
import {
  call,
  put,
  select,
  take,
  takeEvery,
} from 'redux-saga/effects';

import API_BASE_URL from '../api-config';
import * as actions from '../actions/files';
import { getAccessToken } from '../reducers/auth';

function* listFilesSaga({ payload }) {
  const { path } = payload;
  const accessToken = yield select(getAccessToken);
  const url = `${API_BASE_URL}/files/list_folder`;
  const options = {
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ path: path || '.' }),
    mode: 'cors',
    cache: 'default',
  };

  yield put(actions.listFilesRequest());

  try {
    const response = yield fetch(url, options);
    const data = yield response.json();
    if (response.ok) {
      yield put(actions.listFilesSuccess(data));
    } else {
      yield put(actions.listFilesFailure(data));
    }
  } catch (e) {
    yield put(actions.listFilesFailure(e));
  }
}

function createUploadFileChannel(accessToken, file) {
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
    const url = `${API_BASE_URL}/files/upload`;
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

function* uploadFileDelegate(payload) {
  const { file } = payload;
  const accessToken = yield select(getAccessToken);
  const channel = yield call(createUploadFileChannel, accessToken, file);
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

function* uploadFileSaga({ payload }) {
  yield call(uploadFileDelegate, payload);
}

export default [
  takeEvery(actions.types.LIST_FILES, listFilesSaga),
  takeEvery(actions.types.UPLOAD_FILE, uploadFileSaga),
];
