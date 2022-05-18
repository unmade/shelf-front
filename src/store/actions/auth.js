import { createAction } from '@reduxjs/toolkit';

export const issueToken = createAction('auth/issue_token', (username, password) => ({
  payload: { username, password },
}));
export const issueTokenPending = createAction('auth/issue_token/pending');
export const issueTokenFulfilled = createAction('auth/issue_token/fulfilled');
export const issueTokenRejected = createAction('auth/issue_token/rejected');

export const refreshToken = createAction('auth/refresh_token');
export const refreshTokenPending = createAction('auth/refresh_token/pending');
export const refreshTokenFulfilled = createAction('auth/refresh_token/fulfilled');
export const refreshTokenRejected = createAction('auth/refresh_token/rejected');

export const signedOut = createAction('auth/signed_out');
