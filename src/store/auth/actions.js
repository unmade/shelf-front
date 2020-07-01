import {
  delay,
  put,
  race,
  select,
  take,
  takeEvery,
} from 'redux-saga/effects';

import API_BASE_URL from '../api-config';

import { getTokens } from './selectors';

const SIGN_IN = 'SIGN_IN';
export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';

const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILURE = 'REFRESH_TOKEN_FAILURE';


function signInRequest() {
  return {
    type: SIGN_IN_REQUEST,
    payload: null,
  };
}


function signInSuccess({ access_token }) {
  return {
    type: SIGN_IN_SUCCESS,
    payload: {
      access: access_token,
    },
  };
}


function signInFailure({ errCode }) {
  return {
    type: SIGN_IN_FAILURE,
    payload: {
      errCode,
    },
  };
}


export function signIn({ username, password }) {
  return {
    type: SIGN_IN,
    payload: {
      username,
      password,
    },
  };
}


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

  yield put(signInRequest());

  try {
    const response = yield fetch(url, options);
    const data = yield response.json();
    if (response.ok) {
      yield put(signInSuccess(data));
    } else {
      if (response.status < 500) {
        yield put(signInFailure(data.detail));
      } else {
        console.log(response);
      }
    }
  } catch (e) {
    console.log(e);
  }
}


function refreshTokenRequest() {
  return {
    type: REFRESH_TOKEN_REQUEST,
    payload: null,
  };
}


function refreshTokenSuccess({ access_token }) {
  return {
    type: REFRESH_TOKEN_SUCCESS,
    payload: {
      access: access_token,
    },
  };
}


function refreshTokenFailure({ errCode }) {
  return {
    type: REFRESH_TOKEN_FAILURE,
    payload: {
      errCode,
    },
  };
}


export function refreshToken({ access }) {
  return {
    type: REFRESH_TOKEN,
    payload: {
      access,
    },
  };
}


function* refreshTokenSaga({ payload }) {
  const url = `${API_BASE_URL}/auth/tokens`;
  const { access: token } = payload;
  const options = {
    method: 'PUT',
    headers: {
      authorization: `Bearer ${token}`,
    },
    mode: 'cors',
    cache: 'default',
  };

  yield put(refreshTokenRequest());

  try {
    const response = yield fetch(url, options);
    const data = yield response.json();
    if (response.ok) {
      yield put(refreshTokenSuccess(data));
    } else {
      yield put(refreshTokenFailure(data));
    }
  } catch (e) {
    console.log(e);
  }
}


function* refreshTokenWatcher() {
  const expiresIn = 10 * 60 * 1000  // 10 minutes
  let tokens = yield select(getTokens);

  while (true) {
    if (!tokens.access) {
      const { payload } = yield take(SIGN_IN_SUCCESS);
      if (payload) {
        tokens = payload;
      }
    }

    const { expired } = yield race({
      expired: delay(expiresIn),
    });

    if (expired) {
      yield put(refreshToken(tokens));
      const { success } = yield race({
        success: take(REFRESH_TOKEN_SUCCESS),
        failure: take(REFRESH_TOKEN_FAILURE),
      });
      if (success) {
        tokens = yield select(getTokens);
      }
    }
  }
}


export const authSagas = [
  refreshTokenWatcher(),
  takeEvery(REFRESH_TOKEN, refreshTokenSaga),
  takeEvery(SIGN_IN, signInSaga),
];
