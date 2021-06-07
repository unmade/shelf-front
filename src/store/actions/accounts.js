export const types = {
  LIST_ACCOUNTS: 'LIST_ACCOUNTS',
  LIST_ACCOUNTS_SUCCESS: 'LIST_ACCOUNTS_SUCCESS',

  RETRIEVE_CURRENT_ACCOUNT: 'RETRIEVE_CURRENT_ACCOUNT',
  RETRIEVE_CURRENT_ACCOUNT_SUCCESS: 'RETRIEVE_CURRENT_ACCOUNT_SUCCESS',
  RETRIEVE_CURRENT_ACCOUNT_FAILURE: 'RETRIEVE_CURRENT_ACCOUNT_FAILURE',
};

export const listAccounts = (page, perPage = 25) => ({
  type: types.LIST_ACCOUNTS,
  payload: { page, perPage },
});

export const listAccountsSuccess = (data) => ({
  type: types.LIST_ACCOUNTS_SUCCESS,
  payload: { ...data },
});

export const retrieveCurrentAccount = () => ({
  type: types.RETRIEVE_CURRENT_ACCOUNT,
  payload: null,
});

export const retrieveCurrentAccountSuccess = (account) => ({
  type: types.RETRIEVE_CURRENT_ACCOUNT_SUCCESS,
  payload: { account },
});

export const retrieveCurrentAccountFailure = (err) => ({
  type: types.RETRIEVE_CURRENT_ACCOUNT_FAILURE,
  payload: { err },
});
