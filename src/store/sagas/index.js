import { all } from 'redux-saga/effects';

import accountSagas from './accounts';
import authSagas from './auth';
import fileSagas from './files';
import fileWatchers from './fileWatchers';
import taskSagas from './tasks';
import uploadSagas from './uploads';

export default function* rootSaga() {
  yield all([
    ...accountSagas,
    ...authSagas,
    ...fileSagas,
    ...fileWatchers,
    ...taskSagas,
    ...uploadSagas,
  ]);
}
