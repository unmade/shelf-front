export const types = {
  CLOSE_DIALOG: 'CLOSE_DIALOG',
  OPEN_DIALOG: 'OPEN_DIALOG',
  SET_CURRENT_PATH: 'SET_CURRENT_PATH',
  SET_SCROLL_OFFSET: 'SET_SCROLL_OFFSET',
  SET_UPLOAD_FILTER: 'SET_UPLOAD_FILTER',

  SELECT_FILE_ADD: 'SELECT_FILE_ADD',
  SELECT_FILE_BULK: 'SELECT_FILE_BULK',
  SELECT_FILE: 'SELECT_FILE',
  DESELECT_FILES: 'DESELECT_FILES',
  DESELECT_FILES_BULK: 'DESELECT_FILES_BULK',
};

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

export const closeDialog = (key) => ({
  type: types.CLOSE_DIALOG,
  payload: { key },
});

export const openDialog = (key, props) => ({
  type: types.OPEN_DIALOG,
  payload: { key, props },
});

export const setCurrentPath = (path) => ({
  type: types.SET_CURRENT_PATH,
  payload: { path },
});

export const setScrollOffset = (key, offset) => ({
  type: types.SET_SCROLL_OFFSET,
  payload: { key, offset },
});

export const setUploadFilter = (visibilityFilter) => ({
  type: types.SET_UPLOAD_FILTER,
  payload: { visibilityFilter },
});
