import {
  put,
  takeEvery,
} from 'redux-saga/effects';

import API_BASE_URL from '../api-config';

const SIGN_IN = 'SIGN_IN';
export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';


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


function signInFailure({ code }) {
  return {
    type: SIGN_IN_FAILURE,
    payload: {
      code
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


export const authSagas = [
  takeEvery(SIGN_IN, signInSaga),
];
