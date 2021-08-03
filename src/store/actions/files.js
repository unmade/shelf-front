export const types = {
  CREATE_FOLDER: 'CREATE_FOLDER',
  CREATE_FOLDER_SUCCESS: 'CREATE_FOLDER_SUCCESS',
  CREATE_FOLDER_FAILURE: 'CREATE_FOLDER_FAILURE',

  DELETE_IMMEDIATELY: 'DELETE_IMMEDIATELY',
  DELETE_IMMEDIATELY_SUCCESS: 'DELETE_IMMEDIATELY_SUCCESS',
  DELETE_IMMEDIATELY_FAILURE: 'DELETE_IMMEDIATELY_FAILURE',

  DELETE_IMMEDIATELY_BATCH: 'DELETE_IMMEDIATELY_BATCH',

  DOWNLOAD: 'DOWNLOAD',
  DOWNLOAD_SUCCESS: 'DOWNLOAD_SUCCESS',
  DOWNLOAD_FAILURE: 'DOWNLOAD_FAILURE',

  EMPTY_TRASH: 'EMPTY_TRASH',
  EMPTY_TRASH_SUCCESS: 'EMPTY_TRASH_SUCCESS',
  EMPTY_TRASH_FAILURE: 'EMPTY_TRASH_FAILURE',

  FETCH_THUMBNAIL: 'FETCH_THUMBNAIL',
  FETCH_THUMBNAIL_SUCCESS: 'FETCH_THUMBNAIL_SUCCESS',
  FETCH_THUMBNAIL_FAILURE: 'FETCH_THUMBNAIL_FAILURE',

  LIST_FOLDER: 'LIST_FILES',
  LIST_FOLDER_SUCCESS: 'LIST_FILES_SUCCESS',
  LIST_FOLDER_FAILURE: 'LIST_FILES_FAILURE',

  MOVE_FILE: 'MOVE_FILE',
  MOVE_FILE_SUCCESS: 'MOVE_FILE_SUCCESS',
  MOVE_FILE_FAILURE: 'MOVE_FILE_FAILURE',

  MOVE_FILE_BATCH: 'MOVE_FILE_BATCH',
  MOVE_FILE_BATCH_SUCCESS: 'MOVE_FILE_BATCH_SUCCESS',
  MOVE_FILE_BATCH_FAILURE: 'MOVE_FILE_BATCH_FAILURE',

  MOVE_TO_TRASH: 'MOVE_TO_TRASH',
  MOVE_TO_TRASH_SUCCESS: 'MOVE_TO_TRASH_SUCCESS',
  MOVE_TO_TRASH_FAILURE: 'MOVE_TO_TRASH_FAILURE',

  MOVE_TO_TRASH_BATCH: 'MOVE_TO_TRASH_BATCH',
  MOVE_TO_TRASH_BATCH_SUCCESS: 'MOVE_TO_TRASH_BATCH_SUCCESS',
  MOVE_TO_TRASH_BATCH_FAILURE: 'MOVE_TO_TRASH_BATCH_FAILURE',

  PERFORM_DOWNLOAD: 'PERFORM_DOWNLOAD',
  RETRIEVE_DOWNLOAD_URL_SUCCESS: 'RETRIEVE_DOWNLOAD_URL_SUCCESS',
  RETRIEVE_DOWNLOAD_URL_FAILURE: 'RETRIEVE_DOWNLOAD_URL_FAILURE',

  SELECT_FILE_ADD: 'SELECT_FILE_ADD',
  SELECT_FILE_BULK: 'SELECT_FILE_BULK',
  SELECT_FILE: 'SELECT_FILE',
  DESELECT_FILES: 'DESELECT_FILES',
  DESELECT_FILES_BULK: 'DESELECT_FILES_BULK',

  UPDATE_FOLDER_BY_PATH: 'UPDATE_FOLDER_BY_PATH',
  PATH_CHANGED: 'PATH_CHANGED',
};

export const createFolder = (path) => ({
  type: types.CREATE_FOLDER,
  payload: { path },
});

