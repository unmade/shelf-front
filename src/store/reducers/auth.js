import { combineReducers, createReducer } from '@reduxjs/toolkit';

import { fulfilled, rejected } from '../actions';
import * as actions from '../actions/auth';

const INITIAL_STATE = {
  accessToken: null,
  expireAt: null,
};

function isAuthFulfilled(action) {
  return (
    action.type === fulfilled(actions.refreshToken.type) ||
    action.type === fulfilled(actions.issueToken.type)
  );
}

function isAuthRejected(action) {
  return (
    action.type === rejected(actions.refreshToken.type) ||
    action.type === rejected(actions.issueToken.type)
  );
}

const tokens = createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(actions.signedOut, () => INITIAL_STATE);
  builder.addMatcher(isAuthFulfilled, (state, action) => {
    state.accessToken = action.payload.access_token;
    state.expireAt = Date.now() + 12 * 60 * 1000; // 12 minutes from now
  });
  builder.addMatcher(isAuthRejected, () => INITIAL_STATE);
});

export default combineReducers({
  tokens,
});

export const getAuth = (state) => state.auth;
export const getAccessToken = (state) => getAuth(state).tokens.accessToken;
export const getExpireAt = (state) => getAuth(state).tokens.expireAt;
export const getIsExpired = (state) => {
  const expireAt = getExpireAt(state);
  if (expireAt == null) {
    return true;
  }
  return expireAt < Date.now();
};
export const getIsAuthenticated = (state) => getAccessToken(state) && !getIsExpired(state);

const KEY = 'state.auth.tokens';

export const saveAuthState = (state) => {
  const accessToken = getAccessToken(state);
  const expireAt = getExpireAt(state);
  const tokensState = JSON.stringify({ accessToken, expireAt });
  if (tokensState !== localStorage.getItem(KEY)) {
    localStorage.setItem(KEY, tokensState);
  }
};

export const loadAuthState = () => {
  const tokensState = JSON.parse(localStorage.getItem(KEY)) || {};
  return {
    auth: {
      tokens: {
        ...INITIAL_STATE,
        ...tokensState,
      },
    },
  };
};
