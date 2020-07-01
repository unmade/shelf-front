import {
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';

import API_BASE_URL from '../api-config';

import { getAccessToken } from '../auth/selectors';

const RETRIEVE_ACC_ME = 'RETRIEVE_ACC_ME';
export const RETRIEVE_ACC_ME_REQUEST = 'RETRIEVE_ACC_ME_REQUEST';
export const RETRIEVE_ACC_ME_SUCCESS = 'RETRIEVE_ACC_ME_SUCCESS';
export const RETRIEVE_ACC_ME_FAILURE = 'RETRIEVE_ACC_ME_FAILURE';


function retrieveAccMeRequest() {
  return {
    type: RETRIEVE_ACC_ME_REQUEST,
    payload: null,
  };
}


function retrieveAccMeSuccess(payload) {
  return {
    type: RETRIEVE_ACC_ME_SUCCESS,
    payload: payload,
  };
}


function retrieveAccMeFailure({ errCode }) {
  return {
    type: RETRIEVE_ACC_ME_FAILURE,
    payload: {
      errCode
    },
  };
}


export function retrieveAccMe() {
  return {
    type: RETRIEVE_ACC_ME,
    payload: null,
  };
}


function* retrieveAccMeSaga() {
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

  yield put(retrieveAccMeRequest());

  try {
    const response = yield fetch(url, options);
    const data = yield response.json();
    if (response.ok) {
      yield put(retrieveAccMeSuccess(data));
    } else {
      if (response.status < 500) {
        yield put(retrieveAccMeFailure(data.detail));
      } else {
        console.log(response);
      }
    }
  } catch (e) {
    console.log(e);
  }
}


export const accountsSagas = [
  takeEvery(RETRIEVE_ACC_ME, retrieveAccMeSaga),
];
