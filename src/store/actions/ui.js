export const types = {
  CLOSE_DIALOG: 'CLOSE_DIALOG',
  OPEN_DIALOG: 'OPEN_DIALOG',
  SET_SCROLL_OFFSET: 'SET_SCROLL_OFFSET',
  SET_UPLOAD_FILTER: 'SET_UPLOAD_FILTER',
  TOGGLE_CREATE_FOLDER_DIALOG_VISIBLE: 'TOGGLE_CREATE_FOLDER_DIALOG_VISIBLE',
  TOGGLE_EMPTY_TRASH_DIALOG: 'TOGGLE_EMPTY_TRASH_DIALOG',
};

export const closeDialog = (key) => ({
  type: types.CLOSE_DIALOG,
  payload: { key },
});

export const openDialog = (key, props) => ({
  type: types.OPEN_DIALOG,
  payload: { key, props },
});

export const setScrollOffset = (key, offset) => ({
  type: types.SET_SCROLL_OFFSET,
  payload: { key, offset },
});

export const setUploadFilter = (visibilityFilter) => ({
  type: types.SET_UPLOAD_FILTER,
  payload: { visibilityFilter },
});

export const toggleCreateFolderDialogVisible = () => ({
  type: types.TOGGLE_CREATE_FOLDER_DIALOG_VISIBLE,
  payload: null,
});

export const toggleEmptyTrashDialog = () => ({
  type: types.TOGGLE_EMPTY_TRASH_DIALOG,
  payload: null,
});
