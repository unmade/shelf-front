import {
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';

import API_BASE_URL from '../api-config';

import { getAccessToken } from '../auth/selectors';

const RETRIEVE_USER = 'RETRIEVE_USER';
export const RETRIEVE_USER_REQUEST = 'RETRIEVE_USER_REQUEST';
export const RETRIEVE_USER_SUCCESS = 'RETRIEVE_USER_SUCCESS';
export const RETRIEVE_USER_FAILURE = 'RETRIEVE_USER_FAILURE';


function retrieveUserRequest() {
  return {
    type: RETRIEVE_USER_REQUEST,
    payload: null,
  };
}


function retrieveUserSuccess(payload) {
  return {
    type: RETRIEVE_USER_SUCCESS,
    payload: payload,
  };
}


function retrieveUserFailure({ errCode }) {
  return {
    type: RETRIEVE_USER_FAILURE,
    payload: {
      errCode
    },
  };
}


export function retrieveUser() {
  return {
    type: RETRIEVE_USER,
    payload: null,
  };
}


function* retrieveUserSaga() {
  const url = `${API_BASE_URL}/accounts/me`;
  const accessToken = yield select(getAccessToken);

  const options = {
    method: 'GET',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    mode: 'cors',
    cache: 'default',
  };

  yield put(retrieveUserRequest());

  try {
    const response = yield fetch(url, options);
    const data = yield response.json();
    if (response.ok) {
      yield put(retrieveUserSuccess(data));
    } else {
      if (response.status < 500) {
        yield put(retrieveUserFailure(data.detail));
      } else {
        console.log(response);
      }
    }
  } catch (e) {
    console.log(e);
  }
}


export const userSagas = [
  takeEvery(RETRIEVE_USER, retrieveUserSaga),
];
