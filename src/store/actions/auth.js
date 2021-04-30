export const types = {
  REFRESH_TOKEN: 'REFRESH_TOKEN',
  REFRESH_TOKEN_REQUEST: 'REFRESH_TOKEN_REQUEST',
  REFRESH_TOKEN_SUCCESS: 'REFRESH_TOKEN_SUCCESS',
  REFRESH_TOKEN_FAILURE: 'REFRESH_TOKEN_FAILURE',

  SIGN_IN: 'SIGN_IN',
  SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE: 'SIGN_IN_FAILURE',

  SIGN_OUT: 'SIGN_OUT',
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

export const refreshTokenFailure = (err) => ({
  type: types.REFRESH_TOKEN_FAILURE,
  payload: { err },
});

export const signIn = (username, password) => ({
  type: types.SIGN_IN,
  payload: { username, password },
});

export const signInSuccess = ({ access_token: access }) => ({
  type: types.SIGN_IN_SUCCESS,
  payload: { access },
});

export const signInFailure = (err) => ({
  type: types.SIGN_IN_FAILURE,
  payload: { err },
});

export const signOut = () => ({
  type: types.SIGN_OUT,
  payload: null,
});
