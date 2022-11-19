import { combineReducers } from '@reduxjs/toolkit';

import apiSlice from '../apiSlice';
import auth, { signedOut } from '../auth';

import files from './files';
import loading from './loading';
import messages from './messages';
import tasks from './tasks';
import thumbnails from './thumbnails';
import ui from './ui';
import uploads from './uploads';

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth,
  files,
  loading,
  messages,
  tasks,
  thumbnails,
  ui,
  uploads,
});

export default function reducer(state, action) {
  if (action.type === signedOut.type) {
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
}
