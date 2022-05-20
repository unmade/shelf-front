import { createAction } from '@reduxjs/toolkit';

export const addBookmark = createAction('users/addBookmark', (fileId) => ({
  payload: { fileId },
}));

export const listBookmarks = createAction('users/listBookmarks');

export const removeBookmark = createAction('users/removeBookmark', (fileId) => ({
  payload: { fileId },
}));
