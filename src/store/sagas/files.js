import { actionChannel, call, put, select, take, takeEvery } from 'redux-saga/effects';

import { Dialogs, MediaType } from '../../constants';

import * as api from '../api';
import * as actions from '../actions/files';
import { scopes } from '../actions/loading';
import * as uiActions from '../actions/ui';
import * as taskActions from '../actions/tasks';

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
  yield put(uiActions.closeDialog(Dialogs.createFolder));
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
  yield put(uiActions.closeDialog(Dialogs.deleteImmediately));
}

function* deleteImmediatelyBatch({ payload }) {
  const accessToken = yield select(getAccessToken);
  const { paths } = payload;
  const body = {
    items: paths.map((path) => ({ path })),
  };

  const request = api.post('/files/delete_immediately_batch', accessToken, body);
  const [response, err] = yield tryRequest(request);
  if (err !== null) {
    yield put(actions.deleteImmediatelyBatchFailure(err));
    return;
  }

  const [data, parseErr] = yield tryResponse(response.json());
  if (parseErr !== null) {
    yield put(actions.deleteImmediatelyBatchFailure(err));
    return;
  }

  const { async_task_id: taskId } = data;
  yield put(actions.deleteImmediatelyBatchSucess(data));
  yield put(uiActions.closeDialog(Dialogs.deleteImmediately));
  yield put(taskActions.taskStarted(taskActions.scopes.deletingImmediatelyBatch, taskId, body));
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
  const parser = MediaType.isText(contentType) ? response.text() : response.blob();
  const [data, parseErr] = yield tryResponse(parser);
  if (parseErr !== null) {
    yield put(actions.downloadFailure(parseErr));
    return;
  }
  const file = MediaType.isText(contentType) ? data : URL.createObjectURL(data);
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
  yield put(uiActions.closeDialog(Dialogs.emptyTrash));
  yield put(taskActions.taskStarted(taskActions.scopes.emptyingTrash, data.async_task_id));
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

function* getBatch({ payload }) {
  const accessToken = yield select(getAccessToken);
  const { fileIds } = payload;

  const request = api.post('/files/get_batch', accessToken, { ids: fileIds });
  const [response, err] = yield tryRequest(request);
  if (err !== null) {
    yield put(actions.getBatchFailure(err));
    return;
  }

  const [data, parseErr] = yield tryResponse(response.json());
  if (parseErr !== null) {
    yield put(actions.getBatchFailure(parseErr));
    return;
  }

  yield put(actions.getBatchSuccess(data));
}

function* listFolder({ payload }) {
  const accessToken = yield select(getAccessToken);
  const { path = '.' } = payload;

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
  yield put(uiActions.closeDialog(Dialogs.rename));
  yield put(uiActions.closeDialog(Dialogs.move));
}

function* moveFileBatch({ payload }) {
  const accessToken = yield select(getAccessToken);
  const { relocations } = payload;

  const body = {
    items: relocations.map((relocation) => ({
      from_path: relocation.fromPath,
      to_path: relocation.toPath,
    })),
  };

  const request = api.post('/files/move_batch', accessToken, body);
  const [response, err] = yield tryRequest(request, scopes.movingFile);
  if (err !== null) {
    yield put(actions.moveFileBatchFailure(err));
    return;
  }

  const [data, parseErr] = yield tryResponse(response.json());
  if (parseErr !== null) {
    yield put(actions.moveFileBatchFailure(parseErr));
    return;
  }

  yield put(actions.moveFileBatchSuccess(data));
  yield put(uiActions.closeDialog(Dialogs.rename));
  yield put(uiActions.closeDialog(Dialogs.move));
  yield put(taskActions.taskStarted(taskActions.scopes.movingBatch, data.async_task_id, body));
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
  yield put(uiActions.closeDialog(Dialogs.delete));
}

function* moveToTrashBatch({ payload }) {
  const accessToken = yield select(getAccessToken);
  const { paths } = payload;

  const body = {
    items: paths.map((path) => ({ path })),
  };

  const request = api.post('/files/move_to_trash_batch', accessToken, body);
  const [response, err] = yield tryRequest(request, scopes.movingFile);
  if (err !== null) {
    yield put(actions.moveFileBatchFailure(err));
    return;
  }

  const [data, parseErr] = yield tryResponse(response.json());
  if (parseErr !== null) {
    yield put(actions.moveFileBatchFailure(parseErr));
    return;
  }

  yield put(actions.moveFileBatchSuccess(data));
  yield put(uiActions.closeDialog(Dialogs.delete));
  yield put(taskActions.taskStarted(taskActions.scopes.movingToTrash, data.async_task_id, body));
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

function* watchFetchThumbnail() {
  const thumbnailChan = yield actionChannel([actions.types.FETCH_THUMBNAIL]);

  while (true) {
    const action = yield take(thumbnailChan);
    yield call(fetchThumbnail, action);
  }
}

export default [
  takeEvery(actions.types.CREATE_FOLDER, createFolder),
  takeEvery(actions.types.DELETE_IMMEDIATELY, deleteImmediately),
  takeEvery(actions.types.DELETE_IMMEDIATELY_BATCH, deleteImmediatelyBatch),
  takeEvery(actions.types.DOWNLOAD, download),
  takeEvery(actions.types.EMPTY_TRASH, emptyTrash),
  takeEvery(actions.types.GET_BATCH, getBatch),
  takeEvery(actions.types.LIST_FOLDER, listFolder),
  takeEvery(actions.types.MOVE_FILE, moveFile),
  takeEvery(actions.types.MOVE_FILE_BATCH, moveFileBatch),
  takeEvery(actions.types.MOVE_TO_TRASH, moveToTrash),
  takeEvery(actions.types.MOVE_TO_TRASH_BATCH, moveToTrashBatch),
  takeEvery(actions.types.PERFORM_DOWNLOAD, performDownload),
  watchFetchThumbnail(),
];
