import { delay, put, race, select, take, takeLeading } from 'redux-saga/effects';

import { fulfilled } from '../actions';
import * as fileActions from '../actions/files';
import * as taskActions from '../actions/tasks';
import * as uploadActions from '../actions/uploads';
import { invalidateTags } from '../files';

import { getDownload } from '../reducers/files';
import { getCurrentPath } from '../reducers/ui';

function* refreshFolder() {
  const path = yield select(getCurrentPath);
  yield put(invalidateTags([{ type: 'Files', id: path }]));
}

function* handleUpload(action) {
  const { file, updates } = action.payload;
  const currPath = yield select(getCurrentPath);

  const path = file.path.substring(0, file.path.length - file.name.length - 1);

  let target = null;
  if (path === currPath || (path === '' && currPath === '.')) {
    target = file;
  } else {
    for (let i = 0; i < updates.length; i += 1) {
      if (updates[i].path === currPath) {
        target = updates[i + 1];
        break;
      }
    }
  }
  if (target) {
    yield refreshFolder();
  }
}

const watchers = {
  [fulfilled(fileActions.createFolder)]: refreshFolder,
  [fulfilled(fileActions.moveFile)]: refreshFolder,
  [fulfilled(fileActions.moveToTrash)]: refreshFolder,
  [uploadActions.uploadFulfilled]: handleUpload,
};

const DOWNLOAD_CACHE_MAX_SIZE = 8;

function* downloadCacheWatcher() {
  const queue = [];
  while (true) {
    const { payload } = yield take(fulfilled(fileActions.download));
    const { path, content } = payload;

    queue.push(path);
    yield put(fileActions.downloadCached(path, content));
    if (queue.length > DOWNLOAD_CACHE_MAX_SIZE) {
      const stalePath = queue.shift();
      const cachedDownload = yield select((state) => getDownload(state, stalePath));
      URL.revokeObjectURL(cachedDownload);
      yield put(fileActions.downloadExpired(stalePath));
    }
  }
}

function* filesWatcher() {
  while (true) {
    const result = yield race(Object.keys(watchers).map((key) => take(key)));
    const idx = result.findIndex((e) => e != null);
    yield Object.values(watchers)[idx](result[idx]);
  }
}

const refreshFolderScopes = new Set([
  taskActions.scopes.deletingImmediatelyBatch,
  taskActions.scopes.emptyingTrash,
  taskActions.scopes.movingBatch,
  taskActions.scopes.movingToTrash,
]);

function* refreshCurrentFolder({ payload }) {
  const refreshRate = 2.5 * 1000; // 2.5 seconds

  const { scope } = payload;

  if (!refreshFolderScopes.has(scope)) {
    return;
  }

  while (true) {
    const { completed } = yield race({
      completed: take(taskActions.taskCompleted),
      expired: delay(refreshRate), // wait for 2.5 seconds
    });

    const path = yield select(getCurrentPath);
    yield put(invalidateTags([{ type: 'Files', id: path }]));

    if (completed) {
      break;
    }
  }
}

export default [
  downloadCacheWatcher(),
  filesWatcher(),
  takeLeading(taskActions.taskStarted, refreshCurrentFolder),
];
