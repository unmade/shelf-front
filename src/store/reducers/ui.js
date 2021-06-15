import { combineReducers } from 'redux';

import { types } from '../actions/ui';

function fileBrowser(state = {}, action) {
  switch (action.type) {
    case types.SET_CURRENT_PATH: {
      const { path } = action.payload;
      return {
        ...state,
        path,
      };
    }
    default:
      return state;
  }
}

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
          ...(state[key] ?? {}),
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
  fileBrowser,
  fileDialog,
  scrollOffset,
  uploader,
});

export const getCurrentPath = (state) => state.ui.fileBrowser.path ?? '.';
export const getCurrentFolderName = (state) => {
  const path = getCurrentPath(state);
  if (path === '.') {
    return 'Home';
  }
  return path.split('/').pop();
};

export const getFileDialogVisible = (state, props) => {
  const { uid: key } = props;
  const dialog = state.ui.fileDialog[key];
  return dialog?.visible ?? false;
};

const EMPTY_PROPS = {};

export const getFileDialogProps = (state, props) => {
  const { uid: key } = props;
  const dialog = state.ui.fileDialog[key];
  return dialog?.props ?? EMPTY_PROPS;
};

export const getScrollOffset = (state, key) => state.ui.scrollOffset[key] ?? 0;

export const getUploadFilter = (state) => state.ui.uploader.visibilityFilter;
