export const types = {
  OPEN_RENAME_FILE_DIALOG: 'OPEN_RENAME_FILE_DIALOG',
  CLOSE_RENAME_FILE_DIALOG: 'CLOSE_RENAME_FILE_DIALOG',
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
