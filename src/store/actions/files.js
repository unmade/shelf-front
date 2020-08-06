export const types = {
  CREATE_FOLDER: 'CREATE_FOLDER',
  CREATE_FOLDER_REQUEST: 'CREATE_FOLDER_REQUEST',
  CREATE_FOLDER_SUCCESS: 'CREATE_FOLDER_SUCCESS',
  CREATE_FOLDER_FAILURE: 'CREATE_FOLDER_FAILURE',
  LIST_FOLDER: 'LIST_FILES',
  LIST_FOLDER_REQUEST: 'LIST_FILES_REQUEST',
  LIST_FOLDER_SUCCESS: 'LIST_FILES_SUCCESS',
  LIST_FOLDER_FAILURE: 'LIST_FILES_FAILURE',
  MOVE_FILE: 'MOVE_FILE',
  MOVE_FILE_REQUEST: 'MOVE_FILE_REQUEST',
  MOVE_FILE_SUCCESS: 'MOVE_FILE_SUCCESS',
  MOVE_FILE_FAILURE: 'MOVE_FILE_FAILURE',
  SELECT_FILE: 'SELECT_FILE',
  DESELECT_FILES: 'DESELECT_FILES',
  UPDATE_FOLDER_BY_PATH: 'UPDATE_FOLDER_BY_PATH',
  PATH_CHANGED: 'PATH_CHANGED',
};

export const createFolder = (name, parentFolderPath) => ({
  type: types.CREATE_FOLDER,
  payload: { name, parentFolderPath },
});

export const createFolderRequest = () => ({
  type: types.CREATE_FOLDER_REQUEST,
  payload: null,
});

export const createFolderSuccess = (folder) => ({
  type: types.CREATE_FOLDER_SUCCESS,
  payload: { folder },
});

export const createFolderFailure = (err) => ({
  type: types.CREATE_FOLDER_FAILURE,
  payload: { err },
});

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

export const moveFile = (fromPath, toPath) => ({
  type: types.MOVE_FILE,
  payload: { fromPath, toPath },
});

export const moveFileRequest = () => ({
  type: types.MOVE_FILE_REQUEST,
  payload: null,
});

export const moveFileSuccess = (file, prevPath) => ({
  type: types.MOVE_FILE_SUCCESS,
  payload: { file, prevPath },
});

export const moveFileFailure = (err) => ({
  type: types.MOVE_FILE_FAILURE,
  payload: { err },
});

export const selectFile = (id) => ({
  type: types.SELECT_FILE,
  payload: { id },
});

export const deselectFiles = () => ({
  type: types.DESELECT_FILES,
  payload: null,
});

export const updateFolderByPath = (path, ids) => ({
  type: types.UPDATE_FOLDER_BY_PATH,
  payload: { path, ids },
});

export const changePath = (path) => ({
  type: types.PATH_CHANGED,
  payload: { path },
});
