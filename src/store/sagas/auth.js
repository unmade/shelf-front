import { delay, put, race, select, take, takeEvery, takeLatest } from 'redux-saga/effects';

import * as api from '../api';
import { fulfilled, rejected } from '../actions';
import * as actions from '../actions/auth';
import { started, loaded } from '../actions/loading';
import { getAccessToken, getIsExpired } from '../reducers/auth';

import tryFetch from './_try';

function* refreshToken(action) {
  const accessToken = yield select(getAccessToken);

  const request = api.post('/auth/refresh_token', accessToken);

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
      yield take(fulfilled(actions.signIn));
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

function* signIn(action) {
  const { username, password } = action.payload;

  const body = new URLSearchParams({
    username,
    password,
  });

  const request = api.post('/auth/sign_in', null, body);

  yield put(started(action.type));
  yield tryFetch(action.type, request);
  yield put(loaded(action.type));
}

function* signUp({ type, payload }) {
  const { username, password, confirmPassword } = payload;
  const body = {
    username,
    password,
    confirm_password: confirmPassword,
  };

  const request = api.post('/auth/sign_up', null, body);

  yield put(started(type));
  yield tryFetch(type, request);
  yield put(loaded(type));
}

export default [
  refreshTokenWatcher(),
  takeLatest(actions.signIn, signIn),
  takeLatest(actions.refreshToken, refreshToken),
  takeEvery(actions.signUp, signUp),
];
