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
    case types.LIST_FOLDER_SUCCESS: {
      return {
        ...state,
        ...normalize(action.payload.items),
      };
    }
    case uploadTypes.UPLOAD_SUCCESS: {
      const { file } = action.payload;
      return {
        ...state,
        [file.id]: action.payload.file,
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
    case uploadTypes.UPLOAD_SUCCESS: {
      const { file } = action.payload;
      let path = file.path.substring(0, file.path.length - file.name.length - 1);
      if (path !== '.') {
        path = path.substring(2);
      }
      return {
        ...state,
        [path]: [
          ...(state[path] || []),
          file.id,
        ],
      };
    }
    default:
      return state;
  }
}

export default combineReducers({
  byId: filesById,
  byPath: filesByPath,
  selectedIds: selectFiles,
});

export const getFileById = (state, id) => state.files.byId[id];
export const getFilesByPath = (state, path) => state.files.byPath[path] || [];
export const getIsFileSelected = (state, id) => state.files.selectedIds.has(id);
export const getSelectedFiles = (state) => [...state.files.selectedIds].map((id) => getFileById(state, id));
export const getHasSelectedFiles = (state) => state.files.selectedIds.size !== 0;
