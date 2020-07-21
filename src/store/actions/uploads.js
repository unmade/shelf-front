export const types = {
  ADD_UPLOAD_FILES: 'ADD_UPLOAD_FILES',
  UPLOAD_FILE: 'UPLOAD_FILE',
  UPLOAD_REQUEST: 'UPLOAD_REQUEST',
  UPLOAD_PROGRESS: 'UPLOAD_PROGRESS',
  UPLOAD_SUCCESS: 'UPLOAD_SUCCESS',
  UPLOAD_FAILURE: 'UPLOAD_FAILURE',
};

export const addUploadFiles = (files) => ({
  type: types.ADD_UPLOAD_FILES,
  payload: files,
});

export const uploadFile = (file) => ({
  type: types.UPLOAD_FILE,
  payload: { file },
});

export const uploadRequest = (file) => ({
  type: types.UPLOAD_REQUEST,
  payload: { file },
});

export const uploadSuccess = (file) => ({
  type: types.UPLOAD_SUCCESS,
  payload: { file },
});

export const uploadFailure = (file, err) => ({
  type: types.UPLOAD_FAILURE,
  payload: { file, err },
});

export const uploadProgress = (file, progress) => ({
  type: types.UPLOAD_PROGRESS,
  payload: { file, progress },
});
