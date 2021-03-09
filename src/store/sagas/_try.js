import { put } from 'redux-saga/effects';

import * as api from '../api';

import * as messageActions from '../actions/messages';

const unexpectedError = ['Unexpected Error', 'Something went wrong'];
const parseError = ['Bad response', 'Couldn\'t parse response from server'];

export function* tryRequest(request) {
  try {
    return [yield request, null];
  } catch (err) {
    if (err instanceof api.ServerError || err instanceof api.APIError) {
      yield put(messageActions.createErrorMessage(err.title, err.description));
    } else {
      yield put(messageActions.createErrorMessage(...unexpectedError));
    }
    return [null, err];
  }
}

export function* tryResponse(parser) {
  try {
    return [yield parser, null];
  } catch (err) {
    yield put(messageActions.createErrorMessage(...parseError));
    return [null, err];
  }
}
