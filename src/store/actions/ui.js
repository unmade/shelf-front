export const types = {
  CLOSE_DIALOG: 'CLOSE_DIALOG',
  OPEN_DIALOG: 'OPEN_DIALOG',
  SET_SCROLL_OFFSET: 'SET_SCROLL_OFFSET',
  SET_UPLOAD_FILTER: 'SET_UPLOAD_FILTER',
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
