import {
  put,
  select,
  take,
  takeEvery,
  race,
} from 'redux-saga/effects';

import { MediaType } from '../../constants';
import * as routes from '../../routes';

import API_BASE_URL from '../api-config';
import * as actions from '../actions/files';
import * as messageActions from '../actions/messages';
import * as uploadActions from '../actions/uploads';
import { getAccessToken } from '../reducers/auth';
import { getFilesByPath, getCurrPath, getFileById } from '../reducers/files';

/**
   * Return index in an `arr` where `target` should be inserted in order.
   * This is sort of modified version of binary search, because array sorted by
   * two fields - folder come first in abc order, then go files.
   */
function* findNextIdx(arr, target, cmp) {
  let low = 0;
  let high = arr.length;
  let prevMid = null;

  while (low < high) {
    // eslint-disable-next-line no-bitwise
    const mid = low + high >>> 1;
    const file = yield select(getFileById, arr[mid]);
    const result = cmp(target, file);
    if (result === 1) {
      low = mid + 1;
    } else if (result === -1) {
      high = mid;
    } else if (result === 2) {
      low = mid + 1;
      if (prevMid > high) {
        high = prevMid;
      }
    } else if (result === -2) {
      high = mid;
      if (low > prevMid + 1) {
        low = prevMid + 1;
      }
    }
    prevMid = mid;
  }
  return low;
}

/**
 * This method guarantees to return:
 *     ' 1' if 'a' occurs after 'b' and they both files
 *     '-1' if 'a' occurs before 'b' and they both files
 *     '-2' if 'a' is a folder and 'b' is not
 *     ' 2  if 'a' is not a folder and 'b' is
 */
function compareFiles(a, b) {
  if (a.mediatype === MediaType.FOLDER && b.mediatype !== MediaType.FOLDER) {
    return -2;
  }
  if (a.mediatype !== MediaType.FOLDER && b.mediatype === MediaType.FOLDER) {
    return 2;
  }

  const result = a.path.toLowerCase().localeCompare(b.path.toLowerCase());
  if (result > 0) {
    return 1;
  }
  if (result < 0) {
    return -1;
  }
  return 0;
}

function* handleMoveFile(action) {
  const { file } = action.payload;
  const currPath = yield select(getCurrPath);

  const parentPath = routes.parent(file.path);
  if (parentPath !== currPath) {
    const ids = yield select(getFilesByPath, currPath);
    yield put(actions.updateFolderByPath(currPath, ids.filter((id) => id !== file.id)));
  }
}

function* handleNewFolder(action) {
  const { folder } = action.payload;
  const currPath = yield select(getCurrPath);

  const ids = new Set(yield select(getFilesByPath, currPath));
  if (!ids.has(folder.id)) {
    const nextFiles = [...ids];
    const idx = yield findNextIdx(nextFiles, folder, compareFiles);
    nextFiles.splice(idx, 0, folder.id);
    yield put(actions.updateFolderByPath(currPath, nextFiles));
  }
}

function* handleUpload(action) {
  const { file, updates } = action.payload;
  const currPath = yield select(getCurrPath);

  const path = file.path.substring(0, file.path.length - file.name.length - 1);

  let target = null;
  if (path === currPath || (path === '' && currPath === '.')) {
    target = file;
  } else {
    for (let i = 0; i < updates.length; i++) {
      if (updates[i].path === currPath) {
        target = updates[i + 1];
        break;
      }
    }
  }
  if (target) {
    const ids = new Set(yield select(getFilesByPath, currPath));
    if (!ids.has(target.id)) {
      const nextFiles = [...ids];
      const idx = yield findNextIdx(nextFiles, target, compareFiles);
      nextFiles.splice(idx, 0, target.id);
      yield put(actions.updateFolderByPath(currPath, nextFiles));
    }
  }
}

function* filesWatcher() {
  while (true) {
    const [createFolderSuccess, uploadSuccess, moveFileSuccess, moveToTrashSuccess] = yield race([
      take(actions.types.CREATE_FOLDER_SUCCESS),
      take(uploadActions.types.UPLOAD_SUCCESS),
      take(actions.types.MOVE_FILE_SUCCESS),
      take(actions.types.MOVE_TO_TRASH_SUCCESS),
    ]);
    if (uploadSuccess) {
      yield handleUpload(uploadSuccess);
    }
    if (createFolderSuccess) {
      yield handleNewFolder(createFolderSuccess);
    }
    if (moveFileSuccess) {
      yield handleMoveFile(moveFileSuccess);
    }
    if (moveToTrashSuccess) {
      yield handleMoveFile(moveToTrashSuccess);
    }
  }
}

function* createFolder({ payload }) {
  const { name, parentFolderPath } = payload;
  const accessToken = yield select(getAccessToken);
  const url = `${API_BASE_URL}/files/create_folder`;
  const options = {
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      path: routes.join(parentFolderPath, name),
    }),
    mode: 'cors',
    cache: 'default',
  };

  yield put(actions.createFolderRequest());

  try {
    const response = yield fetch(url, options);
    const data = yield response.json();
    if (response.ok) {
      yield put(actions.createFolderSuccess(data));
    } else {
      yield put(actions.createFolderFailure(data));
    }
  } catch (e) {
    yield put(actions.createFolderFailure(e));
  }
}

