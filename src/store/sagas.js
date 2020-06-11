import { all } from 'redux-saga/effects';
import { filesSagas } from './files/actions';


function* rootSaga() {
  yield all([
    ...filesSagas,
  ]);
}


export default rootSaga;
