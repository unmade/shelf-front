import { combineReducers } from 'redux';

import * as authActions from '../actions/auth';

import accounts from './accounts';
import auth from './auth';
import files from './files';
import loading from './loading';
import messages from './messages';
import tasks from './tasks';
import ui from './ui';
import uploads from './uploads';
import users from './users';

const rootReducer = combineReducers({
  accounts,
  auth,
  files,
  loading,
  messages,
  tasks,
  ui,
  uploads,
  users,
});

export default function reducer(state, action) {
  if (action.type === authActions.types.SIGN_OUT) {
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
}