export const createFolderSuccess = (folder) => ({
  type: types.CREATE_FOLDER_SUCCESS,
  payload: { folder },
});

export const createFolderFailure = (err) => ({
  type: types.CREATE_FOLDER_FAILURE,
  payload: { err },
});

export const deleteImmediately = (path) => ({
  type: types.DELETE_IMMEDIATELY,
  payload: { path },
});

export const deleteImmediatelySucess = (file) => ({
  type: types.DELETE_IMMEDIATELY_SUCCESS,
  payload: { file },
});

export const deleteImmediatelyFailure = () => ({
  type: types.DELETE_IMMEDIATELY_FAILURE,
  payload: null,
});

export const deleteImmediatelyBatch = (paths) => ({
  type: types.DELETE_IMMEDIATELY_BATCH,
  payload: { paths },
});

export const download = (path) => ({
  type: types.DOWNLOAD,
  payload: { path },
});

export const downloadSuccess = (path, file) => ({
  type: types.DOWNLOAD_SUCCESS,
  payload: { path, file },
});

export const downloadFailure = () => ({
  type: types.DOWNLOAD_FAILURE,
  payload: null,
});

export const emptyTrash = () => ({
  type: types.EMPTY_TRASH,
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

export const fetchThumbnail = (id, path, size) => ({
  type: types.FETCH_THUMBNAIL,
  payload: { id, path, size },
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

export const moveFileSuccess = (file, prevPath) => ({
  type: types.MOVE_FILE_SUCCESS,
  payload: { file, prevPath },
});

export const moveFileFailure = (err) => ({
  type: types.MOVE_FILE_FAILURE,
  payload: { err },
});

export const moveFileBatch = (relocations) => ({
  type: types.MOVE_FILE_BATCH,
  payload: { relocations },
});

export const moveFileBatchSuccess = ({ async_task_id: taskId }) => ({
  type: types.MOVE_FILE_BATCH_SUCCESS,
  payload: { taskId },
});

export const moveFileBatchFailure = (err) => ({
  type: types.MOVE_FILE_FAILURE,
  payload: { err },
});

export const moveToTrash = (path) => ({
  type: types.MOVE_TO_TRASH,
  payload: { path },
});

export const moveToTrashSuccess = (file) => ({
  type: types.MOVE_TO_TRASH_SUCCESS,
  payload: { file },
});

export const moveToTrashFailure = (err) => ({
  type: types.MOVE_TO_TRASH_FAILURE,
  payload: { err },
});

export const moveToTrashBatch = (paths) => ({
  type: types.MOVE_TO_TRASH_BATCH,
  payload: { paths },
});

export const moveToTrashBatchSuccess = ({ async_task_id: taskId }) => ({
  type: types.MOVE_TO_TRASH_BATCH_SUCCESS,
  payload: { taskId },
});

export const moveToTrashBatchFailure = (err) => ({
  type: types.MOVE_TO_TRASH_BATCH_FAILURE,
  payload: { err },
});

export const performDownload = (path) => ({
  type: types.PERFORM_DOWNLOAD,
  payload: { path },
});

export const retrieveDownloadUrlSuccess = () => ({
  type: types.RETRIEVE_DOWNLOAD_URL_SUCCESS,
  payload: null,
});

export const retrieveDownloadUrlFailure = (err) => ({
  type: types.RETRIEVE_DOWNLOAD_URL_FAILURE,
  payload: { err },
});

export const bulkSelectFiles = (ids) => ({
  type: types.SELECT_FILE_BULK,
  payload: { ids },
});

export const selectFile = (id) => ({
  type: types.SELECT_FILE,
  payload: { id },
});

export const addToSelection = (id) => ({
  type: types.SELECT_FILE_ADD,
  payload: { id },
});

export const deselectFiles = () => ({
  type: types.DESELECT_FILES,
  payload: null,
});

export const bulkDeselectFiles = (ids) => ({
  type: types.DESELECT_FILES_BULK,
  payload: { ids },
});

export const updateFolderByPath = (path, ids) => ({
  type: types.UPDATE_FOLDER_BY_PATH,
  payload: { path, ids },
});
