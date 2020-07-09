export const types = {
  LIST_FILES: 'LIST_FILES',
  LIST_FILES_REQUEST: 'LIST_FILES_REQUEST',
  LIST_FILES_SUCCESS: 'LIST_FILES_SUCCESS',
  LIST_FILES_FAILURE: 'LIST_FILES_FAILURE',
  UPLOAD_FILE: 'UPLOAD_FILE',
  ADD_UPLOAD_FILES: 'ADD_UPLOAD_FILES',
  UPLOAD_FAILURE: 'UPLOAD_FAILURE',
  UPLOAD_SUCCESS: 'UPLOAD_SUCCESS',
  UPLOAD_PROGRESS: 'UPLOAD_PROGRESS',
};

export const listFilesRequest = () => ({
  type: types.LIST_FILES_REQUEST,
  payload: null,
});

export const listFilesSuccess = (payload) => ({
  type: types.LIST_FILES_SUCCESS,
  payload,
});

export const listFilesFailure = (payload) => ({
  type: types.LIST_FILES_FAILURE,
  payload,
});

export const listFiles = ({ path }) => ({
  type: types.LIST_FILES,
  payload: { path },
});

export const uploadFailure = () => ({
  type: types.UPLOAD_FAILURE,
  payload: null,
});

export const uploadSuccess = () => ({
  type: types.UPLOAD_SUCCESS,
  payload: null,
});

export const uploadProgress = (file, progress) => ({
  type: types.UPLOAD_PROGRESS,
  payload: { file, progress },
});

export const uploadFile = ({ file }) => ({
  type: types.UPLOAD_FILE,
  payload: { file },
});

export const addUploadFiles = (files) => ({
  type: types.ADD_UPLOAD_FILES,
  payload: files,
});
