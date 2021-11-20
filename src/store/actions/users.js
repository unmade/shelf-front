export const types = {
  ADD_BOOKMARK: 'ADD_BOOKMARK',
  ADD_BOOKMARK_SUCCESS: 'ADD_BOOKMARK_SUCCESS',
  ADD_BOOKMARK_FAILURE: 'ADD_BOOKMARK_FAILURE',

  REMOVE_BOOKMARK: 'REMOVE_BOOKMARK',
  REMOVE_BOOKMARK_SUCCESS: 'UREMOVE_BOOKMARK_SUCCESS',
  REMOVE_BOOKMARK_FAILURE: 'REMOVE_BOOKMARK_FAILURE',
};

export const addBookmark = (fileId) => ({
  type: types.ADD_BOOKMARK,
  payload: { fileId },
});

export const addBookmarkSuccess = (path) => ({
  type: types.ADD_BOOKMARK_SUCCESS,
  payload: { path },
});

export const addBookmarkFailure = (err) => ({
  type: types.ADD_BOOKMARK_FAILURE,
  payload: { err },
});

export const removeBookmark = (path) => ({
  type: types.REMOVE_BOOKMARK,
  payload: { path },
});

export const removeBookmarkSuccess = (file) => ({
  type: types.REMOVE_BOOKMARK_SUCCESS,
  payload: { file },
});

export const removeBookmarkFailure = (err) => ({
  type: types.REMOVE_BOOKMARK_FAILURE,
  payload: { err },
});
