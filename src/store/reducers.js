import { combineReducers } from 'redux';
import AuthReducer from './auth/reducers';
import FilesReducer from './files/reducers';

const reducers = combineReducers({
  auth: AuthReducer,
  files: FilesReducer,
});

export default reducers;
