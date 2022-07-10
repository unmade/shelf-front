import { delay, put, select, takeEvery } from 'redux-saga/effects';

import * as api from '../api';
import * as actions from '../actions/tasks';

import { getAccessToken } from '../reducers/auth';

import tryFetch from './_try';

const endpointsByScope = {
  [actions.scopes.deletingImmediatelyBatch]: '/files/delete_immediately_batch/check',
  [actions.scopes.emptyingTrash]: '/files/empty_trash/check',
  [actions.scopes.movingBatch]: '/files/move_batch/check',
  [actions.scopes.movingToTrash]: '/files/move_batch/check',
};

function* checkTask({ type, payload }) {
  const refreshRate = 2.5 * 1000; // 2.5 seconds
  const refreshRateOnErr = 10 * 1000; // 10 seconds

  const { scope, taskId } = payload;
  const endpoint = endpointsByScope[scope];
  const body = { async_task_id: taskId };

  yield delay(1000); // wait for 1 second before first check
  while (true) {
    const accessToken = yield select(getAccessToken);
    const request = api.post(endpoint, accessToken, body);

    const data = yield tryFetch(type, request);
    if (data == null) {
      yield delay(refreshRateOnErr);
      // eslint-disable-next-line no-continue
      continue;
    }

    if (data?.status === 'completed') {
      yield put(actions.taskCompleted(scope, taskId, data));
      break;
    }
    yield delay(refreshRate);
  }
}

export default [takeEvery(actions.taskStarted, checkTask)];
