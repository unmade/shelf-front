import { createAction } from '@reduxjs/toolkit';

export const signIn = createAction('auth/signIn', (username, password) => ({
  payload: { username, password },
}));

export const refreshToken = createAction('auth/refreshToken');

export const signUp = createAction('auth/signUp', (username, password, email = null) => ({
  payload: { username, password, email },
}));

export const signedOut = createAction('auth/signedOut');
