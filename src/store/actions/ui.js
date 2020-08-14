export const types = {
  OPEN_RENAME_FILE_DIALOG: 'OPEN_RENAME_FILE_DIALOG',
  CLOSE_RENAME_FILE_DIALOG: 'CLOSE_RENAME_FILE_DIALOG',
  OPEN_DELETE_DIALOG: 'OPEN_MOVE_TO_TRASH_DIALOG',
  CLOSE_DELETE_DIALOG: 'CLOSE_MOVE_TO_TRASH_DIALOG',
  OPEN_MOVE_DIALOG: 'OPEN_MOVE_DIALOG',
  CLOSE_MOVE_DIALOG: 'CLOSE_MOVE_DIALOG',
  TOGGLE_CREATE_FOLDER_SHOWN: 'TOGGLE_CREATE_FOLDER_SHOWN',
  TOGGLE_RENAME_FILE_DIALOG: 'TOGGLE_RENAME_FILE_DIALOG',
};

export const toggleCreateFolderShown = () => ({
  type: types.TOGGLE_CREATE_FOLDER_SHOWN,
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

export const openMoveDialog = (fileId) => ({
  type: types.OPEN_MOVE_DIALOG,
  payload: { fileId },
});

export const closeMoveDialog = () => ({
  type: types.CLOSE_MOVE_DIALOG,
  payload: null,
});
