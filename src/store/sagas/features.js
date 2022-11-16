import { put, takeEvery } from 'redux-saga/effects';

import * as api from '../api';
import { started, loaded } from '../actions/loading';
import * as actions from '../actions/features';

import tryFetch from './_try';

function* listFeatures({ type }) {
  const request = api.get('/features/list');

  yield put(started(type));
  yield tryFetch(type, request);
  yield put(loaded(type));
}

export default [takeEvery(actions.listFeatures, listFeatures)];
