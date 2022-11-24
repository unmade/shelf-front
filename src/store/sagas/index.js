import { all } from 'redux-saga/effects';

import fileWatchers from './fileWatchers';
import thumbnailsSagas from './thumbnails';
import uploadSagas from './uploads';

export default function* rootSaga() {
  yield all([...fileWatchers, ...thumbnailsSagas, ...uploadSagas]);
}
