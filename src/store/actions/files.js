import { createAction } from '@reduxjs/toolkit';

export const createFolder = createAction('files/createFolder', (path) => ({
  payload: { path },
}));

export const deleteImmediately = createAction('files/deleteImmediately', (path) => ({
  payload: { path },
}));

export const deleteImmediatelyBatch = createAction('files/deleteImmediatelyBatch', (paths) => ({
  payload: { paths },
}));

export const download = createAction('files/download', (path) => ({
  payload: { path },
}));

export const emptyTrash = createAction('files/emptyTrash');

export const fetchThumbnail = createAction('files/fetchThumbnail', (id, path, size) => ({
  payload: { id, path, size },
}));

export const findDuplicates = createAction('files/findDuplicates', (path, maxDistance) => ({
  payload: { path, maxDistance },
}));

export const folderUpdated = createAction('files/folderUpdated', (path, ids) => ({
  payload: { path, ids },
}));

export const getBatch = createAction('files/getBatch', (fileIds) => ({
  payload: { fileIds },
}));

export const getContentMetadata = createAction('files/getContentMetadata', (path) => ({
  payload: { path },
}));

export const listFolder = createAction('files/listFolder', (path) => ({
  payload: { path },
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
