import { combineReducers } from 'redux';

import { types } from '../actions/users';

const INITIAL_STATE = new Set();

function bookmarks(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.ADD_BOOKMARK:
    case types.REMOVE_BOOKMARK_FAILURE: {
      const { fileId } = action.payload;
      const nextState = new Set(state);
      nextState.add(fileId);
      return nextState;
    }
    case types.LIST_BOOKMARKS_SUCCESS: {
      const {
        data: { items },
      } = action.payload;
      return new Set(items);
    }
    case types.REMOVE_BOOKMARK:
    case types.ADD_BOOKMARK_FAILURE: {
      const { fileId } = action.payload;
      const nextState = new Set(state);
      nextState.delete(fileId);
      return nextState;
    }
    default:
      return state;
  }
}

export default combineReducers({
  bookmarks,
});

export const getBookmarks = (state) => state.users.bookmarks;
export const getIsBookmarked = (state, id) => state.users.bookmarks.has(id);
