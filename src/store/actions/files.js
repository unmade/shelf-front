export const types = {
  LIST_FOLDER: 'LIST_FILES',
  LIST_FOLDER_REQUEST: 'LIST_FILES_REQUEST',
  LIST_FOLDER_SUCCESS: 'LIST_FILES_SUCCESS',
  LIST_FOLDER_FAILURE: 'LIST_FILES_FAILURE',
  SELECT_FILE: 'SELECT_FILE',
  DESELECT_FILES: 'DESELECT_FILES',
};

export const listFolder = (path) => ({
  type: types.LIST_FOLDER,
  payload: { path },
});

export const listFolderRequest = () => ({
  type: types.LIST_FOLDER_REQUEST,
  payload: null,
});

export const listFolderSuccess = (payload) => ({
  type: types.LIST_FOLDER_SUCCESS,
  payload,
});

export const listFolderFailure = (payload) => ({
  type: types.LIST_FOLDER_FAILURE,
  payload,
});

export const selectFile = (id) => ({
  type: types.SELECT_FILE,
  payload: { id },
});

export const deselectFiles = () => ({
  type: types.DESELECT_FILES,
  payload: null,
});
