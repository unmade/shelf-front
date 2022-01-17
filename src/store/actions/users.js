export const types = {
  ADD_BOOKMARK: 'ADD_BOOKMARK',
  ADD_BOOKMARK_SUCCESS: 'ADD_BOOKMARK_SUCCESS',
  ADD_BOOKMARK_FAILURE: 'ADD_BOOKMARK_FAILURE',

  LIST_BOOKMARKS: 'LIST_BOOKMARKS',
  LIST_BOOKMARKS_SUCCESS: 'LIST_BOOKMARKS_SUCCESS',
  LIST_BOOKMARKS_FAILURE: 'LIST_BOOKMARKS_FAILURE',

  REMOVE_BOOKMARK: 'REMOVE_BOOKMARK',
  REMOVE_BOOKMARK_SUCCESS: 'UREMOVE_BOOKMARK_SUCCESS',
  REMOVE_BOOKMARK_FAILURE: 'REMOVE_BOOKMARK_FAILURE',
};

export const addBookmark = (fileId) => ({
  type: types.ADD_BOOKMARK,
  payload: { fileId },
});

export const addBookmarkSuccess = () => ({
  type: types.ADD_BOOKMARK_SUCCESS,
  payload: null,
});

export const addBookmarkFailure = (err, fileId) => ({
  type: types.ADD_BOOKMARK_FAILURE,
  payload: { err, fileId },
});

export const listBookmarks = () => ({
  type: types.LIST_BOOKMARKS,
  payload: null,
});

export const listBookmarksSuccess = (data) => ({
  type: types.LIST_BOOKMARKS_SUCCESS,
  payload: { data },
});

export const listBookmarksFailure = (err) => ({
  type: types.LIST_BOOKMARKS_FAILURE,
  payload: { err },
});

export const removeBookmark = (fileId) => ({
  type: types.REMOVE_BOOKMARK,
  payload: { fileId },
});

export const removeBookmarkSuccess = () => ({
  type: types.REMOVE_BOOKMARK_SUCCESS,
  payload: null,
});

export const removeBookmarkFailure = (err, fileId) => ({
  type: types.REMOVE_BOOKMARK_FAILURE,
  payload: { err, fileId },
});
