import { createSlice } from '@reduxjs/toolkit';

import apiSlice from './apiSlice';

const tokenTTL = 15 * 60 * 1000; // 15 min
const refreshRate = 12 * 60 * 1000; // 12 min

const slice = createSlice({
  name: 'auth',
  initialState: { accessToken: null, expiresAt: null },
  reducers: {
    tokenRefreshed: (_, action) => {
      const { accessToken, expiresAt } = action.payload;
      return { accessToken, expiresAt };
    },
    signedOut: () => slice.initialState,
  },
});

export const { tokenRefreshed, signedOut } = slice.actions;
export default slice.reducer;

export const selectAccessToken = (state) => state.auth.accessToken;
const selectExpiresAt = (state) => state.auth.expiresAt;
const selectIsExpired = (state) => {
  const expireAt = selectExpiresAt(state);
  if (expireAt == null) {
    return true;
  }
  return expireAt < Date.now();
};
export const selectIsAuthenticated = (state) =>
  selectAccessToken(state) != null && !selectIsExpired(state);

const KEY = 'state.auth';

export const saveAuthState = (state) => {
  const accessToken = selectAccessToken(state);
  const expiresAt = selectExpiresAt(state);
  const tokensState = JSON.stringify({ accessToken, expiresAt });
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

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: () => ({
        url: 'auth/refresh_token',
        method: 'POST',
      }),
      providesTags: [{ type: 'Auth', id: 'refreshToken' }],
      transformResponse: (responseData) => ({
        accessToken: responseData.access_token,
        expiresAt: Date.now() + tokenTTL,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(tokenRefreshed(data));
          setTimeout(() => {
            dispatch(authApi.util.invalidateTags([{ type: 'Auth', id: 'refreshToken' }]));
          }, refreshRate);
        } catch (err) {
          //
        }
      },
    }),
    signIn: builder.mutation({
      query: ({ username, password }) => ({
        url: '/auth/sign_in',
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: new URLSearchParams({
          username,
          password,
        }),
      }),
      transformResponse: (responseData) => ({
        accessToken: responseData.access_token,
        expiresAt: Date.now() + tokenTTL,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(tokenRefreshed(data));
        } catch (err) {
          // console.error(err);
        }
      },
    }),
    signUp: builder.mutation({
      query: ({ username, password, confirmPassword }) => ({
        url: '/auth/sign_up',
        method: 'POST',
        body: { username, password, confirm_password: confirmPassword },
      }),
      transformResponse: (responseData) => ({
        accessToken: responseData.access_token,
        expiresAt: Date.now() + tokenTTL,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(tokenRefreshed(data));
        } catch (err) {
          // console.error(err);
        }
      },
    }),
  }),
});

export const { useRefreshTokenQuery, useSignInMutation, useSignUpMutation } = authApi;
