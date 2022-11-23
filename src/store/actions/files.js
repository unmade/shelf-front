import { createAction } from '@reduxjs/toolkit';

export const download = createAction('files/download', (path) => ({
  payload: { path },
}));

export const downloadCached = createAction('files/download/cached', (path, content) => ({
  payload: { path, content },
}));

export const downloadExpired = createAction('files/download/expired', (path) => ({
  payload: { path },
}));

export const performDownload = createAction('files/performDownload', (path) => ({
  payload: { path },
}));
