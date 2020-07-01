import { combineReducers } from 'redux';
import UserReducer from './user/reducers';
import AuthReducer from './auth/reducers';
import FilesReducer from './files/reducers';


const reducers = combineReducers({
  auth: AuthReducer,
  files: FilesReducer,
  user: UserReducer,
});

export default reducers;
