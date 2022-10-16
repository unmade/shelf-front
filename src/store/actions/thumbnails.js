import { createAction } from '@reduxjs/toolkit';

export const thumbnailCached = createAction('thumbnails/cached', (fileId, size, objectUrl) => ({
  payload: { fileId, size, objectUrl },
}));

export const thumbnailExpired = createAction('thumbnails/expired', (fileId, size) => ({
  payload: { fileId, size },
}));
