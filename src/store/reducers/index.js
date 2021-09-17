import { combineReducers } from 'redux';

import * as authActions from '../actions/auth';

import AccountsReducer from './accounts';
import AuthReducer from './auth';
import FilesReducer from './files';
import LoadingReducer from './loading';
import MessageReducer from './messages';
import TaskReducer from './tasks';
import UIReducer from './ui';
import UploadsReducer from './uploads';

const rootReducer = combineReducers({
  accounts: AccountsReducer,
  auth: AuthReducer,
  files: FilesReducer,
  loading: LoadingReducer,
  messages: MessageReducer,
  tasks: TaskReducer,
  ui: UIReducer,
  uploads: UploadsReducer,
});

export default function reducer(state, action) {
  if (action.type === authActions.types.SIGN_OUT) {
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
}
