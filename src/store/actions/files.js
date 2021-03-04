export const types = {
  CREATE_FOLDER: 'CREATE_FOLDER',
  CREATE_FOLDER_REQUEST: 'CREATE_FOLDER_REQUEST',
  CREATE_FOLDER_SUCCESS: 'CREATE_FOLDER_SUCCESS',
  CREATE_FOLDER_FAILURE: 'CREATE_FOLDER_FAILURE',

  DOWNLOAD: 'DOWNLOAD',
  DOWNLOAD_REQUEST: 'DOWNLOAD_REQUEST',
  DOWNLOAD_SUCCESS: 'DOWNLOAD_SUCCESS',
  DOWNLOAD_FAILURE: 'DOWNLOAD_FAILURE',

  FETCH_THUMBNAIL: 'FETCH_THUMBNAIL',
  FETCH_THUMBNAIL_REQUEST: 'FETCH_THUMBNAIL_REQUEST',
  FETCH_THUMBNAIL_SUCCESS: 'FETCH_THUMBNAIL_SUCCESS',
  FETCH_THUMBNAIL_FAILURE: 'FETCH_THUMBNAIL_FAILURE',

  LIST_FOLDER: 'LIST_FILES',
  LIST_FOLDER_REQUEST: 'LIST_FILES_REQUEST',
  LIST_FOLDER_SUCCESS: 'LIST_FILES_SUCCESS',
  LIST_FOLDER_FAILURE: 'LIST_FILES_FAILURE',

  MOVE_FILE: 'MOVE_FILE',
  MOVE_FILE_REQUEST: 'MOVE_FILE_REQUEST',
  MOVE_FILE_SUCCESS: 'MOVE_FILE_SUCCESS',
  MOVE_FILE_FAILURE: 'MOVE_FILE_FAILURE',

  MOVE_TO_TRASH: 'MOVE_TO_TRASH',
  MOVE_TO_TRASH_REQUEST: 'MOVE_TO_TRASH_REQUEST',
  MOVE_TO_TRASH_SUCCESS: 'MOVE_TO_TRASH_SUCCESS',
  MOVE_TO_TRASH_FAILURE: 'MOVE_TO_TRASH_FAILURE',

  PERFORM_DOWNLOAD: 'PERFORM_DOWNLOAD',
  RETRIEVE_DOWNLOAD_URL_REQUEST: 'RETRIEVE_DOWNLOAD_URL_REQUEST',
  RETRIEVE_DOWNLOAD_URL_SUCCESS: 'RETRIEVE_DOWNLOAD_URL_SUCCESS',
  RETRIEVE_DOWNLOAD_URL_FAILURE: 'RETRIEVE_DOWNLOAD_URL_FAILURE',

  EMPTY_TRASH: 'EMPTY_TRASH',
  EMPTY_TRASH_REQUEST: 'EMPTY_TRASH_REQUEST',
  EMPTY_TRASH_SUCCESS: 'EMPTY_TRASH_SUCCESS',
  EMPTY_TRASH_FAILURE: 'EMPTY_TRASH_FAILURE',

  DELETE_IMMEDIATELY: 'DELETE_IMMEDIATELY',
  DELETE_IMMEDIATELY_REQUEST: 'DELETE_IMMEDIATELY_REQUEST',
  DELETE_IMMEDIATELY_SUCCESS: 'DELETE_IMMEDIATELY_SUCCESS',
  DELETE_IMMEDIATELY_FAILURE: 'DELETE_IMMEDIATELY_FAILURE',

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

export const download = (path) => ({
  type: types.DOWNLOAD,
  payload: { path },
});

export const downloadRequest = () => ({
  type: types.DOWNLOAD_REQUEST,
  payload: null,
});

export const downloadSuccess = (path, file) => ({
  type: types.DOWNLOAD_SUCCESS,
  payload: { path, file },
});

export const downloadFailure = () => ({
  type: types.DOWNLOAD_FAILURE,
  payload: null,
});

export const fetchThumbnail = (id, path, size) => ({
  type: types.FETCH_THUMBNAIL,
  payload: { id, path, size },
});

export const fetchThumbnailRequest = () => ({
  type: types.FETCH_THUMBNAIL_REQUEST,
  payload: null,
});

export const fetchThumbnailSuccess = (id, size, thumb) => ({
  type: types.FETCH_THUMBNAIL_SUCCESS,
  payload: { id, size, thumb },
});

export const fetchThumbnailFailure = (err) => ({
  type: types.FETCH_THUMBNAIL_FAILURE,
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

export const moveToTrash = (path) => ({
  type: types.MOVE_TO_TRASH,
  payload: { path },
});

export const moveToTrashRequest = () => ({
  type: types.MOVE_TO_TRASH_REQUEST,
  payload: null,
});

export const moveToTrashSuccess = (file) => ({
  type: types.MOVE_TO_TRASH_SUCCESS,
  payload: { file },
});

export const moveToTrashFailure = (err) => ({
  type: types.MOVE_TO_TRASH_FAILURE,
  payload: { err },
});

export const performDownload = (path) => ({
  type: types.PERFORM_DOWNLOAD,
  payload: { path },
});

export const retrieveDownloadUrlRequest = () => ({
  type: types.RETRIEVE_DOWNLOAD_URL_REQUEST,
  payload: null,
});

export const retrieveDownloadUrlSuccess = () => ({
  type: types.RETRIEVE_DOWNLOAD_URL_SUCCESS,
  payload: null,
});

export const retrieveDownloadUrlFailure = (err) => ({
  type: types.RETRIEVE_DOWNLOAD_URL_FAILURE,
  payload: { err },
});

export const emptyTrash = () => ({
  type: types.EMPTY_TRASH,
  payload: null,
});

export const emptyTrashRequest = () => ({
  type: types.EMPTY_TRASH_REQUEST,
  payload: null,
});

export const emptyTrashSuccess = (file) => ({
  type: types.EMPTY_TRASH_SUCCESS,
  payload: { file },
});

export const emptyTrashFailure = (err) => ({
  type: types.EMPTY_TRASH_FAILURE,
  payload: { err },
});

export const deleteImmediately = (path) => ({
  type: types.DELETE_IMMEDIATELY,
  payload: { path },
});

export const deleteImmediatelyRequest = () => ({
  type: types.DELETE_IMMEDIATELY_REQUEST,
  payload: null,
});

export const deleteImmediatelySucess = (file) => ({
  type: types.DELETE_IMMEDIATELY_SUCCESS,
  payload: { file },
});

export const deleteImmediatelyFailure = () => ({
  type: types.DELETE_IMMEDIATELY_FAILURE,
  payload: null,
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
