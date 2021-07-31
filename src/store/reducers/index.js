import { combineReducers } from 'redux';

import AccountsReducer from './accounts';
import AuthReducer from './auth';
import FilesReducer from './files';
import LoadingReducer from './loading';
import MessageReducer from './messages';
import TaskReducer from './tasks';
import UIReducer from './ui';
import UploadsReducer from './uploads';

export default combineReducers({
  accounts: AccountsReducer,
  auth: AuthReducer,
  files: FilesReducer,
  loading: LoadingReducer,
  messages: MessageReducer,
  tasks: TaskReducer,
  ui: UIReducer,
  uploads: UploadsReducer,
});
