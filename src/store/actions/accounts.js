export const types = {
  ACCOUNT_ME: 'ACCOUNT_ME',
  ACCOUNT_ME_REQUEST: 'ACCOUNT_ME_REQUEST',
  ACCOUNT_ME_SUCCESS: 'ACCOUNT_ME_SUCCESS',
  ACCOUNT_ME_FAILURE: 'ACCOUNT_ME_FAILURE',
};

export const accountMeRequest = () => ({
  type: types.ACCOUNT_ME_REQUEST,
  payload: null,
});

export const accountMeSuccess = (payload) => ({
  type: types.ACCOUNT_ME_SUCCESS,
  payload,
});

export const accountMeFailure = (errCode) => ({
  type: types.ACCOUNT_ME_FAILURE,
  payload: errCode,
});

export const accountMe = () => ({
  type: types.ACCOUNT_ME,
  payload: null,
});
