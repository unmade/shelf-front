import { put } from 'redux-saga/effects';

import * as api from '../api';

import { createFulfilledAction, createRejectedAction } from '../actions';
import * as messageActions from '../actions/messages';
import { setLoadingDeprecated } from '../actions/loading';

const CLOSE_AFTER = 10;

const unexpectedError = ['Unexpected Error', 'Something went wrong'];
const parseError = ['Bad response', "Couldn't parse response from server"];

export function* tryRequest(request, scope) {
  if (scope != null) {
    yield put(setLoadingDeprecated(scope, true));
  }
  try {
    return [yield request, null];
  } catch (err) {
    if (err instanceof api.ServerError || err instanceof api.APIError) {
      yield put(messageActions.createErrorMessage(err.title, err.description, CLOSE_AFTER));
    } else {
      yield put(messageActions.createErrorMessage(...unexpectedError, CLOSE_AFTER));
    }
    return [null, err];
  }
}

export function* tryResponse(parser) {
  try {
    return [yield parser, null];
  } catch (err) {
    yield put(messageActions.createErrorMessage(...parseError, CLOSE_AFTER));
    return [null, err];
  }
}

export function* tryFetch(action, request) {
  const [response, err] = yield tryRequest(request);
  if (err !== null) {
    yield put(createRejectedAction(action.type, err));
    return;
  }

  const [data, parseErr] = yield tryResponse(response.json());
  if (parseErr !== null) {
    yield put(createRejectedAction(action.type, parseErr));
    return;
  }

  yield put(createFulfilledAction(action.type, data));
}
