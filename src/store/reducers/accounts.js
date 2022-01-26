import { combineReducers } from 'redux';

import { types } from '../actions/accounts';

function normalize(items) {
  const data = {};
  items.forEach((item) => {
    data[item.id] = item;
  });
  return data;
}

function accountsById(state = {}, action) {
  switch (action.type) {
    case types.LIST_ACCOUNTS_SUCCESS: {
      const { results } = action.payload;
      return {
        ...state,
        ...normalize(results),
      };
    }
    case types.RETRIEVE_CURRENT_ACCOUNT_SUCCESS: {
      const { account } = action.payload;
      return {
        ...state,
        [account.id]: account,
      };
    }
    default:
      return state;
  }
}

function accountIdsByPage(state = {}, action) {
  switch (action.type) {
    case types.LIST_ACCOUNTS_SUCCESS: {
      const { results, page } = action.payload;
      return {
        ...state,
        [page]: results.map((account) => account.id),
      };
    }
    default:
      return state;
  }
}

function currentAccountId(state = null, action) {
  switch (action.type) {
    case types.RETRIEVE_CURRENT_ACCOUNT_SUCCESS: {
      const { account } = action.payload;
      return account.id;
    }
    case types.RETRIEVE_CURRENT_ACCOUNT_FAILURE: {
      return null;
    }
    default:
      return state;
  }
}

export default combineReducers({
  byId: accountsById,
  byPage: accountIdsByPage,
  currentAccountId,
});

export const getAccountById = (state, props) => state.accounts.byId[props.id];
export const getCurrentAccountId = (state) => state.accounts.currentAccountId;
export const getCurrentAccount = (state) =>
  getAccountById(state, { id: [getCurrentAccountId(state)] });
export const getIsCurrentAccountSuperuser = (state) => getCurrentAccount(state)?.superuser ?? false;
export const getAccountsIdsByPage = (state, props) => state.accounts.byPage[props.page];
export const isAdmin = (state) => getCurrentAccount(state)?.superuser ?? false;
