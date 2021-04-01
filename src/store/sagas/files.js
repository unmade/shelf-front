import { put, select, takeEvery } from 'redux-saga/effects';

import { MediaType } from '../../constants';

import * as api from '../api';
import * as actions from '../actions/files';
import { scopes } from '../actions/loading';
import { getAccessToken } from '../reducers/auth';

import { tryRequest, tryResponse } from './_try';

function* createFolder({ payload }) {
  const accessToken = yield select(getAccessToken);
  const { path } = payload;

  const request = api.post('/files/create_folder', accessToken, { path });
  const [response, err] = yield tryRequest(request, scopes.creatingFolder);
  if (err !== null) {
    yield put(actions.createFolderFailure(err));
    return;
  }

  const [data, parseErr] = yield tryResponse(response.json());
  if (parseErr !== null) {
    yield put(actions.createFolderFailure(err));
    return;
  }

  yield put(actions.createFolderSuccess(data));
}

function* deleteImmediately({ payload }) {
  const accessToken = yield select(getAccessToken);
  const { path } = payload;

  const request = api.post('/files/delete_immediately', accessToken, { path });
  const [response, err] = yield tryRequest(request);
  if (err !== null) {
    yield put(actions.deleteImmediatelyFailure(err));
    return;
  }

  const [data, parseErr] = yield tryResponse(response.json());
  if (parseErr !== null) {
    yield put(actions.deleteImmediatelyFailure(err));
    return;
  }

  yield put(actions.deleteImmediatelySucess(data));
}

function* download({ payload }) {
  const accessToken = yield select(getAccessToken);
  const { path } = payload;

  const request = api.post('/files/download', accessToken, { path });
  const [response, err] = yield tryRequest(request);
  if (err !== null) {
    yield put(actions.downloadFailure(err));
    return;
  }

  const contentType = response.headers.get('content-type');
  const parser = (MediaType.isText(contentType)) ? response.text() : response.blob();
  const [data, parseErr] = yield tryResponse(parser);
  if (parseErr !== null) {
    yield put(actions.downloadFailure(parseErr));
    return;
  }
  const file = (MediaType.isText(contentType)) ? data : URL.createObjectURL(data);
  yield put(actions.downloadSuccess(path, file));
}

function* emptyTrash() {
  const accessToken = yield select(getAccessToken);

  const request = api.post('/files/empty_trash', accessToken);
  const [response, err] = yield tryRequest(request, scopes.emptyingTrash);
  if (err !== null) {
    yield put(actions.emptyTrashFailure(err));
    return;
  }

  const [data, parseErr] = yield tryResponse(response.json());
  if (parseErr !== null) {
    yield put(actions.emptyTrashFailure(err));
    return;
  }

  yield put(actions.emptyTrashSuccess(data));
}

function* fetchThumbnail({ payload }) {
  const accessToken = yield select(getAccessToken);
  const { id, path, size } = payload;

  const request = api.post(`/files/get_thumbnail?size=${size}`, accessToken, { path });
  const [response, err] = yield tryRequest(request);
  if (err !== null) {
    yield put(actions.fetchThumbnailFailure(err));
    return;
  }

  const [data, parseErr] = yield tryResponse(response.blob());
  if (parseErr !== null) {
    yield put(actions.fetchThumbnailFailure(err));
    return;
  }

  const thumb = URL.createObjectURL(data);
  yield put(actions.fetchThumbnailSuccess(id, size, thumb));
}

function* listFolder({ payload }) {
  const accessToken = yield select(getAccessToken);
  const { path = '.' } = payload;

  // yield put(setLoading(scopes.listingFolder, true));
  const request = api.post('/files/list_folder', accessToken, { path });
  const [response, err] = yield tryRequest(request, scopes.listingFolder);
  if (err !== null) {
    yield put(actions.listFolderFailure(err));
    return;
  }

  const [data, parseErr] = yield tryResponse(response.json());
  if (parseErr !== null) {
    yield put(actions.listFolderFailure(parseErr));
    return;
  }

  yield put(actions.listFolderSuccess(data));
  // yield put(setLoading(scopes.listingFolder, false));
}

function* moveFile({ payload }) {
  const accessToken = yield select(getAccessToken);
  const { fromPath, toPath } = payload;

  const request = api.post('/files/move', accessToken, { from_path: fromPath, to_path: toPath });
  const [response, err] = yield tryRequest(request, scopes.movingFile);
  if (err !== null) {
    yield put(actions.moveFileFailure(err));
    return;
  }

  const [data, parseErr] = yield tryResponse(response.json());
  if (parseErr !== null) {
    yield put(actions.moveFileFailure(parseErr));
    return;
  }

  yield put(actions.moveFileSuccess(data));
}

function* moveToTrash({ payload }) {
  const accessToken = yield select(getAccessToken);
  const { path } = payload;

  const request = api.post('/files/move_to_trash', accessToken, { path });
  const [response, err] = yield tryRequest(request, scopes.movingToTrash);
  if (err !== null) {
    yield put(actions.moveToTrashFailure(err));
    return;
  }

  const [data, parseErr] = yield tryResponse(response.json());
  if (parseErr !== null) {
    yield put(actions.moveToTrashFailure(parseErr));
    return;
  }

  yield put(actions.moveToTrashSuccess(data));
}

function* performDownload({ payload }) {
  const accessToken = yield select(getAccessToken);
  const { path } = payload;

  const request = api.post('/files/get_download_url', accessToken, { path });
  const [response, err] = yield tryRequest(request);
  if (err !== null) {
    yield put(actions.retrieveDownloadUrlFailure(err));
    return;
  }

  const [data, parseErr] = yield tryResponse(response.json());
  if (parseErr !== null) {
    yield put(actions.retrieveDownloadUrlFailure(parseErr));
    return;
  }

  yield put(actions.retrieveDownloadUrlSuccess(data));
  const link = document.createElement('a');
  link.href = data.download_url;
  link.click();
}

export default [
  takeEvery(actions.types.CREATE_FOLDER, createFolder),
  takeEvery(actions.types.DELETE_IMMEDIATELY, deleteImmediately),
  takeEvery(actions.types.DOWNLOAD, download),
  takeEvery(actions.types.EMPTY_TRASH, emptyTrash),
  takeEvery(actions.types.FETCH_THUMBNAIL, fetchThumbnail),
  takeEvery(actions.types.LIST_FOLDER, listFolder),
  takeEvery(actions.types.MOVE_FILE, moveFile),
  takeEvery(actions.types.MOVE_TO_TRASH, moveToTrash),
  takeEvery(actions.types.PERFORM_DOWNLOAD, performDownload),
];
