import { combineReducers } from 'redux';

import { difference } from '../../set';

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

function selectedFileIds(state = new Set(), action) {
  switch (action.type) {
    case types.DESELECT_FILES: {
      return new Set();
    }
    case types.DESELECT_FILES_BULK: {
      const { ids } = action.payload;
      return difference(state, ids);
    }
    case types.SELECT_FILE: {
      const { id } = action.payload;
      return new Set([id]);
    }
    case types.SELECT_FILE_ADD: {
      const { id } = action.payload;
      const nextState = new Set(state);
      if (state.has(id)) {
        nextState.delete(id);
      } else {
        nextState.add(id);
      }
      return nextState;
    }
    case types.SELECT_FILE_BULK: {
      const { ids } = action.payload;
      return new Set(ids);
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
  selectedFileIds,
  scrollOffset,
  uploader,
});

export const getCurrentPath = (state) => state.ui.fileBrowser.path ?? '.';

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

export const getSelectedFileIds = (state) => state.ui.selectedFileIds;
export const getIsFileSelected = (state, id) => getSelectedFileIds(state).has(id);
export const getHasSelectedFiles = (state) => getSelectedFileIds(state).size !== 0;
export const getCountSelectedFiles = (state) => getSelectedFileIds(state).size;

export const getScrollOffset = (state, key) => state.ui.scrollOffset[key] ?? 0;

export const getUploadFilter = (state) => state.ui.uploader.visibilityFilter;
