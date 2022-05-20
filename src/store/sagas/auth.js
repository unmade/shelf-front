import { delay, put, race, select, take, takeLatest } from 'redux-saga/effects';

import * as api from '../api';
import { fulfilled, rejected } from '../actions';
import * as actions from '../actions/auth';
import { started, loaded } from '../actions/loading';
import { getAccessToken, getIsExpired } from '../reducers/auth';

import { tryFetch } from './_try';

function* issueToken(action) {
  const { username, password } = action.payload;

  const body = new URLSearchParams({
    username,
    password,
  });

  const request = api.post('/auth/tokens', null, body);

  yield put(started(action.type));
  yield tryFetch(action.type, request);
  yield loaded(action.type);
}

function* refreshToken(action) {
  const accessToken = yield select(getAccessToken);

  const request = api.put('/auth/tokens', accessToken);

  yield tryFetch(action.type, request);
}

function* refreshTokenWatcher() {
  // first refresh happens as soon as possible
  // cause it could be after accidental page reload
  let expiresIn = 5 * 1000; // 5 seconds

  // all next refreshes happen within this interval
  const refreshRate = 10 * 60 * 1000; // 10 minutes

  let accessToken;
  let isExpired;

  while (true) {
    accessToken = yield select(getAccessToken);
    isExpired = yield select(getIsExpired);
    if (!accessToken || isExpired) {
      yield take(fulfilled(actions.issueToken));
    }

    yield delay(expiresIn);

    yield put(actions.refreshToken());
    yield race({
      success: take(fulfilled(actions.refreshToken)),
      failure: take(rejected(actions.refreshToken)),
      signedOut: take(actions.signedOut),
    });
    expiresIn = refreshRate;
  }
}

export default [
  refreshTokenWatcher(),
  takeLatest(actions.issueToken, issueToken),
  takeLatest(actions.refreshToken, refreshToken),
];
