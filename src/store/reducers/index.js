import { combineReducers } from '@reduxjs/toolkit';

import * as authActions from '../actions/auth';

import accounts from './accounts';
import auth from './auth';
import files from './files';
import features from './features';
import loading from './loading';
import messages from './messages';
import tasks from './tasks';
import thumbnails from './thumbnails';
import ui from './ui';
import uploads from './uploads';
import users from './users';

const rootReducer = combineReducers({
  accounts,
  auth,
  features,
  files,
  loading,
  messages,
  tasks,
  thumbnails,
  ui,
  uploads,
  users,
});

export default function reducer(state, action) {
  if (action.type === authActions.signedOut.type) {
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
}
