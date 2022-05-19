import { createAction } from '@reduxjs/toolkit';

export const types = {
  SET_LOADING: 'SET_LOADING',
};

export const scopes = {
  bookmarking: 'bookmarking',
  creatingFolder: 'creatingFolder',
  deletingFileImmediately: 'deletingFileImmediately',
  emptyingTrash: 'emptyingTrash',
  searchingDuplicates: 'searchingDuplicates',
  listingFolder: 'listingFolder',
  listingBookmarks: 'listingBookmarks',
  movingFile: 'movingFile',
  movingToTrash: 'movingToTrash',
  signingIn: 'signingIn',
};

export const setLoadingDeprecated = (scope, value) => ({
  type: types.SET_LOADING,
  payload: { scope, value },
});

function preparePayload(actionType, ref = null) {
  return {
    payload: {
      actionType,
      ref,
    },
  };
}

export const started = createAction('loading/started', preparePayload);
export const loaded = createAction('loading/loaded', preparePayload);
