import { put, select, takeEvery } from 'redux-saga/effects';

import * as api from '../api';
import * as actions from '../actions/accounts';
import { getAccessToken } from '../reducers/auth';

import { tryRequest, tryResponse } from './_try';

function* retrieveCurrentAccount() {
  const accessToken = yield select(getAccessToken);

  const request = api.get('/accounts/get_current', accessToken);
  const [response, err] = yield tryRequest(request);
  if (err !== null) {
    yield put(actions.retrieveCurrentAccountFailure(err));
    return;
  }

  const [data, parseErr] = yield tryResponse(response.json());
  if (parseErr !== null) {
    yield put(actions.retrieveCurrentAccountFailure(err));
    return;
  }

  yield put(actions.retrieveCurrentAccountSuccess(data));
}

export default [
  takeEvery(actions.types.RETRIEVE_CURRENT_ACCOUNT, retrieveCurrentAccount),
];
