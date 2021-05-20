import { combineReducers } from 'redux';

import { types } from '../actions/auth';

const INITIAL_STATE = {
  accessToken: null,
  expireAt: null,
};

function tokens(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.REFRESH_TOKEN_SUCCESS:
    case types.SIGN_IN_SUCCESS: {
      return {
        ...state,
        accessToken: action.payload.access,
        expireAt: Date.now() + 12 * 60 * 1000, // 12 minutes from now
      };
    }
    case types.REFRESH_TOKEN_FAILURE:
    case types.SIGN_IN_FAILURE:
    case types.SIGN_OUT: {
      return {
        ...state,
        accessToken: null,
        expireAt: null,
      };
    }
    default:
      return state;
  }
}

export default combineReducers({
  tokens,
});

export const getAuth = (state) => state.auth;
export const getAccessToken = (state) => getAuth(state).tokens.accessToken;
export const getExpireAt = (state) => getAuth(state).tokens.expireAt;
export const getIsExpired = (state) => getExpireAt(state) && getExpireAt(state) < Date.now();
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
