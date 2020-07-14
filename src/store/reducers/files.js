import { combineReducers } from 'redux';

import { types } from '../actions/files';

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
    default:
      return state;
  }
}

function folder(state = [], action) {
  switch (action.type) {
    case types.LIST_FOLDER_SUCCESS: {
      return action.payload.items.map((file) => file.id);
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

export default combineReducers({
  byId: filesById,
  folderIds: folder,
  selectedIds: selectFiles,
});

export const getFileById = (state, id) => state.files.byId[id];
export const getFolder = (state) => state.files.folderIds;
export const getIsFileSelected = (state, id) => state.files.selectedIds.has(id);
export const getSelectedFiles = (state) => [...state.files.selectedIds].map((id) => getFileById(state, id));
export const getHasSelectedFiles = (state) => state.files.selectedIds.size !== 0;
