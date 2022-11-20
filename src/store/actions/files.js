import { createAction } from '@reduxjs/toolkit';

export const deleteImmediately = createAction('files/deleteImmediately', (path) => ({
  payload: { path },
}));

export const deleteImmediatelyBatch = createAction('files/deleteImmediatelyBatch', (paths) => ({
  payload: { paths },
}));

export const download = createAction('files/download', (path) => ({
  payload: { path },
}));

export const downloadCached = createAction('files/download/cached', (path, content) => ({
  payload: { path, content },
}));

export const downloadExpired = createAction('files/download/expired', (path) => ({
  payload: { path },
}));

export const emptyTrash = createAction('files/emptyTrash');

export const folderUpdated = createAction('files/folderUpdated', (path, ids) => ({
  payload: { path, ids },
}));

export const moveFile = createAction('files/moveFile', (fromPath, toPath) => ({
  payload: { fromPath, toPath },
}));

export const moveFileBatch = createAction('files/moveFileBatch', (relocations) => ({
  payload: { relocations },
}));

export const moveToTrash = createAction('files/moveToTrash', (path) => ({
  payload: { path },
}));

export const moveToTrashBatch = createAction('files/moveToTrashBatch', (paths) => ({
  payload: { paths },
}));

export const performDownload = createAction('files/performDownload', (path) => ({
  payload: { path },
}));
