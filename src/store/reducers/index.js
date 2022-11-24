import { combineReducers } from '@reduxjs/toolkit';

import apiSlice from '../apiSlice';
import auth, { signedOut } from '../auth';
import tasks from '../tasks';

import files from './files';
import messages from './messages';
import ui from './ui';
import uploads from './uploads';

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth,
  files,
  messages,
  tasks,
  ui,
  uploads,
});

export default function reducer(state, action) {
  if (action.type === signedOut.type) {
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
}
