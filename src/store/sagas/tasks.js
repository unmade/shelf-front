import {
  delay, put, select, takeEvery,
} from 'redux-saga/effects';

import * as api from '../api';
import * as actions from '../actions/tasks';

import { getAccessToken } from '../reducers/auth';

import { tryRequest, tryResponse } from './_try';

const endpointsByScope = {
  [actions.scopes.movingBatch]: '/files/move_batch/check',
};

function* checkTask({ payload }) {
  const refreshRate = 2.5 * 1000; // 2.5 seconds
  const refreshRateOnErr = 10 * 1000; // 10 seconds

  const { scope, taskId } = payload;
  const endpoint = endpointsByScope[scope];
  const body = { async_task_id: taskId };

  yield delay(1000); // wait for 1 second before first check
  while (true) {
    const accessToken = yield select(getAccessToken);
    const request = api.post(endpoint, accessToken, body);
    const [response, err] = yield tryRequest(request);
    if (err !== null) {
      yield delay(refreshRateOnErr);
      // eslint-disable-next-line no-continue
      continue;
    }

    const [data, parseErr] = yield tryResponse(response.json());
    if (parseErr !== null) {
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

export default [
  takeEvery(actions.types.TASK_STARTED, checkTask),
];