function* deleteImmediately({ payload }) {
  const { path } = payload;
  const accessToken = yield select(getAccessToken);
  const url = `${API_BASE_URL}/files/delete_immediately`;
  const options = {
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ path }),
    mode: 'cors',
    cache: 'default',
  };

  yield put(actions.deleteImmediatelyRequest());

  try {
    const response = yield fetch(url, options);
    const data = yield response.json();
    if (response.ok) {
      yield put(actions.deleteImmediatelySucess(data));
    } else {
      yield put(actions.deleteImmediatelyFailure(data));
    }
  } catch (e) {
    yield put(actions.deleteImmediatelyFailure(e));
  }
}

function* download({ payload }) {
  const { path } = payload;
  const accessToken = yield select(getAccessToken);
  const url = `${API_BASE_URL}/files/download`;
  const options = {
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ path }),
    mode: 'cors',
    cache: 'default',
  };

  yield put(actions.downloadRequest());

  try {
    const response = yield fetch(url, options);
    if (response.ok) {
      let file;
      const contentType = response.headers.get('content-type');
      if (MediaType.isText(contentType)) {
        file = yield response.text();
      } else {
        const blob = yield response.blob();
        file = URL.createObjectURL(blob);
      }
      yield put(actions.downloadSuccess(path, file));
    } else {
      const e = yield response.json();
      yield put(actions.downloadFailure(e));
    }
  } catch (e) {
    yield put(actions.downloadFailure(e));
  }
}

function* emptyTrash() {
  const accessToken = yield select(getAccessToken);
  const url = `${API_BASE_URL}/files/empty_trash`;
  const options = {
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    mode: 'cors',
    cache: 'default',
  };

  yield put(actions.emptyTrashRequest());

  try {
    const response = yield fetch(url, options);
    const data = yield response.json();
    if (response.ok) {
      yield put(actions.emptyTrashSuccess(data));
    } else {
      yield put(actions.emptyTrashFailure(data));
    }
  } catch (e) {
    yield put(actions.emptyTrashFailure(e));
  }
}

function* fetchThumbnail({ payload }) {
  const { id, path, size } = payload;
  const accessToken = yield select(getAccessToken);
  const url = `${API_BASE_URL}/files/get_thumbnail?size=${size}`;
  const options = {
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ path }),
    mode: 'cors',
    cache: 'default',
  };

  yield put(actions.fetchThumbnailRequest());

  try {
    const response = yield fetch(url, options);
    if (response.ok) {
      const blob = yield response.blob();
      const thumb = URL.createObjectURL(blob);
      yield put(actions.fetchThumbnailSuccess(id, size, thumb));
    } else {
      const e = yield response.json();
      yield put(actions.fetchThumbnailFailure(e));
    }
  } catch (e) {
    yield put(actions.fetchThumbnailFailure(e));
  }
}

function* listFolder({ payload }) {
  const { path } = payload;
  const accessToken = yield select(getAccessToken);
  const url = `${API_BASE_URL}/files/list_folder`;
  const options = {
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ path: path || '.' }),
    mode: 'cors',
    cache: 'default',
  };

  yield put(actions.listFolderRequest());

  let response;
  try {
    response = yield fetch(url, options);
  } catch (e) {
    return yield put(actions.listFolderFailure(e));
  }
  if (!response.ok) {
    try {
      const error = yield response.json();
      yield put(messageActions.createErrorMessage('Error', error.message));
      return yield put(actions.listFolderFailure(error));
    } catch (e) {
      return yield put(actions.listFolderFailure(response));
    }
  }

  let data;
  try {
    data = yield response.json();
  } catch (e) {
    return yield put(actions.listFolderFailure(e));
  }

  return yield put(actions.listFolderSuccess(data));
}

function* moveFile({ payload }) {
  const { fromPath, toPath } = payload;
  const accessToken = yield select(getAccessToken);
  const url = `${API_BASE_URL}/files/move`;
  const options = {
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      from_path: fromPath,
      to_path: toPath,
    }),
    mode: 'cors',
    cache: 'default',
  };

  yield put(actions.moveFileRequest());

  try {
    const response = yield fetch(url, options);
    const data = yield response.json();
    if (response.ok) {
      yield put(actions.moveFileSuccess(data));
    } else {
      yield put(actions.moveFileFailure(data));
    }
  } catch (e) {
    yield put(actions.moveFileFailure(e));
  }
}

function* moveToTrash({ payload }) {
  const { path } = payload;
  const accessToken = yield select(getAccessToken);
  const url = `${API_BASE_URL}/files/move_to_trash`;
  const options = {
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      path,
    }),
    mode: 'cors',
    cache: 'default',
  };

  yield put(actions.moveToTrashRequest());

  try {
    const response = yield fetch(url, options);
    const data = yield response.json();
    if (response.ok) {
      yield put(actions.moveToTrashSuccess(data));
    } else {
      yield put(actions.moveToTrashFailure(data));
    }
  } catch (e) {
    yield put(actions.moveToTrashFailure(e));
  }
}

function* performDownload({ payload }) {
  const { path } = payload;
  const accessToken = yield select(getAccessToken);
  const url = `${API_BASE_URL}/files/get_download_url`;
  const options = {
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      path,
    }),
    mode: 'cors',
    cache: 'default',
  };

  yield put(actions.retrieveDownloadUrlRequest());

  try {
    const response = yield fetch(url, options);
    const data = yield response.json();
    if (response.ok) {
      yield put(actions.retrieveDownloadUrlSuccess());
      const link = document.createElement('a');
      link.href = data.download_url;
      link.click();
    } else {
      yield put(actions.retrieveDownloadUrlFailure(data));
    }
  } catch (e) {
    yield put(actions.retrieveDownloadUrlFailure(e));
  }
}

export default [
  filesWatcher(),
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
