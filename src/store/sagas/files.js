import {
  put,
  select,
  take,
  takeEvery,
  race,
} from 'redux-saga/effects';

import API_BASE_URL from '../api-config';
import * as actions from '../actions/files';
import * as uploadActions from '../actions/uploads';
import { getAccessToken } from '../reducers/auth';
import { getFilesByPath, getCurrPath, getFileById } from '../reducers/files';

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

function* binarySearch(arr, target, low, high, cmp) {
  if (high <= low) {
    const file = yield select(getFileById, arr[low]);
    return (cmp(target, file) > 0) ? (low + 1) : low;
  }

  const mid = Math.ceil((low + high) / 2);

  const file = yield select(getFileById, arr[mid]);
  const res = cmp(target, file);
  if (res === 0) {
    return mid + 1;
  }

  if (res > 0) {
    return yield binarySearch(arr, target, mid + 1, high, cmp);
  }
  return yield binarySearch(arr, target, low, mid - 1, cmp);
}

function compareFiles(a, b) {
  if (a.type === b.type) {
    return a.path.localeCompare(b.path);
  }
  return (a.type === 'folder') ? -1 : 1;
}

function* handleUpload(action) {
  const { file, updates } = action.payload;
  const currPath = yield select(getCurrPath);

  const path = file.path.substring(0, file.path.length - file.name.length - 1);

  let target = null;
  if (path === currPath) {
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
      const idx = yield binarySearch(nextFiles, target, 0, nextFiles.length - 1, compareFiles);
      nextFiles.splice(idx, 0, target.id);
      yield put(actions.updateFolderByPath(currPath, nextFiles));
    }
  }
}

function* handleNewFolder(action) {
  const { folder } = action.payload;
  const currPath = yield select(getCurrPath);

  const ids = new Set(yield select(getFilesByPath, currPath));
  if (!ids.has(folder.id)) {
    const nextFiles = [...ids];
    const idx = yield binarySearch(nextFiles, folder, 0, nextFiles.length - 1, compareFiles);
    nextFiles.splice(idx, 0, folder.id);
    yield put(actions.updateFolderByPath(currPath, nextFiles));
  }
}

function* filesWatcher() {
  while (true) {
    const { createFolderSuccess, uploadSuccess } = yield race({
      createFolderSuccess: take(actions.types.CREATE_FOLDER_SUCCESS),
      uploadSuccess: take(uploadActions.types.UPLOAD_SUCCESS),
    });
    if (uploadSuccess) {
      yield handleUpload(uploadSuccess);
    }
    if (createFolderSuccess) {
      yield handleNewFolder(createFolderSuccess);
    }
  }
}

export default [
  filesWatcher(),
  takeEvery(actions.types.CREATE_FOLDER, createFolder),
  takeEvery(actions.types.LIST_FOLDER, listFolder),
];
