import { combineReducers, createReducer } from '@reduxjs/toolkit';

import { fulfilled, rejected } from '../actions';
import * as actions from '../actions/accounts';

const BY_ID_INITIAL_STATE = {};

const byId = createReducer(BY_ID_INITIAL_STATE, (builder) => {
  builder.addCase(fulfilled(actions.listAccounts), (state, action) => {
    const { results } = action.payload;
    results.forEach((account) => {
      state[account.id] = account;
    });
  });
  builder.addCase(fulfilled(actions.retrieveCurrentAccount), (state, action) => {
    const account = action.payload;
    state[account.id] = account;
  });
});

const CURRENT_ACCOUNT_INITIAL_STATE = null;

const currentAccountId = createReducer(null, (builder) => {
  builder.addCase(fulfilled(actions.retrieveCurrentAccount), (_, action) => {
    const account = action.payload;
    return account.id;
  });
  builder.addCase(rejected(actions.retrieveCurrentAccount), () => CURRENT_ACCOUNT_INITIAL_STATE);
});

const IDS_BY_PAGE_INITIAL_STATE = {};

const idsByPage = createReducer(IDS_BY_PAGE_INITIAL_STATE, (builder) => {
  builder.addCase(fulfilled(actions.listAccounts), (state, action) => {
    const { page, results } = action.payload;
    state[page] = results.map((account) => account.id);
  });
});

export default combineReducers({
  byId,
  currentAccountId,
  idsByPage,
});

export const getAccountById = (state, { id }) => state.accounts.byId[id];
export const getCurrentAccountId = (state) => state.accounts.currentAccountId;
export const getCurrentAccount = (state) =>
  getAccountById(state, { id: [getCurrentAccountId(state)] });
export const getIsCurrentAccountSuperuser = (state) => getCurrentAccount(state)?.superuser ?? false;
export const getAccountsIdsByPage = (state, { page }) => state.accounts.idsByPage[page];
export const isAdmin = (state) => getCurrentAccount(state)?.superuser ?? false;
