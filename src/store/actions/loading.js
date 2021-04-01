export const types = {
  SET_LOADING: 'SET_LOADING',
};

export const scopes = {
  creatingFolder: 'creatingFolder',
  movingFile: 'movingFile',
  movingToTrash: 'movingToTrash',
  signingIn: 'signingIn',
};

export const setLoading = (scope, value) => ({
  type: types.SET_LOADING,
  payload: { scope, value },
});
