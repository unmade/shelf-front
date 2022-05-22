import { put } from 'redux-saga/effects';

import * as api from '../api';

import { createFulfilledAction, createRejectedAction } from '../actions';

function normalizeAPIError(error) {
  if (error instanceof api.ServerError || error instanceof api.APIError) {
    const { title, description } = error;
    return { title, description };
  }
  return {
    title: 'Unexpected Error',
    description: 'Something went wrong',
  };
}

function normalizeParseError() {
  return {
    title: 'Bad response',
    description: "Couldn't parse response from server",
  };
}

export function* tryRequest(request) {
  try {
    return [yield request, null];
  } catch (err) {
    return [null, err];
  }
}

export function* tryResponse(parser) {
  try {
    return [yield parser, null];
  } catch (err) {
    return [null, err];
  }
}

export function* tryFetch(actionType, request) {
  let response;
  try {
    response = yield request;
  } catch (error) {
    yield put(createRejectedAction(actionType, error.request, normalizeAPIError(error)));
    return null;
  }

  let data;
  try {
    data = yield response.json();
  } catch (error) {
    yield put(createRejectedAction(actionType, response.shelfRequest, normalizeParseError(error)));
    return null;
  }

  yield put(createFulfilledAction(actionType, response.shelfRequest, data));
  return data;
}
