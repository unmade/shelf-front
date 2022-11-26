import { combineReducers, createReducer, createSelector } from '@reduxjs/toolkit';

import * as actions from '../actions/ui';

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

export default combineReducers({
  fileDialog,
});

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
