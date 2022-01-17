import { fork, put } from 'redux-saga/effects';

import { listBookmarks } from '../actions/users';

function* launchSaga() {
  yield put(listBookmarks());
}

export default [
  fork(launchSaga),
];
