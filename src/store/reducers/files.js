import { combineReducers, createReducer, createSelector } from '@reduxjs/toolkit';

import * as routes from '../../routes';

import { fulfilled } from '../actions';
import * as actions from '../actions/files';
import * as uploadActions from '../actions/uploads';

function isFileChanged(action) {
  return (
    action.type === fulfilled(actions.emptyTrash) ||
    action.type === fulfilled(actions.moveFile) ||
    action.type === fulfilled(actions.moveToTrash)
  );
}

function isFilesListed(action) {
  return action.type === 'files/listFolder/fulfilled';
}

const downloads = createReducer({}, (builder) => {
  builder.addCase(actions.downloadCached, (state, action) => {
    const { path, content } = action.payload;
    state[path] = content;
  });
  builder.addCase(actions.downloadExpired, (state, action) => {
    const { path } = action.payload;
    delete state[path];
  });
});

const filesById = createReducer({}, (builder) => {
  builder.addCase(fulfilled(actions.deleteImmediately), (state, action) => {
    const file = action.payload;
    delete state[file.id];
  });
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
  builder.addMatcher(isFileChanged, (state, action) => {
    const file = action.payload;
    state[file.id] = file;
  });
});

const filesByPath = createReducer({}, (builder) => {
  builder.addCase(fulfilled(actions.deleteImmediately), (state, action) => {
    const file = action.payload;
    const parentPath = routes.parent(file.path);
    state[parentPath] = state[parentPath].filter((fileId) => fileId !== file.id);
  });
  builder.addCase(fulfilled(actions.emptyTrash), (state, action) => {
    const file = action.payload;
    state[file.path] = [];
  });
  builder.addCase('files/listFolder/fulfilled', (state, action) => {
    const { path, items } = action.payload;
    state[path] = items.map((file) => file.id);
  });
  builder.addCase(actions.folderUpdated, (state, action) => {
    const { path, ids } = action.payload;
    state[path] = ids;
  });
});

export default combineReducers({
  byId: filesById,
  byPath: filesByPath,
  downloads,
});

const FILES_EMPTY = [];

export const getFileById = (state, id) => state.files.byId[id];
export const getFileIdsByPath = (state, { path }) => state.files.byPath[path] ?? FILES_EMPTY;

export const getDownloads = (state) => state.files.downloads;

export const getDownload = (state, path) => state.files.downloads[path];

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
