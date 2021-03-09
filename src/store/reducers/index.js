import { combineReducers } from 'redux';

import AuthReducer from './auth';
import MessageReducer from './messages';
import FilesReducer from './files';
import UIReducer from './ui';
import UploadsReducer from './uploads';

export default combineReducers({
  auth: AuthReducer,
  files: FilesReducer,
  messages: MessageReducer,
  ui: UIReducer,
  uploads: UploadsReducer,
});
