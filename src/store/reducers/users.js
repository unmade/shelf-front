import { combineReducers, createSelector } from '@reduxjs/toolkit';

import { types } from '../actions/users';

function bookmarks(state = [], action) {
  switch (action.type) {
    case types.ADD_BOOKMARK:
    case types.REMOVE_BOOKMARK_FAILURE: {
      const { fileId } = action.payload;
      return [...state, fileId];
    }
    case types.LIST_BOOKMARKS_SUCCESS: {
      const {
        data: { items },
      } = action.payload;
      return [...items];
    }
    case types.REMOVE_BOOKMARK:
    case types.ADD_BOOKMARK_FAILURE: {
      const { fileId } = action.payload;
      return state.filter((id) => id === fileId);
    }
    default:
      return state;
  }
}

export default combineReducers({
  bookmarks,
});

export const getBookmarks = createSelector(
  (state) => state.users.bookmarks,
  (items) => new Set(items)
);
export const getIsBookmarked = (state, id) => getBookmarks(state).has(id);
