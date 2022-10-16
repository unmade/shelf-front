import { put, select, take } from 'redux-saga/effects';

import * as actions from '../actions/thumbnails';

import { getThumbnailById } from '../reducers/thumbnails';

const MAX_SIZE = 16;

function* watcher() {
  const queue = [];
  while (true) {
    const { payload } = yield take(actions.thumbnailCached);
    const { fileId, size } = payload;

    if (size !== 'xs') {
      queue.push({ fileId, size });
      if (queue.length > MAX_SIZE) {
        const entry = queue.pop();
        const thumbnailCache = yield select((state) => getThumbnailById(state, entry.fileId));
        const objectUrl = thumbnailCache[size];
        URL.revokeObjectURL(objectUrl);
        yield put(actions.thumbnailExpired(fileId, size));
      }
    }
  }
}

export default [watcher()];
