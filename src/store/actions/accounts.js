export const types = {
  RETRIEVE_CURRENT_ACCOUNT: 'RETRIEVE_CURRENT_ACCOUNT',
  RETRIEVE_CURRENT_ACCOUNT_SUCCESS: 'RETRIEVE_CURRENT_ACCOUNT_SUCCESS',
  RETRIEVE_CURRENT_ACCOUNT_FAILURE: 'RETRIEVE_CURRENT_ACCOUNT_FAILURE',
};

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
