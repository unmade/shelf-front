export const types = {
  ADD_UPLOAD_FILES: 'ADD_UPLOAD_FILES',
  UPLOAD_FILE: 'UPLOAD_FILE',
  UPLOAD_REQUEST: 'UPLOAD_REQUEST',
  UPLOAD_PROGRESS: 'UPLOAD_PROGRESS',
  UPLOAD_SUCCESS: 'UPLOAD_SUCCESS',
  UPLOAD_FAILURE: 'UPLOAD_FAILURE',
};

export const uploadFile = (file) => ({
  type: types.UPLOAD_FILE,
  payload: { file },
});

export const uploadRequest = (file) => ({
  type: types.UPLOAD_REQUEST,
  payload: { file },
});

export const uploadSuccess = () => ({
  type: types.UPLOAD_SUCCESS,
  payload: null,
});

export const uploadFailure = () => ({
  type: types.UPLOAD_FAILURE,
  payload: null,
});

export const uploadProgress = (file, progress) => ({
  type: types.UPLOAD_PROGRESS,
  payload: { file, progress },
});
