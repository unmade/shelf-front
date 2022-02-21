import { delay, put, race, select, take, takeLeading } from 'redux-saga/effects';

import { MediaType } from '../../constants';
import * as routes from '../../routes';
import { difference } from '../../set';

import * as fileActions from '../actions/files';
import * as taskActions from '../actions/tasks';
import * as uiActions from '../actions/ui';
import * as uploadActions from '../actions/uploads';

import { getFileById, getFileIdsByPath } from '../reducers/files';
import { getCurrentPath, getSelectedFileIds } from '../reducers/ui';

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
    const mid = (low + high) >>> 1;
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

function* handleCreateFolder(action) {
  const { folder } = action.payload;
  const currPath = yield select(getCurrentPath);

  const ids = new Set(yield select(getFileIdsByPath, { path: currPath }));
  if (!ids.has(folder.id)) {
    const nextFiles = [...ids];
    const idx = yield findNextIdx(nextFiles, folder, compareFiles);
    nextFiles.splice(idx, 0, folder.id);
    yield put(fileActions.updateFolderByPath(currPath, nextFiles));
  }
}

function* handleListFolder({ payload }) {
  const currentPath = yield select(getCurrentPath);
  const { path, items } = payload;

  if (path === currentPath) {
    const fileIds = new Set(items.map((item) => item.id));
    const selectedFiles = yield select(getSelectedFileIds);
    const fileIdsToDeselect = difference(selectedFiles, fileIds);
    yield put(uiActions.bulkDeselectFiles(fileIdsToDeselect));
  }
}

function* handleMoveFile(action) {
  const { file } = action.payload;
  const currPath = yield select(getCurrentPath);

  const parentPath = routes.parent(file.path);
  const ids = yield select(getFileIdsByPath, { path: currPath });
  const nextFiles = [...ids.filter((id) => id !== file.id)];
  if (parentPath === currPath) {
    const idx = yield findNextIdx(nextFiles, file, compareFiles);
    nextFiles.splice(idx, 0, file.id);
  }
  yield put(fileActions.updateFolderByPath(currPath, nextFiles));
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
    const ids = new Set(yield select(getFileIdsByPath, { path: currPath }));
    if (!ids.has(target.id)) {
      const nextFiles = [...ids];
      const idx = yield findNextIdx(nextFiles, target, compareFiles);
      nextFiles.splice(idx, 0, target.id);
      yield put(fileActions.updateFolderByPath(currPath, nextFiles));
    }
  }
}

const watchers = {
  [fileActions.types.CREATE_FOLDER_SUCCESS]: handleCreateFolder,
  [fileActions.types.LIST_FOLDER_SUCCESS]: handleListFolder,
  [fileActions.types.MOVE_FILE_SUCCESS]: handleMoveFile,
  [fileActions.types.MOVE_TO_TRASH_SUCCESS]: handleMoveFile,
  [uploadActions.types.UPLOAD_SUCCESS]: handleUpload,
};

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
      completed: take(taskActions.types.TASK_COMPLETED),
      expired: delay(refreshRate), // wait for 2.5 seconds
    });

    const path = yield select(getCurrentPath);
    yield put(fileActions.listFolder(path));

    if (completed) {
      break;
    }
  }
}

export default [filesWatcher(), takeLeading(taskActions.types.TASK_STARTED, refreshCurrentFolder)];
