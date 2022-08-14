import { put, select, takeEvery } from 'redux-saga/effects';

import * as api from '../api';
import * as actions from '../actions/accounts';
import { started, loaded } from '../actions/loading';
import { getAccessToken } from '../reducers/auth';

import tryFetch from './_try';

function* getSpaceUsage({ type }) {
  const accessToken = yield select(getAccessToken);

  const request = api.get('/accounts/get_space_usage', accessToken);

  yield put(started(type));
  yield tryFetch(type, request);
  yield put(loaded(type));
}

function* listAccounts({ type, payload }) {
  const accessToken = yield select(getAccessToken);

  const { page, perPage } = payload;
  const request = api.get(`/accounts/list_all?page=${page}&per_page=${perPage}`, accessToken);

  yield put(started(type));
  yield tryFetch(type, request);
  yield put(loaded(type));
}

function* retrieveCurrentAccount({ type }) {
  const accessToken = yield select(getAccessToken);

  const request = api.get('/accounts/get_current', accessToken);

  yield put(started(type));
  yield tryFetch(type, request);
  yield put(loaded(type));
}

export default [
  takeEvery(actions.getSpaceUsage, getSpaceUsage),
  takeEvery(actions.listAccounts, listAccounts),
  takeEvery(actions.retrieveCurrentAccount, retrieveCurrentAccount),
];
