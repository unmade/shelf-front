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
import * as messageActions from '../actions/messages';
import { getAccessToken, getIsExpired } from '../reducers/auth';

function* refreshToken() {
  const accessToken = yield select(getAccessToken);

  let response;
  try {
    response = yield api.put('/auth/tokens', accessToken);
  } catch (e) {
    if (e instanceof api.ServerError || e instanceof api.APIError) {
      yield put(messageActions.createErrorMessage(e.title, e.description));
    } else {
      yield put(messageActions.createErrorMessage('Unknown Error', 'Something went wrong'));
    }
    yield put(actions.refreshTokenFailure(e));
    return;
  }

  let data;
  try {
    data = yield response.json();
  } catch (e) {
    yield put(messageActions.createErrorMessage('Unknown Error', 'Something went wrong'));
    yield put(actions.refreshTokenFailure(e));
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

function* retrieveMe() {
  const accessToken = yield select(getAccessToken);

  let response;
  try {
    response = yield api.get('/auth/me', accessToken);
  } catch (e) {
    if (e instanceof api.ServerError || e instanceof api.APIError) {
      yield put(messageActions.createErrorMessage(e.title, e.description));
    } else {
      yield put(messageActions.createErrorMessage('Unknown Error', 'Something went wrong'));
    }
    yield put(actions.retrieveMeFailure(e));
    return;
  }

  let data;
  try {
    data = yield response.json();
  } catch (e) {
    yield put(messageActions.createErrorMessage('Unknown Error', 'Something went wrong'));
    yield put(actions.retrieveMeFailure(e));
    return;
  }

  yield put(actions.retrieveMeSuccess(data));
}

function* signIn({ payload }) {
  const { username, password } = payload;

  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);

  let response;
  try {
    response = yield api.post('/auth/tokens', null, formData);
  } catch (e) {
    yield put(actions.signInFailure(e));
    return;
  }

  let data;
  try {
    data = yield response.json();
  } catch (e) {
    yield put(actions.signInFailure(e));
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
