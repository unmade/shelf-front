import { put, select, takeEvery } from 'redux-saga/effects';

import { MediaType } from '../../constants';

import * as api from '../api';
import * as actions from '../actions/files';
import { started, loaded } from '../actions/loading';

import { selectAccessToken } from '../auth';

import tryFetch from './_try';

function* download({ type, payload }) {
  const accessToken = yield select(selectAccessToken);
  const { path } = payload;

  const request = api.post('/files/download', accessToken, { path });

  yield tryFetch(type, request, {
    prepareResponse: (response) => {
      const contentType = response.headers.get('content-type');
      return MediaType.isText(contentType) ? response.text() : response.blob();
    },
    preparePayload: (response, data) => {
      const contentType = response.headers.get('content-type');
      const content = MediaType.isText(contentType) ? data : URL.createObjectURL(data);
      return { path, content };
    },
  });
}

function* performDownload({ type, payload }) {
  const accessToken = yield select(selectAccessToken);
  const { path } = payload;

  const request = api.post('/files/get_download_url', accessToken, { path });

  yield put(started(type));
  const data = yield tryFetch(type, request);
  yield put(loaded(type));

  if (data != null) {
    const link = document.createElement('a');
    link.href = data.download_url;
    link.click();
  }
}

export default [
  takeEvery(actions.download, download),
  takeEvery(actions.performDownload, performDownload),
];
