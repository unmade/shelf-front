import { fork, put } from 'redux-saga/effects';

import { listFeatures } from '../actions/features';

function* launchSaga() {
  yield put(listFeatures());
}

export default [fork(launchSaga)];
