import { createAction } from '@reduxjs/toolkit';

export const fileDialogOpened = createAction('ui/fileDialog/opened', (key, props) => ({
  payload: { key, props },
}));

export const fileDialogClosed = createAction('ui/fileDialog/closed', (key) => ({
  payload: { key },
}));
