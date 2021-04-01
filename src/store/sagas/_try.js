import { put } from 'redux-saga/effects';

import * as api from '../api';

import * as messageActions from '../actions/messages';
import { setLoading } from '../actions/loading';

const CLOSE_AFTER = 10;

const unexpectedError = ['Unexpected Error', 'Something went wrong'];
const parseError = ['Bad response', 'Couldn\'t parse response from server'];

export function* tryRequest(request, scope) {
  const hasScope = (scope !== null && scope !== undefined);
  try {
    if (hasScope) {
      yield put(setLoading(scope, true));
    }
    const response = yield request;
    if (hasScope) {
      yield put(setLoading(scope, false));
    }
    return [response, null];
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
