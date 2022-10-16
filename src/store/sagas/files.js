import { put, select, takeEvery } from 'redux-saga/effects';

import { Dialogs, MediaType } from '../../constants';

import * as api from '../api';
import * as actions from '../actions/files';
import { started, loaded } from '../actions/loading';
import * as uiActions from '../actions/ui';
import * as taskActions from '../actions/tasks';

import { getAccessToken } from '../reducers/auth';

import tryFetch from './_try';

function* createFolder({ type, payload }) {
  const accessToken = yield select(getAccessToken);
  const { path } = payload;

  const request = api.post('/files/create_folder', accessToken, { path });

  yield put(started(type));
  yield tryFetch(type, request);
  yield put(loaded(type));
  yield put(uiActions.fileDialogClosed(Dialogs.createFolder));
}

function* deleteImmediately({ type, payload }) {
  const accessToken = yield select(getAccessToken);
  const { path } = payload;

  const request = api.post('/files/delete_immediately', accessToken, { path });

  yield put(started(type));
  yield tryFetch(type, request);
  yield put(loaded(type));
  yield put(uiActions.fileDialogClosed(Dialogs.deleteImmediately));
}

function* deleteImmediatelyBatch({ type, payload }) {
  const accessToken = yield select(getAccessToken);
  const { paths } = payload;
  const body = {
    items: paths.map((path) => ({ path })),
  };

  const request = api.post('/files/delete_immediately_batch', accessToken, body);

  yield put(started(type));
  const data = yield tryFetch(type, request);
  yield put(loaded(type));
  yield put(uiActions.fileDialogClosed(Dialogs.deleteImmediately));

  if (data != null) {
    const { async_task_id: taskId } = data;
    yield put(taskActions.taskStarted(taskActions.scopes.deletingImmediatelyBatch, taskId, body));
  }
}

function* download({ type, payload }) {
  const accessToken = yield select(getAccessToken);
  const { path } = payload;

  const request = api.post('/files/download', accessToken, { path });

  yield tryFetch(type, request, {
    prepareResponse: (response) => {
      const contentType = response.headers.get('content-type');
      return MediaType.isText(contentType) ? response.text() : response.blob();
    },
    preparePayload: (response, data) => {
      const contentType = response.headers.get('content-type');
      const file = MediaType.isText(contentType) ? data : URL.createObjectURL(data);
      return { path, file };
    },
  });
}

function* emptyTrash({ type }) {
  const accessToken = yield select(getAccessToken);

  const request = api.post('/files/empty_trash', accessToken);

  yield put(started(type));
  const data = yield tryFetch(type, request);
  yield put(loaded(type));
  yield put(uiActions.fileDialogClosed(Dialogs.emptyTrash));

  if (data != null) {
    yield put(taskActions.taskStarted(taskActions.scopes.emptyingTrash, data.async_task_id));
  }
}

function* findDuplicates({ type, payload }) {
  const accessToken = yield select(getAccessToken);
  const { path, maxDistance } = payload;

  const body = { path, max_distance: maxDistance };
  const request = api.post('/files/find_duplicates', accessToken, body);

  yield put(started(type));
  yield tryFetch(type, request);
  yield put(loaded(type));
}

function* getBatch({ type, payload }) {
  const accessToken = yield select(getAccessToken);
  const { fileIds } = payload;

  const request = api.post('/files/get_batch', accessToken, { ids: fileIds });

  yield put(started(type));
  yield tryFetch(type, request);
  yield put(loaded(type));
}

function* getContentMetadata({ type, payload }) {
  const accessToken = yield select(getAccessToken);
  const { path } = payload;

  const request = api.post('/files/get_content_metadata', accessToken, { path });

  yield put(started(type, path));
  yield tryFetch(type, request);
  yield put(loaded(type, path));
}

function* listFolder({ type, payload }) {
  const accessToken = yield select(getAccessToken);
  const { path = '.' } = payload;

  const request = api.post('/files/list_folder', accessToken, { path });

  yield put(started(type));
  yield tryFetch(type, request);
  yield put(loaded(type));
}

function* moveFile({ type, payload }) {
  const accessToken = yield select(getAccessToken);
  const { fromPath, toPath } = payload;

  const request = api.post('/files/move', accessToken, { from_path: fromPath, to_path: toPath });

  yield put(started(type));
  yield tryFetch(type, request);
  yield put(loaded(type));
  yield put(uiActions.fileDialogClosed(Dialogs.rename));
  yield put(uiActions.fileDialogClosed(Dialogs.move));
}

function* moveFileBatch({ type, payload }) {
  const accessToken = yield select(getAccessToken);
  const { relocations } = payload;

  const body = {
    items: relocations.map((relocation) => ({
      from_path: relocation.fromPath,
      to_path: relocation.toPath,
    })),
  };

  const request = api.post('/files/move_batch', accessToken, body);

  yield put(started(type));
  const data = yield tryFetch(type, request);
  yield put(loaded(type));
  yield put(uiActions.fileDialogClosed(Dialogs.rename));
  yield put(uiActions.fileDialogClosed(Dialogs.move));

  if (data != null) {
    yield put(taskActions.taskStarted(taskActions.scopes.movingBatch, data.async_task_id, body));
  }
}

function* moveToTrash({ type, payload }) {
  const accessToken = yield select(getAccessToken);
  const { path } = payload;

  const request = api.post('/files/move_to_trash', accessToken, { path });

  yield put(started(type));
  yield tryFetch(type, request);
  yield put(loaded(type));
  yield put(uiActions.fileDialogClosed(Dialogs.delete));
}

function* moveToTrashBatch({ type, payload }) {
  const accessToken = yield select(getAccessToken);
  const { paths } = payload;

  const body = {
    items: paths.map((path) => ({ path })),
  };

  const request = api.post('/files/move_to_trash_batch', accessToken, body);

  yield put(started(type));
  const data = yield tryFetch(type, request);
  yield put(loaded(type));
  yield put(uiActions.fileDialogClosed(Dialogs.delete));

  if (data != null) {
    yield put(taskActions.taskStarted(taskActions.scopes.movingToTrash, data.async_task_id, body));
  }
}

function* performDownload({ type, payload }) {
  const accessToken = yield select(getAccessToken);
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
  takeEvery(actions.createFolder, createFolder),
  takeEvery(actions.deleteImmediately, deleteImmediately),
  takeEvery(actions.deleteImmediatelyBatch, deleteImmediatelyBatch),
  takeEvery(actions.download, download),
  takeEvery(actions.emptyTrash, emptyTrash),
  takeEvery(actions.findDuplicates, findDuplicates),
  takeEvery(actions.getBatch, getBatch),
  takeEvery(actions.getContentMetadata, getContentMetadata),
  takeEvery(actions.listFolder, listFolder),
  takeEvery(actions.moveFile, moveFile),
  takeEvery(actions.moveFileBatch, moveFileBatch),
  takeEvery(actions.moveToTrash, moveToTrash),
  takeEvery(actions.moveToTrashBatch, moveToTrashBatch),
  takeEvery(actions.performDownload, performDownload),
];
