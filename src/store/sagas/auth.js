import { delay, put, race, select, take, takeLatest } from 'redux-saga/effects';

import * as api from '../api';
import * as actions from '../actions/auth';
import { scopes } from '../actions/loading';
import { getAccessToken, getIsExpired } from '../reducers/auth';

import { tryRequest, tryResponse } from './_try';

function* refreshToken() {
  const accessToken = yield select(getAccessToken);

  const request = api.put('/auth/tokens', accessToken);
  const [response, err] = yield tryRequest(request);
  if (err !== null) {
    yield put(actions.refreshTokenFailure(err));
    return;
  }

  const [data, parseErr] = yield tryResponse(response.json());
  if (parseErr !== null) {
    yield put(actions.refreshTokenFailure(err));
    return;
  }

  yield put(actions.refreshTokenSuccess(data));
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
      yield take(actions.types.SIGN_IN_SUCCESS);
    }

    yield delay(expiresIn);

    yield put(actions.refreshToken());
    yield race({
      success: take(actions.types.REFRESH_TOKEN_SUCCESS),
      failure: take(actions.types.REFRESH_TOKEN_FAILURE),
      signedOut: take(actions.types.SIGN_OUT),
    });
    expiresIn = refreshRate;
  }
}

function* signIn({ payload }) {
  const { username, password } = payload;

  const body = new URLSearchParams({
    username,
    password,
  });

  const request = api.post('/auth/tokens', null, body);

  const [response, err] = yield tryRequest(request, scopes.signingIn);
  if (err !== null) {
    yield put(actions.signInFailure(err));
    return;
  }

  const [data, parseErr] = yield tryResponse(response.json());
  if (parseErr !== null) {
    yield put(actions.signInFailure(err));
    return;
  }

  yield put(actions.signInSuccess(data));
}

export default [
  refreshTokenWatcher(),
  takeLatest(actions.types.REFRESH_TOKEN, refreshToken),
  takeLatest(actions.types.SIGN_IN, signIn),
];
