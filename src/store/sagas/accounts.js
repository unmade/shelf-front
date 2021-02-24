import {
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';

import API_BASE_URL from '../api-config';
import * as actions from '../actions/accounts';
import { getAccessToken } from '../reducers/auth';

function* retrieveUserSaga() {
  const url = `${API_BASE_URL}/auth/me`;
  const accessToken = yield select(getAccessToken);

  const options = {
    method: 'GET',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    mode: 'cors',
    cache: 'default',
  };

  yield put(actions.accountMeRequest());

  try {
    const response = yield fetch(url, options);
    const data = yield response.json();
    if (response.ok) {
      yield put(actions.accountMeSuccess(data));
    } else if (response.status < 500) {
      yield put(actions.accountMeFailure(data.detail));
    } else {
      // eslint-disable-next-line no-console
      console.log(response);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}

export default [
  takeEvery(actions.types.ACCOUNT_ME, retrieveUserSaga),
];
