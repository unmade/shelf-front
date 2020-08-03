import { combineReducers } from 'redux';

import AccountReducer from './accounts';
import AuthReducer from './auth';
import FilesReducer from './files';
import UIReducer from './ui';
import UploadsReducer from './uploads';

export default combineReducers({
  accounts: AccountReducer,
  auth: AuthReducer,
  files: FilesReducer,
  ui: UIReducer,
  uploads: UploadsReducer,
});
