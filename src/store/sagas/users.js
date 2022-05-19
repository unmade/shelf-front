import { put, select, takeEvery } from 'redux-saga/effects';

import * as api from '../api';
import { fulfilled } from '../actions';
import { scopes } from '../actions/loading';
import * as authActions from '../actions/auth';
import * as actions from '../actions/users';

import { getAccessToken } from '../reducers/auth';

import { tryRequest, tryResponse } from './_try';

function* addBookmark({ payload }) {
  const accessToken = yield select(getAccessToken);
  const { fileId } = payload;

  const request = api.post('/users/bookmarks/add', accessToken, { id: fileId });
  const [response, err] = yield tryRequest(request, scopes.bookmarking);
  if (err !== null) {
    yield put(actions.addBookmarkFailure(err, fileId));
    return;
  }

  const [data, parseErr] = yield tryResponse(response.json());
  if (parseErr !== null) {
    yield put(actions.addBookmarkFailure(err, fileId));
    return;
  }

  yield put(actions.addBookmarkSuccess(data));
}

function* listBookmarks() {
  const accessToken = yield select(getAccessToken);
  if (accessToken == null) {
    return;
  }

  const request = api.get('/users/bookmarks/list', accessToken);
  const [response, err] = yield tryRequest(request, scopes.listingBookmarks);
  if (err !== null) {
    yield put(actions.listBookmarksFailure(err));
    return;
  }

  const [data, parseErr] = yield tryResponse(response.json());
  if (parseErr !== null) {
    yield put(actions.listBookmarksFailure(err));
    return;
  }

  yield put(actions.listBookmarksSuccess(data));
}

function* removeBookmark({ payload }) {
  const accessToken = yield select(getAccessToken);
  const { fileId } = payload;

  const request = api.post('/users/bookmarks/remove', accessToken, { id: fileId });
  const [response, err] = yield tryRequest(request, scopes.bookmarking);
  if (err !== null) {
    yield put(actions.removeBookmarkFailure(err, fileId));
    return;
  }

  const [data, parseErr] = yield tryResponse(response.json());
  if (parseErr !== null) {
    yield put(actions.removeBookmarkFailure(err, fileId));
    return;
  }

  yield put(actions.removeBookmarkSuccess(data));
}

export default [
  takeEvery(actions.types.ADD_BOOKMARK, addBookmark),
  takeEvery(actions.types.LIST_BOOKMARKS, listBookmarks),
  takeEvery(actions.types.REMOVE_BOOKMARK, removeBookmark),
  takeEvery(fulfilled(authActions.issueToken), listBookmarks),
];
