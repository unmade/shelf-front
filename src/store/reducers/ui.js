import { combineReducers } from 'redux';

import { types } from '../actions/ui';

function fileDialog(state = {}, action) {
  switch (action.type) {
    case types.OPEN_DIALOG: {
      const { key, props } = action.payload;
      return {
        ...state,
        [key]: {
          visible: true,
          props,
        },
      };
    }
    case types.CLOSE_DIALOG: {
      const { key } = action.payload;
      return {
        ...state,
        [key]: {
          ...(state[key] || {}),
          visible: false,
        },
      };
    }
    default:
      return state;
  }
}

function scrollOffset(state = {}, action) {
  switch (action.type) {
    case types.SET_SCROLL_OFFSET: {
      const { key, offset } = action.payload;
      return {
        ...state,
        [key]: offset,
      };
    }
    default:
      return state;
  }
}

function uploader(state = { visibilityFilter: 'all' }, action) {
  switch (action.type) {
    case types.SET_UPLOAD_FILTER: {
      const { visibilityFilter } = action.payload;
      return {
        ...state,
        visibilityFilter,
      };
    }
    default:
      return state;
  }
}

export default combineReducers({
  fileDialog,
  scrollOffset,
  uploader,
});

export const getFileDialogVisible = (state, props) => {
  const { uid: key } = props;
  const dialog = state.ui.fileDialog[key];
  if (dialog !== null && dialog !== undefined) {
    return dialog.visible;
  }
  return false;
};

const EMPTY_PROPS = {};

export const getFileDialogProps = (state, props) => {
  const { uid: key } = props;
  const dialog = state.ui.fileDialog[key];
  if (dialog !== null && dialog !== undefined) {
    return dialog.props || EMPTY_PROPS;
  }
  return EMPTY_PROPS;
};

export const getScrollOffset = (state, key) => state.ui.scrollOffset[key] || 0;

export const getUploadFilter = (state) => state.ui.uploader.visibilityFilter;
