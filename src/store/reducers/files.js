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

export default combineReducers({
  byId: filesById,
  folderIds: folder,
});

export const getFileById = (state, id) => state.files.byId[id];
export const getFolder = (state) => state.files.folderIds;
