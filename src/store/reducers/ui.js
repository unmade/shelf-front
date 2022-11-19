import { combineReducers, createReducer, createSelector } from '@reduxjs/toolkit';

import * as actions from '../actions/ui';
import * as uploadActions from '../actions/uploads';

const appearance = createReducer('auto', (builder) => {
  builder.addCase(actions.appearanceChanged, (_, action) => {
    const { appearance: value } = action.payload;
    return value;
  });
});

const CURRENT_PATH_INITIAL_STATE = '.';

const fileBrowserCurrentPath = createReducer(CURRENT_PATH_INITIAL_STATE, (builder) => {
  builder.addCase(actions.fileBrowserPathChanged, (_, action) => {
    const { path } = action.payload;
    return path;
  });
});

const SELECTION_INITIAL_STATE = [];

const fileBrowserSelection = createReducer(SELECTION_INITIAL_STATE, (builder) => {
  builder.addCase(actions.filesSelectionChanged, (_, action) => {
    const { ids } = action.payload;
    return [...ids];
  });
  builder.addCase(actions.fileSelectionToggled, (state, action) => {
    const { id } = action.payload;
    const idx = state.indexOf(id);
    if (idx === -1) {
      return [...state, id];
    }
    return [...state.slice(0, idx), ...state.slice(idx + 1)];
  });
});

const SCROLL_OFFSET_INITIAL_STATE = {};

const fileBrowserScrollOffset = createReducer(SCROLL_OFFSET_INITIAL_STATE, (builder) => {
  builder.addCase(actions.fileBrowserScrollOffsetChanged, (state, action) => {
    const { key, offset } = action.payload;
    state[key] = offset;
  });
});

const FILE_DIALOG_INITIAL_STATE = {};

const fileDialog = createReducer(FILE_DIALOG_INITIAL_STATE, (builder) => {
  builder.addCase(actions.fileDialogOpened, (state, action) => {
    const { key, props } = action.payload;
    state[key] = {
      props,
      visible: true,
    };
  });
  builder.addCase(actions.fileDialogClosed, (state, action) => {
    const { key } = action.payload;
    delete state[key];
  });
});

const UPLOADER_INITIAL_STATE = { uploadsCount: 0, totalProgress: 0, finished: 0 };

const uploader = createReducer(UPLOADER_INITIAL_STATE, (builder) => {
  builder.addCase(uploadActions.uploadsAdded, (state, action) => {
    const { uploads } = action.payload;
    state.uploadsCount = uploads.length;
    state.totalProgress = 0;
    state.finished = 0;
  });
  builder.addCase(uploadActions.uploadProgressed, (state, action) => {
    const { progress } = action.payload;
    const offset = state.finished * Math.floor((1 / state.uploadsCount) * 100);
    const relativeProgress = Math.ceil((1 / state.uploadsCount) * (progress / 100) * 100);
    state.totalProgress = offset + relativeProgress;
    if (progress === 100) {
      state.finished += 1;
    }
  });
});

export default combineReducers({
  appearance,
  fileBrowser: combineReducers({
    currentPath: fileBrowserCurrentPath,
    selection: fileBrowserSelection,
    scrollOffset: fileBrowserScrollOffset,
  }),
  fileDialog,
  uploader,
});

export const getAppearance = (state) => state.ui.appearance ?? 'auto';

export const getCurrentPath = (state) => state.ui.fileBrowser.currentPath;

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

export const getSelectedFileIds = createSelector(
  [(state) => state.ui.fileBrowser.selection],
  (items) => new Set(items)
);
export const getIsFileSelected = (state, id) => getSelectedFileIds(state).has(id);
export const getHasSelectedFiles = (state) => getSelectedFileIds(state).size !== 0;
export const getCountSelectedFiles = (state) => getSelectedFileIds(state).size;

export const getScrollOffset = (state, key) => state.ui.fileBrowser.scrollOffset[key] ?? 0;

export const getUploadFilter = (state) => state.ui.uploader.visibilityFilter;

export const getUploaderTotalProgress = (state) => state.ui.uploader.totalProgress;

const APPEARANCE_KEY = 'state.ui.appearance';

export const saveAppearanceState = (state) => {
  localStorage.setItem(APPEARANCE_KEY, getAppearance(state));
};

export const loadAppearanceState = () => ({
  ui: {
    appearance: localStorage.getItem(APPEARANCE_KEY) ?? 'auto',
  },
});
