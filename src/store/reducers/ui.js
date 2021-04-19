import { combineReducers } from 'redux';

import { types } from '../actions/ui';
import { types as fileTypes } from '../actions/files';

function fileBrowser(
  state = {
    createFolderDialogVisible: false,
    emptyTrashDialogVisible: false,
  },
  action,
) {
  switch (action.type) {
    case types.TOGGLE_CREATE_FOLDER_DIALOG_VISIBLE: {
      return {
        ...state,
        createFolderDialogVisible: !state.createFolderDialogVisible,
      };
    }
    case fileTypes.CREATE_FOLDER_SUCCESS: {
      return {
        ...state,
        createFolderDialogVisible: false,
      };
    }
    case types.TOGGLE_EMPTY_TRASH_DIALOG: {
      return {
        ...state,
        emptyTrashDialogVisible: !state.emptyTrashDialogVisible,
      };
    }
    case fileTypes.EMPTY_TRASH_SUCCESS: {
      return {
        ...state,
        emptyTrashDialogVisible: false,
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
          ...state[key],
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

export const getFileDialogVisible = (state, props) => {
  const { uid: key } = props;
  const dialog = state.ui.fileDialog[key];
  if (dialog !== null && dialog !== undefined) {
    return dialog.visible;
  }
  return false;
};

export const getFileDialogProps = (state, props) => {
  const { uid: key } = props;
  const dialog = state.ui.fileDialog[key];
  if (dialog !== null && dialog !== undefined) {
    return dialog.props;
  }
  return false;
};

export const getCreateFolderDialogVisible = (state) => (
  state.ui.fileBrowser.createFolderDialogVisible
);

export const getEmptyTrashDialogVisible = (state) => state.ui.fileBrowser.emptyTrashDialogVisible;

export const getScrollOffset = (state, key) => state.ui.scrollOffset[key] || 0;

export const getUploadFilter = (state) => state.ui.uploader.visibilityFilter;
