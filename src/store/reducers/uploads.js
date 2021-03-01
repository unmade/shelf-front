import { combineReducers } from 'redux';

import { types } from '../actions/uploads';

function normalize(items) {
  const data = {};
  items.forEach((item) => {
    data[item.id] = item;
  });
  return data;
}

function uploadsById(state = {}, action) {
  switch (action.type) {
    case types.UPLOAD_FILES: {
      return {
        ...state,
        ...normalize(action.payload.uploads),
      };
    }
    case types.UPLOAD_PROGRESS: {
      const { upload, progress } = action.payload;
      return {
        ...state,
        [upload.id]: {
          ...state[upload.id],
          ...upload,
          progress,
        },
      };
    }
    case types.UPLOAD_FAILURE: {
      const { upload, err } = action.payload;
      return {
        ...state,
        [upload.id]: {
          ...state[upload.id],
          ...upload,
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
    case types.UPLOAD_FILES: {
      return [
        ...state,
        ...action.payload.uploads.map((item) => item.id),
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
