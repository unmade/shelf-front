import { combineReducers } from 'redux';
import AccountsReducer from './accounts/reducers';
import AuthReducer from './auth/reducers';
import FilesReducer from './files/reducers';


const reducers = combineReducers({
  accounts: AccountsReducer,
  auth: AuthReducer,
  files: FilesReducer,
});

export default reducers;
