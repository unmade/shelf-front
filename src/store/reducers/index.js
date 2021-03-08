import { combineReducers } from 'redux';

import AccountReducer from './accounts';
import AuthReducer from './auth';
import MessageReducer from './messages';
import FilesReducer from './files';
import UIReducer from './ui';
import UploadsReducer from './uploads';

export default combineReducers({
  accounts: AccountReducer,
  auth: AuthReducer,
  files: FilesReducer,
  messages: MessageReducer,
  ui: UIReducer,
  uploads: UploadsReducer,
});
