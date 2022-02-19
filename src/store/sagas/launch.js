import { fork, put, select } from 'redux-saga/effects';

import { listBookmarks } from '../actions/users';
import { getIsAuthenticated } from '../reducers/auth';

function* launchSaga() {
  const isAuthenticated = yield select(getIsAuthenticated);
  if (isAuthenticated) {
    yield put(listBookmarks());
  }
}

export default [fork(launchSaga)];
