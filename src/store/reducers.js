import { combineReducers } from 'redux';
import UserReducer from './user/reducers';
import AuthReducer from './auth/reducers';
import FilesReducer, { UploadFilesReducer } from './files/reducers';


const reducers = combineReducers({
  auth: AuthReducer,
  files: FilesReducer,
  uploadFiles: UploadFilesReducer,
  user: UserReducer,
});

export default reducers;
