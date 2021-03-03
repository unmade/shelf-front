export const types = {
  ADD_FILE_ENTRIES: 'ADD_FILE_ENTRIES',
  CLEAR_UPLOADS: 'CLEAR_UPLOADS',
  UPLOAD_FILES: 'UPLOAD_FILES',
  UPLOAD_FILES_CLEAR: 'UPLOAD_FILES_CLEAR',
  UPLOAD_FILE: 'UPLOAD_FILE',
  UPLOAD_REQUEST: 'UPLOAD_REQUEST',
  UPLOAD_PROGRESS: 'UPLOAD_PROGRESS',
  UPLOAD_SUCCESS: 'UPLOAD_SUCCESS',
  UPLOAD_FAILURE: 'UPLOAD_FAILURE',
};

export const addFileEntries = (files, uploadTo) => ({
  type: types.ADD_FILE_ENTRIES,
  payload: { files, uploadTo },
});

export const uploadFiles = (uploads) => ({
  type: types.UPLOAD_FILES,
  payload: { uploads },
});

export const clearUploads = () => ({
  type: types.CLEAR_UPLOADS,
  payload: null,
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
