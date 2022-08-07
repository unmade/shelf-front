import { put, select, takeEvery } from 'redux-saga/effects';

import * as api from '../api';
import { fulfilled } from '../actions';
import { started, loaded } from '../actions/loading';
import * as authActions from '../actions/auth';
import * as actions from '../actions/users';

import { getAccessToken } from '../reducers/auth';

import tryFetch from './_try';

function* addBookmark({ type, payload }) {
  const accessToken = yield select(getAccessToken);
  const { fileId } = payload;

  const request = api.post('/users/bookmarks/add', accessToken, { id: fileId });

  yield put(started(type, fileId));
  yield tryFetch(type, request);
  yield put(loaded(type, fileId));
}

function* listBookmarks({ type }) {
  const accessToken = yield select(getAccessToken);
  if (accessToken == null) {
    return;
  }

  const request = api.get('/users/bookmarks/list', accessToken);

  yield put(started(type));
  yield tryFetch(type, request);
  yield put(loaded(type));
}

function* removeBookmark({ type, payload }) {
  const accessToken = yield select(getAccessToken);
  const { fileId } = payload;

  const request = api.post('/users/bookmarks/remove', accessToken, { id: fileId });

  yield put(started(type, fileId));
  yield tryFetch(type, request);
  yield put(loaded(type, fileId));
}

export default [
  takeEvery(actions.addBookmark, addBookmark),
  takeEvery(actions.listBookmarks, listBookmarks),
  takeEvery(actions.removeBookmark, removeBookmark),
  takeEvery(fulfilled(authActions.signIn), listBookmarks),
];
