export const types = {
  SET_LOADING: 'SET_LOADING',
};

export const scopes = {
  bookmarking: 'bookmarking',
  creatingFolder: 'creatingFolder',
  deletingFileImmediately: 'deletingFileImmediately',
  emptyingTrash: 'emptyingTrash',
  listingFolder: 'listingFolder',
  movingFile: 'movingFile',
  movingToTrash: 'movingToTrash',
  signingIn: 'signingIn',
};

export const setLoading = (scope, value) => ({
  type: types.SET_LOADING,
  payload: { scope, value },
});
