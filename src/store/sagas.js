import { all } from 'redux-saga/effects';
import { accountsSagas } from './accounts/actions';
import { authSagas } from './auth/actions';
import { filesSagas } from './files/actions';


function* rootSaga() {
  yield all([
    ...accountsSagas,
    ...authSagas,
    ...filesSagas,
  ]);
}


export default rootSaga;
