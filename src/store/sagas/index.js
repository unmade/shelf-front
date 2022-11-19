import { all } from 'redux-saga/effects';

import accountSagas from './accounts';
import fileSagas from './files';
import fileWatchers from './fileWatchers';
import taskSagas from './tasks';
import thumbnailsSagas from './thumbnails';
import uploadSagas from './uploads';

export default function* rootSaga() {
  yield all([
    ...accountSagas,
    ...fileSagas,
    ...fileWatchers,
    ...taskSagas,
    ...thumbnailsSagas,
    ...uploadSagas,
  ]);
}
