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
    case types.CLEAR_UPLOADS: {
      return {};
    }
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

const VISIBLE_UPLOADS_DEFAULT_STATE = {
  all: [],
  failed: [],
  inProgress: [],
};

function visibleUploads(state = VISIBLE_UPLOADS_DEFAULT_STATE, action) {
  switch (action.type) {
    case types.CLEAR_UPLOADS: {
      return VISIBLE_UPLOADS_DEFAULT_STATE;
    }
    case types.UPLOAD_FILES: {
      const { uploads } = action.payload;
      const ids = uploads.map((item) => item.id);
      return {
        ...state,
        all: [...state.all, ...ids],
        inProgress: [...state.inProgress, ...ids],
      };
    }
    case types.UPLOAD_FAILURE:
    case types.UPLOAD_SUCCESS: {
      const { upload } = action.payload;
      const nextState = {
        ...state,
        inProgress: state.inProgress.filter((uploadId) => uploadId !== upload.id),
      };
      // move succeeded upload to the bottom
      if (action.type === types.UPLOAD_SUCCESS) {
        const allIds = state.all.filter((uploadId) => uploadId !== upload.id);
        nextState.all = [...allIds, upload.id];
      }
      if (action.type === types.UPLOAD_FAILURE) {
        nextState.failed = [...nextState.failed, upload.id];
      }
      return nextState;
    }
    default:
      return state;
  }
}

export default combineReducers({
  byId: uploadsById,
  visible: visibleUploads,
});

export const getUploadById = (state, id) => state.uploads.byId[id];
export const getVisibleUploads = (state, filter) => state.uploads.visible[filter];
