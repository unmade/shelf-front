import { combineReducers, createReducer, createSelector } from '@reduxjs/toolkit';
import { shallowEqual } from 'react-redux';

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
  builder.addCase(actions.uploadFulfilled, (state, action) => {
    const { upload } = action.meta;
    state[upload.id].done = true;
  });
  builder.addCase(actions.uploadRejected, (state, action) => {
    const {
      error,
      meta: { upload },
    } = action;
    state[upload.id].error = error;
    state[upload.id].done = true;
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

export const getVisibleUploads = createSelector(
  [(state) => state.uploads.allIds, (state) => state.uploads.byId, (_, props) => props.filter],
  (ids, allbyId, filter) => {
    const uploads = ids.map((id) => allbyId[id]);
    switch (filter) {
      case 'all':
        return uploads.map((upload) => upload.id);
      case 'inProgress':
        return uploads
          .filter(({ progress, error }) => progress < 100 && !error)
          .map((upload) => upload.id);
      case 'failed':
        return uploads.filter((upload) => upload.error).map((upload) => upload.id);
      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  },
  {
    memoizeOptions: {
      equalityCheck: (a, b) => a === b,
      maxSize: 3,
      resultEqualityCheck: shallowEqual,
    },
  }
);

export const getVisibleUploadsLength = (state, filter) =>
  getVisibleUploads(state, { filter }).length;

export const getIsUploading = (state) => getVisibleUploadsLength(state, 'inProgress') > 0;
