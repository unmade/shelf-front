import {
  delay,
  put,
  race,
  select,
  take,
  takeEvery,
} from 'redux-saga/effects';

import API_BASE_URL from '../api';
import * as actions from '../actions/auth';
import { getAccessToken, getIsExpired } from '../reducers/auth';

function* signInSaga({ payload }) {
  const { username, password } = payload;
  const url = `${API_BASE_URL}/auth/tokens`;

  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);

  const options = {
    method: 'POST',
    body: formData,
    mode: 'cors',
    cache: 'default',
  };

  yield put(actions.signInRequest());

  try {
    const response = yield fetch(url, options);
    const data = yield response.json();
    if (response.ok) {
      yield put(actions.signInSuccess(data));
    } else if (response.status < 500 && data.code) {
      yield put(actions.signInFailure({ errCode: data.code }));
    } else {
      // eslint-disable-next-line no-console
      console.log(response);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}

function* refreshTokenSaga() {
  const url = `${API_BASE_URL}/auth/tokens`;
  const accessToken = yield select(getAccessToken);
  const options = {
    method: 'PUT',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    mode: 'cors',
    cache: 'default',
  };

  yield put(actions.refreshTokenRequest());

  try {
    const response = yield fetch(url, options);
    const data = yield response.json();
    if (response.ok) {
      yield put(actions.refreshTokenSuccess(data));
    } else {
      yield put(actions.refreshTokenFailure(data));
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
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
      const { success, failure } = yield race({
        success: take(actions.types.REFRESH_TOKEN_SUCCESS),
        failure: take(actions.types.REFRESH_TOKEN_FAILURE),
      });
      if (success) {
        accessToken = yield select(getAccessToken);
        isExpired = yield select(getIsExpired);
        expiresIn = refreshRate;
      }
      if (failure) {
        // if something goes wrong, just stop refreshing
        accessToken = null;
        expiresIn = 30 * 1000; // 30 seconds
      }
    }
  }
}

export default [
  refreshTokenWatcher(),
  takeEvery(actions.types.REFRESH_TOKEN, refreshTokenSaga),
  takeEvery(actions.types.SIGN_IN, signInSaga),
];
