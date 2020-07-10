import { combineReducers } from 'redux';

import AccountReducer from './accounts';
import AuthReducer from './auth';
import FilesReducer from './files';
import UploadsReducer from './uploads';

export default combineReducers({
  accounts: AccountReducer,
  auth: AuthReducer,
  files: FilesReducer,
  uploads: UploadsReducer,
});
