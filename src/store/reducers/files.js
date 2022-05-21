import { combineReducers, createReducer, createSelector } from '@reduxjs/toolkit';

import { MediaType } from '../../constants';
import * as routes from '../../routes';

import { fulfilled } from '../actions';
import * as actions from '../actions/files';
import { types as uploadTypes } from '../actions/uploads';

function isFileChanged(action) {
  return (
    action.type === fulfilled(actions.createFolder) ||
    action.type === fulfilled(actions.emptyTrash) ||
    action.type === fulfilled(action.moveFile) ||
    action.type === fulfilled(actions.moveToTrash)
  );
}

function isFilesListed(action) {
  return (
    action.type === fulfilled(actions.getBatch) || action.type === fulfilled(actions.listFolder)
  );
}

const downloads = createReducer({}, (builder) => {
  builder.addCase(fulfilled(actions.download), (state, action) => {
    const { path, file } = action.payload;
    state[path] = file;
  });
});

const duplicatesByPath = createReducer({}, (builder) => {
  builder.addCase(fulfilled(actions.findDuplicates), (state, action) => {
    const { path, items } = action.payload;
    state[path] = items.map((group) => group.map((file) => file.id));
  });
});

const filesById = createReducer({}, (builder) => {
  builder.addCase(fulfilled(actions.deleteImmediately), (state, action) => {
    const file = action.payload;
    delete state[file.id];
  });
  builder.addCase(fulfilled(actions.findDuplicates), (state, action) => {
    const { items } = action.payload;
    items.forEach((group) =>
      group.forEach((file) => {
        state[file.id] = file;
      })
    );
  });
  builder.addCase(uploadTypes.UPLOAD_SUCCESS, (state, action) => {
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
  builder.addCase(fulfilled(actions.listFolder), (state, action) => {
    const { path, items } = action.payload;
    state[path] = items.map((file) => file.id);
  });
  builder.addCase(actions.folderUpdated, (state, action) => {
    const { path, ids } = action.payload;
    state[path] = ids;
  });
});

const thumbnailsById = createReducer({}, (builder) => {
  builder.addCase(fulfilled(actions.fetchThumbnail), (state, action) => {
    const { id, size, thumb } = action.payload;
    if (state[id] == null) {
      state[id] = {};
    }
    state[id][size] = thumb;
  });
});

export default combineReducers({
  byId: filesById,
  byPath: filesByPath,
  duplicatesByPath,
  thumbnailsById,
  downloads,
});

const FILES_EMPTY = [];

export const getDuplicatesByPath = (state, path) => state.files.duplicatesByPath[path] ?? null;
export const getFileById = (state, id) => state.files.byId[id];
export const getFileIdsByPath = (state, { path }) => state.files.byPath[path] ?? FILES_EMPTY;
export const getFilesCountByPath = (state, path) => getFileIdsByPath(state, { path }).length;
export const getThumbnailById = (state, id) => state.files.thumbnailsById[id];

export const getDownloads = (state) => state.files.downloads;

function createPropsSelector(selector) {
  return (_, props) => selector(props);
}

const getPathProp = createPropsSelector((props) => props.path);

export const getFolderIdsByPath = createSelector(
  [(state) => state.files.byId, (state) => state.files.byPath, getPathProp],
  (byId, byPath, path) =>
    (byPath[path] ?? FILES_EMPTY)
      .map((id) => byId[id])
      .filter((item) => item.mediatype === MediaType.FOLDER)
      .map((item) => item.id)
);

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

export const makeGetPreview = () =>
  createSelector(
    [
      (state) => state.files.byId,
      (state, props) => getFileIdsByPath(state, { path: props.dirPath }),
      (_state, props) => props.name,
    ],
    (byId, files, name) => {
      const index = files.findIndex((fileId) => byId[fileId].name === name);
      let prevIndex = index - 1;
      if (prevIndex < 0) {
        prevIndex = files.length - 1;
      }

      let nextIndex = index + 1;
      if (nextIndex > files.length - 1) {
        nextIndex = 0;
      }
      return {
        index,
        total: files.length,
        files: [byId[files[prevIndex]], byId[files[index]], byId[files[nextIndex]]],
      };
    }
  );

export const makeGetDuplicatePreviewData = () =>
  createSelector(
    [
      (state) => state.files.byId,
      (state, props) => getDuplicatesByPath(state, props.dirPath),
      (_state, props) => props.dirPath,
      (_state, props) => props.name,
    ],
    (byId, duplicates, dirPath, name) => {
      if (duplicates === null) {
        return {
          index: 0,
          total: 0,
          files: [],
        };
      }
      let targetGroup = null;
      let index = null;
      const targetPath = routes.join(dirPath, name);
      // eslint-disable-next-line no-restricted-syntax
      for (const group of duplicates) {
        index = group.findIndex((fileId) => byId[fileId].path === targetPath);
        if (index !== -1) {
          targetGroup = group;
          break;
        }
      }

      let prevIndex = index - 1;
      if (prevIndex < 0) {
        prevIndex = targetGroup.length - 1;
      }

      let nextIndex = index + 1;
      if (nextIndex > targetGroup.length - 1) {
        nextIndex = 0;
      }
      return {
        index,
        total: targetGroup.length,
        files: [
          byId[targetGroup[prevIndex]],
          byId[targetGroup[index]],
          byId[targetGroup[nextIndex]],
        ],
      };
    }
  );
