import { combineReducers } from 'redux';

import { types } from '../actions/uploads';

function normalize(files) {
  const data = {};
  files.forEach((file) => {
    data[file.id] = {
      ...file,
      progress: 0,
      error: null,
    };
  });
  return data;
}

function uploadsById(state = {}, action) {
  switch (action.type) {
    case types.ADD_UPLOAD_FILES: {
      return {
        ...state,
        ...normalize(action.payload),
      };
    }
    case types.UPLOAD_PROGRESS: {
      const { file, progress } = action.payload;
      return {
        ...state,
        [file.id]: {
          ...state[file.id],
          ...file,
          progress,
        },
      };
    }
    case types.UPLOAD_FAILURE: {
      const { file, err } = action.payload;
      return {
        ...state,
        [file.id]: {
          ...state[file.id],
          ...file,
          error: err,
        },
      };
    }
    default:
      return state;
  }
}

function allUploads(state = [], action) {
  switch (action.type) {
    case types.ADD_UPLOAD_FILES: {
      return [
        ...state,
        ...action.payload.map((item) => item.id),
      ];
    }
    default:
      return state;
  }
}

export default combineReducers({
  byId: uploadsById,
  allIds: allUploads,
});

export const getUploadById = (state, id) => state.uploads.byId[id];
export const getUploads = (state) => state.uploads.allIds;
export const getHasUploads = (state) => state.uploads.allIds.length > 0;
