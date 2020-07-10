import { all } from 'redux-saga/effects';

import accountSagas from './accounts';
import authSagas from './auth';
import filesSagas from './files';
import uploadsSagas from './uploads';

export default function* rootSaga() {
  yield all([
    ...accountSagas,
    ...authSagas,
    ...filesSagas,
    ...uploadsSagas,
  ]);
}
