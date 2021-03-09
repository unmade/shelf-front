import { all } from 'redux-saga/effects';

import authSagas from './auth';
import filesSagas from './files';
import fileWatchers from './fileWatchers';
import uploadsSagas from './uploads';

export default function* rootSaga() {
  yield all([
    ...authSagas,
    ...filesSagas,
    ...fileWatchers,
    ...uploadsSagas,
  ]);
}
