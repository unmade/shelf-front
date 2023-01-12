import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'auth',
  initialState: { accessToken: null, refreshToken: null },
  reducers: {
    tokenRefreshed: (_, action) => {
      const { accessToken, refreshToken } = action.payload;
      return { accessToken, refreshToken };
    },
    signedOut: () => slice.initialState,
  },
});

export const { tokenRefreshed, signedOut } = slice.actions;
export default slice.reducer;

export const selectAccessToken = (state) => state.auth.accessToken;
export const selectRefreshToken = (state) => state.auth.refreshToken;

const KEY = 'state.auth';

export const saveAuthState = (state) => {
  const refreshToken = selectRefreshToken(state);
  const tokensState = JSON.stringify({ refreshToken });
  if (tokensState !== localStorage.getItem(KEY)) {
    localStorage.setItem(KEY, tokensState);
  }
};

export const loadAuthState = () => {
  const tokensState = JSON.parse(localStorage.getItem(KEY)) || {};
  return {
    auth: {
      ...slice.initialState,
      ...tokensState,
    },
  };
};
