import { createAction } from '@reduxjs/toolkit';

export const issueToken = createAction('auth/issue_token', (username, password) => ({
  payload: { username, password },
}));

export const refreshToken = createAction('auth/refresh_token');

export const signedOut = createAction('auth/signed_out');
