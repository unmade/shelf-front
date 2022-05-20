import { createReducer } from '@reduxjs/toolkit';
import * as actions from '../actions/loading';
import { types as fileTypes } from '../actions/files';
import { scopes, types } from '../actions/loading';

const INITIAL_STATE = { actions: [] };

const scopeByType = {
  [fileTypes.CREATE_FOLDER_FAILURE]: scopes.creatingFolder,
  [fileTypes.CREATE_FOLDER_SUCCESS]: scopes.creatingFolder,
  [fileTypes.DELETE_IMMEDIATELY_FAILURE]: scopes.deletingFileImmediately,
  [fileTypes.DELETE_IMMEDIATELY_SUCCESS]: scopes.deletingFileImmediately,
  [fileTypes.EMPTY_TRASH_FAILURE]: scopes.emptyingTrash,
  [fileTypes.EMPTY_TRASH_SUCCESS]: scopes.emptyingTrash,
  [fileTypes.FIND_DUPLICATES_FAILURE]: scopes.searchingDuplicates,
  [fileTypes.FIND_DUPLICATES_SUCCESS]: scopes.searchingDuplicates,
  [fileTypes.LIST_FOLDER_FAILURE]: scopes.listingFolder,
  [fileTypes.LIST_FOLDER_SUCCESS]: scopes.listingFolder,
  [fileTypes.MOVE_FILE_FAILURE]: scopes.movingFile,
  [fileTypes.MOVE_FILE_SUCCESS]: scopes.movingFile,
  [fileTypes.MOVE_FILE_BATCH_FAILURE]: scopes.movingFile,
  [fileTypes.MOVE_FILE_BATCH_SUCCESS]: scopes.movingFile,
  [fileTypes.MOVE_TO_TRASH_BATCH_FAILURE]: scopes.movingToTrash,
  [fileTypes.MOVE_TO_TRASH_BATCH_SUCCESS]: scopes.movingToTrash,
  [fileTypes.LIST_BOOKMARKS_FAILURE]: scopes.listingBookmarks,
  [fileTypes.LIST_BOOKMARKS_SUCCESS]: scopes.listingBookmarks,
};

function isLoaded(action) {
  return scopeByType[action.type] != null;
}

const loading = createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(actions.started, (state, action) => {
    const { actionType, ref } = action.payload;
    state.actions.push({ actionType, ref });
  });
  builder.addCase(actions.loaded, (state, action) => {
    const { actionType, ref } = action.payload;
    state.actions = state.actions.filter(
      (item) => item.actionType !== actionType || item.ref !== ref
    );
  });
  builder.addCase(types.SET_LOADING, (state, action) => {
    const { scope, value } = action.payload;
    state[scope] = value;
  });
  builder.addMatcher(isLoaded, (state, action) => {
    state[scopeByType[action.type]] = false;
  });
});

export default loading;

export const getLoadingDeprecated = (state, scope) => state.loading[scope] || false;

export const selectLoading = (state, { actionType, ref = null }) =>
  state.loading.actions.some(({ actionType: t, ref: r }) => t === actionType && r === ref);
