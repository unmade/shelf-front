import { all } from 'redux-saga/effects';

import accountSagas from './accounts';
import authSagas from './auth';
import fileSagas from './files';
import fileWatchers from './fileWatchers';
import launch from './launch';
import taskSagas from './tasks';
import thumbnailsSagas from './thumbnails';
import uploadSagas from './uploads';
import userSagas from './users';

export default function* rootSaga() {
  yield all([
    ...accountSagas,
    ...authSagas,
    ...fileSagas,
    ...fileWatchers,
    ...launch,
    ...taskSagas,
    ...thumbnailsSagas,
    ...uploadSagas,
    ...userSagas,
  ]);
}
