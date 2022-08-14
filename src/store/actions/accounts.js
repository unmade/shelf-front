import { createAction } from '@reduxjs/toolkit';

export const getSpaceUsage = createAction('accounts/getSpaceUsage');

export const listAccounts = createAction('accounts/listAccounts', (page, perPage = 25) => ({
  payload: { page, perPage },
}));

export const retrieveCurrentAccount = createAction('accounts/retrieveCurrentAccount');
