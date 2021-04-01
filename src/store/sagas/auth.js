import {
  delay,
  put,
  race,
  select,
  take,
  takeEvery,
} from 'redux-saga/effects';

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

  let accessToken = yield select(getAccessToken);
  let isExpired = yield select(getIsExpired);

  while (true) {
    if (!accessToken || isExpired) {
      yield take(actions.types.SIGN_IN_SUCCESS);
      accessToken = yield select(getAccessToken);
    }

    const { expired } = yield race({
      expired: delay(expiresIn),
    });

    if (expired) {
      yield put(actions.refreshToken());
      const { success, failure, signedOut } = yield race({
        success: take(actions.types.REFRESH_TOKEN_SUCCESS),
        failure: take(actions.types.REFRESH_TOKEN_FAILURE),
        signedOut: take(actions.types.SIGN_OUT),
      });
      if (success) {
        accessToken = yield select(getAccessToken);
        isExpired = yield select(getIsExpired);
        expiresIn = refreshRate;
      }
      if (failure || signedOut) {
        // if something goes wrong, just stop refreshing
        accessToken = null;
        expiresIn = 30 * 1000; // 30 seconds
      }
    }
  }
}

function* retrieveMe() {
  const accessToken = yield select(getAccessToken);

  const request = api.get('/auth/me', accessToken);
  const [response, err] = yield tryRequest(request);
  if (err !== null) {
    yield put(actions.retrieveMeFailure(err));
    return;
  }

  const [data, parseErr] = yield tryResponse(response.json());
  if (parseErr !== null) {
    yield put(actions.retrieveMeFailure(err));
    return;
  }

  yield put(actions.retrieveMeSuccess(data));
}

function* signIn({ payload }) {
  const { username, password } = payload;

  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);

  const request = api.post('/auth/tokens', null, formData);

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
  takeEvery(actions.types.REFRESH_TOKEN, refreshToken),
  takeEvery(actions.types.RETRIEVE_ME, retrieveMe),
  takeEvery(actions.types.SIGN_IN, signIn),
];
