import { combineReducers, createReducer, createSelector } from '@reduxjs/toolkit';

import * as actions from '../actions/uploads';

const UPLOADS_BY_ID_INITIAL_STATE = {};

const byId = createReducer(UPLOADS_BY_ID_INITIAL_STATE, (builder) => {
  builder.addCase(actions.uploadsAdded, (state, action) => {
    const { uploads } = action.payload;
    uploads.forEach((upload) => {
      state[upload.id] = upload;
    });
  });
  builder.addCase(actions.uploadsCleared, () => UPLOADS_BY_ID_INITIAL_STATE);
  builder.addCase(actions.uploadProgressed, (state, action) => {
    const { upload, progress } = action.payload;
    state[upload.id].progress = progress;
  });
  builder.addCase(actions.uploadRejected, (state, action) => {
    const {
      error,
      meta: { upload },
    } = action.payload;
    state[upload.id].error = error;
  });
});

const ALL_UPLOADS_INITIAL_STATE = [];

const allIds = createReducer(ALL_UPLOADS_INITIAL_STATE, (builder) => {
  builder.addCase(actions.uploadsAdded, (state, action) => {
    const { uploads } = action.payload;
    state.push(...uploads.map((upload) => upload.id));
  });
  builder.addCase(actions.uploadsCleared, () => ALL_UPLOADS_INITIAL_STATE);
});

export default combineReducers({
  byId,
  allIds,
});

export const getUploadById = (state, id) => state.uploads.byId[id];
export const getAllUploads = (state) => state.uploads.allIds.map((id) => getUploadById(state, id));

export const getVisibleUploads = createSelector(
  [getAllUploads, (_, props) => props.filter],
  (uploads, filter) => {
    switch (filter) {
      case 'all':
        return uploads.map((upload) => upload.id);
      case 'inProgress':
        return uploads.filter((upload) => upload.progress < 100).map((upload) => upload.id);
      case 'failed':
        return uploads.filter((upload) => upload.error).map((upload) => upload.id);
      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  }
);
