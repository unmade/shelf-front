import {
  put,
  takeEvery,
} from 'redux-saga/effects';

import API_BASE_URL from '../api-config';

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


function retrieveAccMeFailure({ code }) {
  return {
    type: RETRIEVE_ACC_ME_FAILURE,
    payload: {
      code
    },
  };
}


export function retrieveAccMe({ token }) {
  return {
    type: RETRIEVE_ACC_ME,
    payload: {
      token,
    },
  };
}


function* retrieveAccMeSaga({ payload }) {
  const { token } = payload;
  const url = `${API_BASE_URL}/accounts/me`;

  const options = {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
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
