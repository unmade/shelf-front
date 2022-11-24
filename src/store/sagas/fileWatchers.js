import { put, race, select, take } from 'redux-saga/effects';

import * as uploadActions from '../actions/uploads';
import { invalidateTags } from '../apiSlice';

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
    yield put(invalidateTags([{ type: 'Files', id: currPath }]));
  }
}

const watchers = {
  [uploadActions.uploadFulfilled]: handleUpload,
};

function* filesWatcher() {
  while (true) {
    const result = yield race(Object.keys(watchers).map((key) => take(key)));
    const idx = result.findIndex((e) => e != null);
    yield Object.values(watchers)[idx](result[idx]);
  }
}

export default [filesWatcher()];
