import { shallowEqual } from 'react-redux';
import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

import { MediaType } from '../../constants';
import * as routes from '../../routes';
import { difference } from '../../set';

import { types } from '../actions/files';
import { types as uploadTypes } from '../actions/uploads';

function normalize(files) {
  const data = {};
  files.forEach((file) => {
    data[file.id] = file;
  });
  return data;
}

function filesById(state = {}, action) {
  switch (action.type) {
    case types.EMPTY_TRASH_SUCCESS:
    case types.MOVE_FILE_SUCCESS:
    case types.MOVE_TO_TRASH_SUCCESS: {
      const { file } = action.payload;
      return {
        ...state,
        [file.id]: file,
      };
    }
    case types.CREATE_FOLDER_SUCCESS: {
      const { folder } = action.payload;
      return {
        ...state,
        [folder.id]: folder,
      };
    }
    case types.DELETE_IMMEDIATELY_SUCCESS: {
      const { file } = action.payload;
      const { [file.id]: deletedFileId, ...nextState } = state;
      return nextState;
    }
    case types.LIST_FOLDER_SUCCESS: {
      if (action.payload.items.length === 0) {
        return state;
      }
      const items = normalize(action.payload.items);
      const nextState = { ...state };
      Object.keys(items).forEach((key) => {
        if (nextState[key] == null) {
          nextState[key] = items[key];
        }
        if (!shallowEqual(nextState[key], items[key])) {
          nextState[key] = items[key];
        }
      });

      return nextState;
    }
    case uploadTypes.UPLOAD_SUCCESS: {
      const { file, updates } = action.payload;
      return {
        ...state,
        ...normalize(updates),
        [file.id]: file,
      };
    }
    default:
      return state;
  }
}

function selectedIds(state = new Set(), action) {
  switch (action.type) {
    case types.DESELECT_FILES: {
      return new Set();
    }
    case types.DESELECT_FILES_BULK: {
      const { ids } = action.payload;
      return difference(state, ids);
    }
    case types.SELECT_FILE: {
      const { id } = action.payload;
      return new Set([id]);
    }
    case types.SELECT_FILE_ADD: {
      const { id } = action.payload;
      const nextState = new Set(state);
      if (state.has(id)) {
        nextState.delete(id);
      } else {
        nextState.add(id);
      }
      return nextState;
    }
    case types.SELECT_FILE_BULK: {
      const { ids } = action.payload;
      return new Set(ids);
    }
    default:
      return state;
  }
}

function filesByPath(state = {}, action) {
  switch (action.type) {
    case types.DELETE_IMMEDIATELY_SUCCESS: {
      const { file } = action.payload;
      const parentPath = routes.parent(file.path);
      const { [file.path]: deletedPath, ...nextState } = state;
      nextState[parentPath] = nextState[parentPath].filter((fileId) => fileId !== file.id);
      return nextState;
    }
    case types.EMPTY_TRASH_SUCCESS: {
      const { file } = action.payload;
      return {
        ...state,
        [file.path]: [],
      };
    }
    case types.LIST_FOLDER_SUCCESS: {
      const { path, items } = action.payload;
      if (items.length === 0) {
        return state;
      }
      const ids = items.map((file) => file.id);
      if (!shallowEqual(ids, state[path])) {
        return {
          ...state,
          [path]: ids,
        };
      }
      return state;
    }
    case types.UPDATE_FOLDER_BY_PATH: {
      const { path, ids } = action.payload;
      return {
        ...state,
        [path]: ids,
      };
    }
    default:
      return state;
  }
}

function thumbnailsById(state = {}, action) {
  switch (action.type) {
    case types.FETCH_THUMBNAIL_SUCCESS: {
      const { id, size, thumb } = action.payload;
      return {
        ...state,
        [id]: {
          ...state[id],
          [size]: thumb,
        },
      };
    }
    default:
      return state;
  }
}

function downloads(state = {}, action) {
  switch (action.type) {
    case types.DOWNLOAD_SUCCESS: {
      const { path, file } = action.payload;
      return {
        ...state,
        [path]: file,
      };
    }
    default:
      return state;
  }
}

export default combineReducers({
  byId: filesById,
  byPath: filesByPath,
  selectedIds,
  thumbnailsById,
  downloads,
});

const FILES_EMPTY = [];

export const getFileById = (state, id) => state.files.byId[id];
export const getFileIdsByPath = (state, path) => state.files.byPath[path] ?? FILES_EMPTY;
export const getFilesCountByPath = (state, path) => getFileIdsByPath(state, path).length;
export const getIsFileSelected = (state, id) => state.files.selectedIds.has(id);
export const getSelectedFileIds = (state) => state.files.selectedIds;
export const getSelectedFiles = createSelector(
  [
    (state) => state.files.byId,
    getSelectedFileIds,
  ],
  (byId, fileIds) => {
    const files = [];
    fileIds.forEach((id) => {
      files.push(byId[id]);
    });
    return files;
  },
);
export const getHasSelectedFiles = (state) => state.files.selectedIds.size !== 0;
export const getCountSelectedFiles = (state) => state.files.selectedIds.size;
export const getThumbnailById = (state, id) => state.files.thumbnailsById[id];

export const getDownloads = (state) => state.files.downloads;

function createPropsSelector(selector) {
  return (_, props) => selector(props);
}

const getPathProp = createPropsSelector((props) => props.path);

export const getFolderIdsByPath = createSelector(
  [
    (state) => state.files.byId,
    (state) => state.files.byPath,
    getPathProp,
  ],
  (byId, byPath, path) => (
    (byPath[path] ?? FILES_EMPTY)
      .map((id) => byId[id])
      .filter((item) => item.mediatype === MediaType.FOLDER)
      .map((item) => item.id)
  ),
);

const getIdsProps = createPropsSelector((props) => props.ids);

export const getFilesByIds = (
  createSelector(
    [
      (state) => state.files.byId,
      getIdsProps,
    ],
    (byId, ids) => (
      ids.map((id) => byId[id])
    ),
  )
);

export const makeGetPreview = () => (
  createSelector(
    [
      (state) => state.files.byId,
      (state, props) => getFileIdsByPath(state, props.dirPath),
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
        files: [
          byId[files[prevIndex]],
          byId[files[index]],
          byId[files[nextIndex]],
        ],
      };
    },
  )
);
