import { combineReducers, createReducer } from '@reduxjs/toolkit';

import * as actions from '../actions/thumbnails';

const INITIAL_STATE = {};

const byId = createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(actions.thumbnailCached, (state, action) => {
    const { fileId, size, objectUrl } = action.payload;
    if (state[fileId] == null) {
      state[fileId] = {};
    }
    state[fileId][size] = objectUrl;
  });
  builder.addCase(actions.thumbnailExpired, (state, action) => {
    const { fileId, size } = action.payload;
    delete state[fileId][size];
  });
});

export default combineReducers({
  byId,
});

export const getThumbnails = (state) => state.thumbnails;
export const getThumbnailById = (state, fileId) => getThumbnails(state).byId[fileId];
