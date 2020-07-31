export const types = {
  ADD_UPLOAD_FILES: 'ADD_UPLOAD_FILES',
  UPLOAD_FILE: 'UPLOAD_FILE',
  UPLOAD_REQUEST: 'UPLOAD_REQUEST',
  UPLOAD_PROGRESS: 'UPLOAD_PROGRESS',
  UPLOAD_SUCCESS: 'UPLOAD_SUCCESS',
  UPLOAD_FAILURE: 'UPLOAD_FAILURE',
};

export const addUploadFiles = (uploads) => ({
  type: types.ADD_UPLOAD_FILES,
  payload: { uploads },
});

export const uploadFile = (upload) => ({
  type: types.UPLOAD_FILE,
  payload: { upload },
});

export const uploadRequest = (upload) => ({
  type: types.UPLOAD_REQUEST,
  payload: { upload },
});

export const uploadSuccess = (upload, response) => ({
  type: types.UPLOAD_SUCCESS,
  payload: { upload, file: response.file, updates: response.updates },
});

export const uploadFailure = (upload, err) => ({
  type: types.UPLOAD_FAILURE,
  payload: { upload, err },
});

export const uploadProgress = (upload, progress) => ({
  type: types.UPLOAD_PROGRESS,
  payload: { upload, progress },
});
