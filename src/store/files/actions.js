import { put, takeEvery } from 'redux-saga/effects';


const LIST_FILES = "LIST_FILES";
export const LIST_FILES_REQUEST = "LIST_FILES_REQUEST";
export const LIST_FILES_SUCCESS = "LIST_FILES_SUCCESS";
export const LIST_FILES_FAILURE = "LIST_FILES_FAILURE";


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
  let url = "http://localhost:8000/files"
  if (path !== null && path !== undefined)
    url = `${url}?path=${path}`

  yield put(listFilesRequest());

  try {
    const response = yield fetch(url, { method: 'GET', mode: 'cors' })
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


export const filesSagas = [
  takeEvery(LIST_FILES, listFilesSaga),
];
