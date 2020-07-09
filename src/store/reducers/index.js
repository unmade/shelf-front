import { combineReducers } from 'redux';

import AccountReducer from './accounts';
import AuthReducer from './auth';
import FilesReducer, { UploadFilesReducer } from './files';

export default combineReducers({
  accounts: AccountReducer,
  auth: AuthReducer,
  files: FilesReducer,
  uploadFiles: UploadFilesReducer,
});
