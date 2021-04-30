import { combineReducers } from 'redux';

import { types } from '../actions/accounts';

function currentAccount(state = null, action) {
  switch (action.type) {
    case types.RETRIEVE_CURRENT_ACCOUNT_SUCCESS: {
      return action.payload.account;
    }
    case types.RETRIEVE_CURRENT_ACCOUNT_FAILURE: {
      return null;
    }
    default:
      return state;
  }
}

export default combineReducers({
  currentAccount,
});

export const getCurrentAccount = (state) => state.accounts.currentAccount;
