import { combineReducers } from 'redux';

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
    case types.CREATE_FOLDER_SUCCESS: {
      const { folder } = action.payload;
      return {
        ...state,
        [folder.id]: folder,
      };
    }
    case types.LIST_FOLDER_SUCCESS: {
      return {
        ...state,
        ...normalize(action.payload.items),
      };
    }
    case types.MOVE_TO_TRASH_SUCCESS:
    case types.MOVE_FILE_SUCCESS: {
      const { file } = action.payload;
      return {
        ...state,
        [file.id]: file,
      };
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

function selectFiles(state = new Set(), action) {
  switch (action.type) {
    case types.SELECT_FILE: {
      const { id } = action.payload;
      if (!state.has(id)) {
        return new Set([id]);
      }
      return state;
    }
    case types.DESELECT_FILES: {
      return new Set();
    }
    default:
      return state;
  }
}

function filesByPath(state = {}, action) {
  switch (action.type) {
    case types.LIST_FOLDER_SUCCESS: {
      const { path, items } = action.payload;
      return {
        ...state,
        [path]: items.map((file) => file.id),
      };
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

function currPath(state = '.', action) {
  switch (action.type) {
    case types.PATH_CHANGED: {
      return action.payload.path;
    }
    default:
      return state;
  }
}

export default combineReducers({
  byId: filesById,
  byPath: filesByPath,
  selectedIds: selectFiles,
  currPath,
});

export const getFileById = (state, id) => state.files.byId[id];
export const getFilesByPath = (state, path) => state.files.byPath[path] || [];
export const getIsFileSelected = (state, id) => state.files.selectedIds.has(id);
export const getSelectedFiles = (state) => [...state.files.selectedIds].map((id) => getFileById(state, id));
export const getHasSelectedFiles = (state) => state.files.selectedIds.size !== 0;

// I think I should move it to another reducer;
export const getCurrPath = (state) => state.files.currPath;
