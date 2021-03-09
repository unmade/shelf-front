export const types = {
  REFRESH_TOKEN: 'REFRESH_TOKEN',
  REFRESH_TOKEN_REQUEST: 'REFRESH_TOKEN_REQUEST',
  REFRESH_TOKEN_SUCCESS: 'REFRESH_TOKEN_SUCCESS',
  REFRESH_TOKEN_FAILURE: 'REFRESH_TOKEN_FAILURE',

  RETRIEVE_ME: 'RETRIEVE_ME',
  RETRIEVE_ME_SUCCESS: 'RETRIEVE_ME_SUCCESS',
  RETRIEVE_ME_FAILURE: 'RETRIEVE_ME_FAILURE',

  SIGN_IN: 'SIGN_IN',
  SIGN_IN_REQUEST: 'SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE: 'SIGN_IN_FAILURE',
};

export const refreshToken = () => ({
  type: types.REFRESH_TOKEN,
  payload: null,
});

export const refreshTokenRequest = () => ({
  type: types.REFRESH_TOKEN_REQUEST,
  payload: null,
});

export const refreshTokenSuccess = ({ access_token: access }) => ({
  type: types.REFRESH_TOKEN_SUCCESS,
  payload: { access },
});

export const refreshTokenFailure = ({ errCode }) => ({
  type: types.REFRESH_TOKEN_FAILURE,
  payload: { errCode },
});

export const retrieveMe = () => ({
  type: types.RETRIEVE_ME,
  payload: null,
});

export const retrieveMeSuccess = (me) => ({
  type: types.RETRIEVE_ME_SUCCESS,
  payload: { me },
});

export const retrieveMeFailure = (err) => ({
  type: types.RETRIEVE_ME_FAILURE,
  payload: { err },
});

export const signIn = ({ username, password }) => ({
  type: types.SIGN_IN,
  payload: { username, password },
});

export const signInRequest = () => ({
  type: types.SIGN_IN_REQUEST,
  payload: null,
});

export const signInSuccess = ({ access_token: access }) => ({
  type: types.SIGN_IN_SUCCESS,
  payload: { access },
});

export const signInFailure = ({ errCode }) => ({
  type: types.SIGN_IN_FAILURE,
  payload: { errCode },
});
