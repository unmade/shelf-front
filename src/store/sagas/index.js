import { all } from 'redux-saga/effects';

import fileWatchers from './fileWatchers';
import uploadSagas from './uploads';

export default function* rootSaga() {
  yield all([...fileWatchers, ...uploadSagas]);
}
