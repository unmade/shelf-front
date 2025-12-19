import { createSlice } from '@reduxjs/toolkit';

import { type RootState } from './store';
import { getItem } from '@/hooks/local-storage';

interface State {
  accessToken: string | null;
  refreshToken: string | null;
  refreshedAt: string | null;
}

const initialState: State = { accessToken: null, refreshToken: null, refreshedAt: null };

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    tokenRefreshed: (_, action) => {
      const { accessToken, refreshToken } = action.payload;
      return { accessToken, refreshToken, refreshedAt: new Date().toISOString() };
    },
    signedOut: () => initialState,
  },
});

export const { tokenRefreshed, signedOut } = slice.actions;
export default slice.reducer;

export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectAccessTokenRefreshedAt = (state: RootState) => state.auth.refreshedAt;
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;

const KEY = 'state.auth';

export const saveAuthState = (state: RootState) => {
  const refreshToken = selectRefreshToken(state);
  const tokensState = JSON.stringify({ refreshToken });
  if (tokensState !== localStorage.getItem(KEY)) {
    localStorage.setItem(KEY, tokensState);
  }
};

export const loadAuthState = () => {
  const state = getItem<string>(KEY) ?? {};
  return {
    auth: {
      ...initialState,
      ...state,
    },
  };
};
