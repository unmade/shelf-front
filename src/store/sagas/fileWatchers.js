import {
  delay,
  put,
  select,
  race,
  take,
} from 'redux-saga/effects';

import { MediaType } from '../../constants';
import * as routes from '../../routes';

import * as api from '../api';
import * as actions from '../actions/files';
import * as messageActions from '../actions/messages';
import * as uploadActions from '../actions/uploads';

import { getAccessToken } from '../reducers/auth';
import { getFilesByPath, getFileById } from '../reducers/files';
import { getCurrentPath } from '../reducers/ui';

import { tryRequest, tryResponse } from './_try';

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

function* handleCreateFolder(action) {
  const { folder } = action.payload;
  const currPath = yield select(getCurrentPath);

  const ids = new Set(yield select(getFilesByPath, currPath));
  if (!ids.has(folder.id)) {
    const nextFiles = [...ids];
    const idx = yield findNextIdx(nextFiles, folder, compareFiles);
    nextFiles.splice(idx, 0, folder.id);
    yield put(actions.updateFolderByPath(currPath, nextFiles));
  }
}

function* handleMoveFile(action) {
  const { file } = action.payload;
  const currPath = yield select(getCurrentPath);

  const parentPath = routes.parent(file.path);
  const ids = yield select(getFilesByPath, currPath);
  const nextFiles = [...ids.filter((id) => id !== file.id)];
  if (parentPath === currPath) {
    const idx = yield findNextIdx(nextFiles, file, compareFiles);
    nextFiles.splice(idx, 0, file.id);
  }
  yield put(actions.updateFolderByPath(currPath, nextFiles));
}

function* handleMoveFileBatch({ payload }) {
  const refreshRate = 5 * 1000; // 5 seconds
  const refreshRateOnErr = 10 * 1000; // 30 seconds

  yield delay(1.5 * 1000); // wait for 1.5 seconds before first check
  while (true) {
    const accessToken = yield select(getAccessToken);
    const request = api.post('/files/move_batch/check', accessToken, { async_task_id: payload.taskId });
    const [response, err] = yield tryRequest(request);
    if (err !== null) {
      yield delay(refreshRateOnErr);
      // eslint-disable-next-line no-continue
      continue;
    }

    const [data, parseErr] = yield tryResponse(response.json());
    if (parseErr !== null) {
      yield delay(refreshRateOnErr);
      // eslint-disable-next-line no-continue
      continue;
    }

    const currPath = yield select(getCurrentPath);
    yield put(actions.listFolder(currPath));

    if (data?.status === 'completed') {
      const failed = data.results.filter((result) => result.err_code !== null);
      if (failed.length > 0) {
        yield put(messageActions.createErrorMessage('Failed to move files', '', 10));
      }
    }
    yield delay(refreshRate);
  }
}

function* handleUpload(action) {
  const { file, updates } = action.payload;
  const currPath = yield select(getCurrentPath);

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

const watchers = {
  [actions.types.CREATE_FOLDER_SUCCESS]: handleCreateFolder,
  [actions.types.MOVE_FILE_SUCCESS]: handleMoveFile,
  [actions.types.MOVE_FILE_BATCH_SUCCESS]: handleMoveFileBatch,
  [actions.types.MOVE_TO_TRASH_SUCCESS]: handleMoveFile,
  [uploadActions.types.UPLOAD_SUCCESS]: handleUpload,
};

function* filesWatcher() {
  while (true) {
    const result = yield race(Object.keys(watchers).map((key) => take(key)));
    const idx = result.findIndex((e) => e !== null && e !== undefined);
    yield Object.values(watchers)[idx](result[idx]);
  }
}

export default [
  filesWatcher(),
];
