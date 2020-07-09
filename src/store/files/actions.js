import { buffers, eventChannel, END } from 'redux-saga';
import {
  call,
  put,
  select,
  take,
  takeEvery,
} from 'redux-saga/effects';

import API_BASE_URL from '../api-config';

import { getAccessToken } from '../auth/selectors';

const LIST_FILES = 'LIST_FILES';
export const LIST_FILES_REQUEST = 'LIST_FILES_REQUEST';
export const LIST_FILES_SUCCESS = 'LIST_FILES_SUCCESS';
export const LIST_FILES_FAILURE = 'LIST_FILES_FAILURE';

export const UPLOAD_FILE = 'UPLOAD_FILE';
export const ADD_UPLOAD_FILES = 'ADD_UPLOAD_FILES';


function listFilesRequest() {
  return {
    type: LIST_FILES_REQUEST,
    payload: null,
  };
};


function listFilesSuccess(payload) {
  return {
    type: LIST_FILES_SUCCESS,
    payload: payload,
  };
};


function listFilesFailure(payload) {
  return {
    type: LIST_FILES_FAILURE,
    payload: payload,
  };
};


export function listFiles({ path }) {
  return {
    type: LIST_FILES,
    payload: {
      path,
    },
  };
};


function* listFilesSaga({ payload }) {
  const { path } = payload;
  const accessToken = yield select(getAccessToken);
  let url = `${API_BASE_URL}/files/list_folder`
  const options = {
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ path: path || "." }),
    mode: 'cors',
    cache: 'default',
  };

  yield put(listFilesRequest());

  try {
    const response = yield fetch(url, options)
    const data = yield response.json();
    if (response.ok) {
      yield put(listFilesSuccess(data));
    } else {
      yield put(listFilesFailure(data));
    }
  } catch (e) {
      yield put(listFilesFailure(e));
  }
};


export function uploadFile({ file }) {
  return {
    type: UPLOAD_FILE,
    payload: {
      file,
    },
  };
}


export function addUploadFiles(files) {
  return {
    type: ADD_UPLOAD_FILES,
    payload: files,
  };
}


// function* uploadFileSaga({ payload }) {
//   const { file } = payload;

//   const url = `${API_BASE_URL}/files/upload`;
//   const accessToken = yield select(getAccessToken);

//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('path', '.');

//   const options = {
//     method: 'POST',
//     headers: {
//       authorization: `Bearer ${accessToken}`,
//     },
//     body: formData,
//     mode: 'cors',
//     cache: 'default',
//   };

//   yield fetch(url, options);
// }

const UPLOAD_FAILURE = 'UPLOAD_FAILURE';
const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const UPLOAD_PROGRESS = 'UPLOAD_PROGRESS';

const uploadFailure = () => ({
  type: UPLOAD_FAILURE,
  payload: null,
});

const uploadSuccess = () => ({
  type: UPLOAD_SUCCESS,
  payload: null,
});

const uploadProgress = (file, progress) => ({
  type: UPLOAD_PROGRESS,
  payload: {
    file,
    progress,
  },
});

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
      yield put(uploadFailure(file, err));
      return;
    }
    if (success) {
      yield put(uploadSuccess(file));
      return;
    }
    yield put(uploadProgress(file, progress));
  }
}

function* uploadFileSaga({ payload }) {
  yield call(uploadFileDelegate, payload);
}

export const filesSagas = [
  takeEvery(LIST_FILES, listFilesSaga),
  takeEvery(UPLOAD_FILE, uploadFileSaga),
];
