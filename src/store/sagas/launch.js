import { fork, put, select } from 'redux-saga/effects';

import { listFeatures } from '../actions/features';
import { listBookmarks } from '../actions/users';

import { getIsAuthenticated } from '../reducers/auth';

function* launchSaga() {
  yield put(listFeatures());
  const isAuthenticated = yield select(getIsAuthenticated);
  if (isAuthenticated) {
    yield put(listBookmarks());
  }
}

export default [fork(launchSaga)];
