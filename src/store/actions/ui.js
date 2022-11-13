import { createAction } from '@reduxjs/toolkit';

export const appearanceChanged = createAction('ui/appearance/changed', (appearance) => ({
  payload: { appearance },
}));

export const fileBrowserPathChanged = createAction('ui/fileBrowser/pathChanged', (path) => ({
  payload: { path },
}));

export const fileBrowserScrollOffsetChanged = createAction(
  'ui/fileBrowser/scrollOffsetChanged',
  (key, offset) => ({
    payload: { key, offset },
  })
);

export const fileDialogOpened = createAction('ui/fileDialog/opened', (key, props) => ({
  payload: { key, props },
}));

export const fileDialogClosed = createAction('ui/fileDialog/closed', (key) => ({
  payload: { key },
}));

export const filesSelectionChanged = createAction('ui/filesSelectionChanged', (ids) => ({
  payload: { ids },
}));

export const fileSelectionToggled = createAction('ui/fileSelectionToggled', (id) => ({
  payload: { id },
}));

export const signInResetted = createAction('ui/signIn/resetted');
export const signUpResetted = createAction('ui/signUp/resetted');
