import { put, race, select, take } from 'redux-saga/effects';

import { fulfilled } from '../actions';
import * as fileActions from '../actions/files';
import * as uploadActions from '../actions/uploads';
import { invalidateTags } from '../apiSlice';

import { getDownload } from '../reducers/files';
import { getCurrentPath } from '../reducers/ui';

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
    yield put(invalidateTags([{ type: 'Files', id: 'listFolder' }]));
  }
}

const watchers = {
  [uploadActions.uploadFulfilled]: handleUpload,
};

const DOWNLOAD_CACHE_MAX_SIZE = 8;

function* downloadCacheWatcher() {
  const queue = [];
  while (true) {
    const { payload } = yield take(fulfilled(fileActions.download));
    if (payload?.path == null || payload?.content == null) {
      // eslint-disable-next-line no-continue
      continue;
    }
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

export default [downloadCacheWatcher(), filesWatcher()];
