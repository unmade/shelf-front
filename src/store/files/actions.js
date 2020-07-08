import {
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';

import API_BASE_URL from '../api-config';

import { getAccessToken } from '../auth/selectors';

const LIST_FILES = "LIST_FILES";
export const LIST_FILES_REQUEST = "LIST_FILES_REQUEST";
export const LIST_FILES_SUCCESS = "LIST_FILES_SUCCESS";
export const LIST_FILES_FAILURE = "LIST_FILES_FAILURE";

const UPLOAD_FILE = 'UPLOAD_FILE';


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


function* uploadFileSaga({ payload }) {
  const { file } = payload;

  const url = `${API_BASE_URL}/files/upload`;
  const accessToken = yield select(getAccessToken);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('path', '.');

  const options = {
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    body: formData,
    mode: 'cors',
    cache: 'default',
  };

  yield fetch(url, options);
}


export const filesSagas = [
  takeEvery(LIST_FILES, listFilesSaga),
  takeEvery(UPLOAD_FILE, uploadFileSaga),
];
