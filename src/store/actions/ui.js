export const types = {
  OPEN_RENAME_FILE_DIALOG: 'OPEN_RENAME_FILE_DIALOG',
  CLOSE_RENAME_FILE_DIALOG: 'CLOSE_RENAME_FILE_DIALOG',
  OPEN_DELETE_DIALOG: 'OPEN_MOVE_TO_TRASH_DIALOG',
  CLOSE_DELETE_DIALOG: 'CLOSE_MOVE_TO_TRASH_DIALOG',
  OPEN_DELETE_IMMEDIATELY_DIALOG: 'OPEN_DELETE_IMMEDIATELY_DIALOG',
  CLOSE_DELETE_IMMEDIATELY_DIALOG: 'CLOSE_DELETE_IMMEDIATELY_DIALOG',
  OPEN_MOVE_DIALOG: 'OPEN_MOVE_DIALOG',
  CLOSE_MOVE_DIALOG: 'CLOSE_MOVE_DIALOG',
  TOGGLE_CREATE_FOLDER_DIALOG_VISIBLE: 'TOGGLE_CREATE_FOLDER_DIALOG_VISIBLE',
  TOGGLE_EMPTY_TRASH_DIALOG: 'TOGGLE_EMPTY_TRASH_DIALOG',
  SET_SCROLL_OFFSET: 'SET_SCROLL_OFFSET',
  SET_UPLOAD_FILTER: 'SET_UPLOAD_FILTER',
};

export const toggleCreateFolderDialogVisible = () => ({
  type: types.TOGGLE_CREATE_FOLDER_DIALOG_VISIBLE,
  payload: null,
});

export const toggleEmptyTrashDialog = () => ({
  type: types.TOGGLE_EMPTY_TRASH_DIALOG,
  payload: null,
});

export const openRenameFileDialog = (fileId) => ({
  type: types.OPEN_RENAME_FILE_DIALOG,
  payload: { fileId },
});

export const closeRenameFileDialog = () => ({
  type: types.CLOSE_RENAME_FILE_DIALOG,
  payload: null,
});

export const openDeleteDialog = (fileId) => ({
  type: types.OPEN_DELETE_DIALOG,
  payload: { fileId },
});

export const closeDeleteDialog = () => ({
  type: types.CLOSE_DELETE_DIALOG,
  payload: null,
});

export const openDeleteImmediatelyDialog = (fileId) => ({
  type: types.OPEN_DELETE_IMMEDIATELY_DIALOG,
  payload: { fileId },
});

export const closeDeleteImmediatelyDialog = () => ({
  type: types.CLOSE_DELETE_IMMEDIATELY_DIALOG,
  payload: null,
});

export const openMoveDialog = (fileId) => ({
  type: types.OPEN_MOVE_DIALOG,
  payload: { fileId },
});

export const closeMoveDialog = () => ({
  type: types.CLOSE_MOVE_DIALOG,
  payload: null,
});

export const setScrollOffset = (key, offset) => ({
  type: types.SET_SCROLL_OFFSET,
  payload: { key, offset },
});

export const setUploadFilter = (visibilityFilter) => ({
  type: types.SET_UPLOAD_FILTER,
  payload: { visibilityFilter },
});
