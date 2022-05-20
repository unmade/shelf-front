import { combineReducers, createReducer, createSelector } from '@reduxjs/toolkit';

import { fulfilled, rejected } from '../actions';
import * as actions from '../actions/users';

const INITIAL_STATE = [];

const bookmarks = createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(actions.addBookmark, (state, action) => {
    const { fileId } = action.payload;
    state.push(fileId);
  });
  builder.addCase(rejected(actions.addBookmark), (state, action) => {
    const { fileId } = action.payload;
    return state.filter((id) => id !== fileId);
  });
  builder.addCase(fulfilled(actions.listBookmarks), (state, action) => {
    const { items } = action.payload;
    state.push(...items);
  });
  builder.addCase(actions.removeBookmark, (state, action) => {
    const { fileId } = action.payload;
    return state.filter((id) => id !== fileId);
  });
  builder.addCase(rejected(actions.removeBookmark), (state, action) => {
    const { fileId } = action.payload;
    state.push(fileId);
  });
});

export default combineReducers({
  bookmarks,
});

export const getBookmarks = createSelector(
  (state) => state.users.bookmarks,
  (items) => new Set(items)
);
export const getIsBookmarked = (state, id) => getBookmarks(state).has(id);
