import { put } from 'redux-saga/effects';

import { MediaType } from '../../constants';

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

function defaultPayload(_, data) {
  return data;
}

function defaultResponse(response) {
  const contentType = response.headers.get('content-type');
  if (contentType === 'application/json') {
    return response.json();
  }
  if (MediaType.isText(contentType)) {
    return response.text();
  }
  return response.blob();
}

export default function* tryFetch(
  actionType,
  request,
  { prepareResponse = defaultResponse, preparePayload = defaultPayload } = {}
) {
  let response;
  try {
    response = yield request;
  } catch (error) {
    yield put(createRejectedAction(actionType, error.request, normalizeAPIError(error)));
    return null;
  }

  let data;
  try {
    data = yield prepareResponse(response);
  } catch (error) {
    yield put(createRejectedAction(actionType, response.shelfRequest, normalizeParseError(error)));
    return null;
  }

  yield put(
    createFulfilledAction(actionType, response.shelfRequest, preparePayload(response, data))
  );
  return data;
}
