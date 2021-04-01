import { combineReducers } from 'redux';

import AuthReducer from './auth';
import FilesReducer from './files';
import LoadingReducer from './loading';
import MessageReducer from './messages';
import UIReducer from './ui';
import UploadsReducer from './uploads';

export default combineReducers({
  auth: AuthReducer,
  files: FilesReducer,
  loading: LoadingReducer,
  messages: MessageReducer,
  ui: UIReducer,
  uploads: UploadsReducer,
});
