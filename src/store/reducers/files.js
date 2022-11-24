import { combineReducers, createReducer, createSelector } from '@reduxjs/toolkit';

import * as uploadActions from '../actions/uploads';

function isFilesListed(action) {
  return action.type === 'files/listFolder/fulfilled';
}

const filesById = createReducer({}, (builder) => {
  builder.addCase(uploadActions.uploadFulfilled, (state, action) => {
    const { file, updates } = action.payload;
    state[file.id] = file;
    updates.forEach((update) => {
      state[update.id] = update;
    });
  });
  builder.addMatcher(isFilesListed, (state, action) => {
    const { items } = action.payload;
    items.forEach((file) => {
      state[file.id] = file;
    });
  });
});

const filesByPath = createReducer({}, (builder) => {
  builder.addCase('files/listFolder/fulfilled', (state, action) => {
    const { path, items } = action.payload;
    state[path] = items.map((file) => file.id);
  });
});

export default combineReducers({
  byId: filesById,
  byPath: filesByPath,
});

function createPropsSelector(selector) {
  return (_, props) => selector(props);
}

const getIdsProps = createPropsSelector((props) => props.ids);

export const getFilesByIds = createSelector(
  [(state) => state.files.byId, getIdsProps],
  (byId, ids) => {
    // 'ids' param can be a Set, which doesn't support '.map()',
    // so instead use a '.forEach()'
    const files = [];
    ids.forEach((id) => {
      files.push(byId[id]);
    });
    return files;
  }
);
