import {
  put,
  select,
  take,
  takeEvery,
  race,
} from 'redux-saga/effects';

import { FileType } from '../../constants';

import API_BASE_URL from '../api-config';
import * as actions from '../actions/files';
import * as uploadActions from '../actions/uploads';
import { getAccessToken } from '../reducers/auth';
import { getFilesByPath, getCurrPath, getFileById } from '../reducers/files';

function* binarySearch(arr, target, cmp) {
  let low = 0;
  let high = arr.length;

  while (low < high) {
    const mid = low + Math.ceil((high - low) / 2);
    if (mid === high) {
      return mid;
    }
    const file = yield select(getFileById, arr[mid]);
    const cond = cmp(target, file);
    if (cond < 0) {
      high = mid;
    } else if (cond > 0) {
      low = mid + 1;
    } else {
      return mid;
    }
  }

  return arr.length;
}

function compareFiles(a, b) {
  if (a.type === b.type) {
    return a.path.toLowerCase().localeCompare(b.path.toLowerCase());
  }
  return (a.type === FileType.FOLDER || a.type === FileType.TRASH) ? -1 : 1;
}

function* handleMoveFile(action) {
  const { file } = action.payload;
  const currPath = yield select(getCurrPath);

  const parentPath = file.path.substring(0, file.path.length - file.name.length - 1);
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
    const idx = yield binarySearch(nextFiles, folder, compareFiles);
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
      const idx = yield binarySearch(nextFiles, target, compareFiles);
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
      path: `${parentFolderPath}/${name}`,
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

  try {
    const response = yield fetch(url, options);
    const data = yield response.json();
    if (response.ok) {
      yield put(actions.listFolderSuccess(data));
    } else {
      yield put(actions.listFolderFailure(data));
    }
  } catch (e) {
    yield put(actions.listFolderFailure(e));
  }
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
  const url = `${API_BASE_URL}/files/delete`;
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
  takeEvery(actions.types.LIST_FOLDER, listFolder),
  takeEvery(actions.types.MOVE_FILE, moveFile),
  takeEvery(actions.types.MOVE_TO_TRASH, moveToTrash),
  takeEvery(actions.types.PERFORM_DOWNLOAD, performDownload),
];
