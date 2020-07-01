import { all } from 'redux-saga/effects';
import { userSagas } from './user/actions';
import { authSagas } from './auth/actions';
import { filesSagas } from './files/actions';


function* rootSaga() {
  yield all([
    ...authSagas,
    ...filesSagas,
    ...userSagas,
  ]);
}


export default rootSaga;
