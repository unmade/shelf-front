import {
  put, select, takeEvery,
} from 'redux-saga/effects';

import * as api from '../api';
import { scopes } from '../actions/loading';
import * as actions from '../actions/users';

import { getAccessToken } from '../reducers/auth';

import { tryRequest, tryResponse } from './_try';

function* addBookmark({ payload }) {
  const accessToken = yield select(getAccessToken);
  const { fileId } = payload;

  const request = api.post('/users/bookmarks/add', accessToken, { id: fileId });
  const [response, err] = yield tryRequest(request, scopes.bookmarking);
  if (err !== null) {
    yield put(actions.addBookmarkFailure(err));
    return;
  }

  const [data, parseErr] = yield tryResponse(response.json());
  if (parseErr !== null) {
    yield put(actions.addBookmarkFailure(err));
    return;
  }

  yield put(actions.addBookmarkSuccess(data));
}

function* removeBookmark({ payload }) {
  const accessToken = yield select(getAccessToken);
  const { fileId } = payload;

  const request = api.post('/users/bookmarks/remove', accessToken, { id: fileId });
  const [response, err] = yield tryRequest(request, scopes.bookmarking);
  if (err !== null) {
    yield put(actions.removeBookmarkFailure(err));
    return;
  }

  const [data, parseErr] = yield tryResponse(response.json());
  if (parseErr !== null) {
    yield put(actions.removeBookmarkFailure(err));
    return;
  }

  yield put(actions.removeBookmarkSuccess(data));
}

export default [
  takeEvery(actions.types.ADD_BOOKMARK, addBookmark),
  takeEvery(actions.types.REMOVE_BOOKMARK, removeBookmark),
];
