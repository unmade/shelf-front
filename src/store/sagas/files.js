import {
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';

import { MediaType } from '../../constants';
import * as routes from '../../routes';

import * as api from '../api';
import * as actions from '../actions/files';
import * as messageActions from '../actions/messages';
import { getAccessToken } from '../reducers/auth';

function* createFolder({ payload }) {
  const accessToken = yield select(getAccessToken);
  const { name, parentFolderPath } = payload;
  const path = routes.join(parentFolderPath, name);

  let response;
  try {
    response = yield api.post('/files/create_folder', accessToken, { path });
  } catch (e) {
    if (e instanceof api.ServerError || e instanceof api.APIError) {
      yield put(messageActions.createErrorMessage(e.title, e.description));
    } else {
      yield put(messageActions.createErrorMessage('Unknown Error', 'Something went wrong'));
    }
    yield put(actions.createFolderFailure(e));
    return;
  }

  let data;
  try {
    data = yield response.json();
  } catch (e) {
    yield put(messageActions.createErrorMessage('Unknown Error', 'Something went wrong'));
    yield put(actions.createFolderFailure(e));
    return;
  }

  yield put(actions.createFolderSuccess(data));
}

function* deleteImmediately({ payload }) {
  const accessToken = yield select(getAccessToken);
  const { path } = payload;

  let response;
  try {
    response = yield api.post('/files/delete_immediately', accessToken, { path });
  } catch (e) {
    if (e instanceof api.ServerError || e instanceof api.APIError) {
      yield put(messageActions.createErrorMessage(e.title, e.description));
    } else {
      yield put(messageActions.createErrorMessage('Unknown Error', 'Something went wrong'));
    }
    yield put(actions.deleteImmediatelyFailure(e));
    return;
  }

  let data;
  try {
    data = yield response.json();
  } catch (e) {
    yield put(messageActions.createErrorMessage('Unknown Error', 'Something went wrong'));
    yield put(actions.deleteImmediatelyFailure(e));
    return;
  }

  yield put(actions.deleteImmediatelySucess(data));
}

function* download({ payload }) {
  const accessToken = yield select(getAccessToken);
  const { path } = payload;

  let response;
  try {
    response = yield api.post('/files/download', accessToken, { path });
  } catch (e) {
    if (e instanceof api.ServerError || e instanceof api.APIError) {
      yield put(messageActions.createErrorMessage(e.title, e.description));
    } else {
      yield put(messageActions.createErrorMessage('Unknown Error', 'Something went wrong'));
    }
    yield put(actions.downloadFailure(e));
    return;
  }

  const contentType = response.headers.get('content-type');

  let file;
  try {
    if (MediaType.isText(contentType)) {
      file = yield response.text();
    } else {
      const blob = yield response.blob();
      file = URL.createObjectURL(blob);
    }
  } catch (e) {
    yield put(messageActions.createErrorMessage('Unknown Error', 'Something went wrong'));
    yield put(actions.downloadFailure(e));
    return;
  }

  yield put(actions.downloadSuccess(path, file));
}

function* emptyTrash() {
  const accessToken = yield select(getAccessToken);

  let response;
  try {
    response = yield api.post('/files/empty_trash', accessToken);
  } catch (e) {
    if (e instanceof api.ServerError || e instanceof api.APIError) {
      yield put(messageActions.createErrorMessage(e.title, e.description));
    } else {
      yield put(messageActions.createErrorMessage('Unknown Error', 'Something went wrong'));
    }
    yield put(actions.emptyTrashFailure(e));
    return;
  }

  let data;
  try {
    data = yield response.json();
  } catch (e) {
    yield put(messageActions.createErrorMessage('Unknown Error', 'Something went wrong'));
    yield put(actions.emptyTrashFailure(e));
    return;
  }

  yield put(actions.emptyTrashSuccess(data));
}

function* fetchThumbnail({ payload }) {
  const accessToken = yield select(getAccessToken);
  const { id, path, size } = payload;

  let response;
  try {
    response = yield api.post(`/files/get_thumbnail?size=${size}`, accessToken, { path });
  } catch (e) {
    if (e instanceof api.ServerError || e instanceof api.APIError) {
      yield put(messageActions.createErrorMessage(e.title, e.description));
    } else {
      yield put(messageActions.createErrorMessage('Unknown Error', 'Something went wrong'));
    }
    yield put(actions.fetchThumbnailFailure(e));
    return;
  }

  let blob;
  try {
    blob = yield response.blob();
  } catch (e) {
    yield put(messageActions.createErrorMessage('Unknown Error', 'Something went wrong'));
    yield put(actions.fetchThumbnailFailure(e));
    return;
  }

  const thumb = URL.createObjectURL(blob);
  yield put(actions.fetchThumbnailSuccess(id, size, thumb));
}

function* listFolder({ payload }) {
  const accessToken = yield select(getAccessToken);
  const { path = '.' } = payload;

  yield put(actions.listFolderRequest());

  let response;
  try {
    response = yield api.post('/files/list_folder', accessToken, { path });
  } catch (e) {
    if (e instanceof api.ServerError || e instanceof api.APIError) {
      yield put(messageActions.createErrorMessage(e.title, e.description));
    } else {
      yield put(messageActions.createErrorMessage('Unknown Error', 'Something went wrong'));
    }
    yield put(actions.listFolderFailure(e));
    return;
  }

  let data;
  try {
    data = yield response.json();
  } catch (e) {
    yield put(messageActions.createErrorMessage('Unknown Error', 'Something went wrong'));
    yield put(actions.listFolderFailure(e));
    return;
  }

  yield put(actions.listFolderSuccess(data));
}

function* moveFile({ payload }) {
  const accessToken = yield select(getAccessToken);
  const { fromPath, toPath } = payload;

  let response;
  try {
    response = yield api.post('/files/move', accessToken, { from_path: fromPath, to_path: toPath });
  } catch (e) {
    if (e instanceof api.ServerError || e instanceof api.APIError) {
      yield put(messageActions.createErrorMessage(e.title, e.description));
    } else {
      yield put(messageActions.createErrorMessage('Unknown Error', 'Something went wrong'));
    }
    yield put(actions.moveFileFailure(e));
    return;
  }

  let data;
  try {
    data = yield response.json();
  } catch (e) {
    yield put(messageActions.createErrorMessage('Unknown Error', 'Something went wrong'));
    yield put(actions.moveFileFailure(e));
    return;
  }

  yield put(actions.moveFileSuccess(data));
}

function* moveToTrash({ payload }) {
  const accessToken = yield select(getAccessToken);
  const { path } = payload;

  let response;
  try {
    response = yield api.post('/files/move_to_trash', accessToken, { path });
  } catch (e) {
    if (e instanceof api.ServerError || e instanceof api.APIError) {
      yield put(messageActions.createErrorMessage(e.title, e.description));
    } else {
      yield put(messageActions.createErrorMessage('Unknown Error', 'Something went wrong'));
    }
    yield put(actions.moveToTrashFailure(e));
    return;
  }

  let data;
  try {
    data = yield response.json();
  } catch (e) {
    yield put(messageActions.createErrorMessage('Unknown Error', 'Something went wrong'));
    yield put(actions.moveToTrashFailure(e));
    return;
  }

  yield put(actions.moveToTrashSuccess(data));
}

function* performDownload({ payload }) {
  const accessToken = yield select(getAccessToken);
  const { path } = payload;

  let response;
  try {
    response = yield api.post('/files/get_download_url', accessToken, { path });
  } catch (e) {
    if (e instanceof api.ServerError || e instanceof api.APIError) {
      yield put(messageActions.createErrorMessage(e.title, e.description));
    } else {
      yield put(messageActions.createErrorMessage('Unknown Error', 'Something went wrong'));
    }
    yield put(actions.retrieveDownloadUrlFailure(e));
    return;
  }

  let data;
  try {
    data = yield response.json();
  } catch (e) {
    yield put(messageActions.createErrorMessage('Unknown Error', 'Something went wrong'));
    yield put(actions.retrieveDownloadUrlFailure(e));
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
