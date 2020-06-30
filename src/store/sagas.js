import { all } from 'redux-saga/effects';
import { authSagas } from './auth/actions';
import { filesSagas } from './files/actions';


function* rootSaga() {
  yield all([
    ...authSagas,
    ...filesSagas,
  ]);
}


export default rootSaga;
