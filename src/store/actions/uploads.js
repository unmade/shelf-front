import { createAction } from '@reduxjs/toolkit';

import { fulfilled, rejected } from '.';

export const fileEntriesAdded = createAction('uploads/fileEntriesAdded', (files, uploadTo) => ({
  payload: { files, uploadTo },
}));

export const uploadsAdded = createAction('uploads/uploadsAdded', (uploads) => ({
  payload: { uploads },
}));

export const uploadsCleared = createAction('uploads/uploadsCleared');

export const uploadProgressed = createAction('uploads/uploadProgressed', (upload, progress) => ({
  payload: { upload, progress },
}));

const upload = createAction('uploads/upload');

export const uploadFulfilled = createAction(fulfilled(upload), (fileUpload, payload) => ({
  payload,
  error: null,
  meta: {
    upload: fileUpload,
  },
}));

export const uploadRejected = createAction(rejected(upload), (fileUpload, requestId, error) => ({
  payload: null,
  error,
  meta: {
    requestId,
    upload: fileUpload,
  },
}));
