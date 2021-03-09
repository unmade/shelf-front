import { combineReducers } from 'redux';
import { types } from '../actions/auth';

function errorFromCode({ errCode }) {
  switch (errCode) {
    case 'USER_NOT_FOUND': {
      return 'Incorrect username or password.';
    }
    default:
      return 'Unknown error.';
  }
}

function me(state = null, action) {
  switch (action.type) {
    case types.RETRIEVE_ME_SUCCESS: {
      return action.payload.me;
    }
    case types.RETRIEVE_ME_FAILURE: {
      return null;
    }
    default:
      return state;
  }
}

const INITIAL_STATE = {
  accessToken: null,
  errorMessage: null,
  expireAt: null,
  loading: false,
};

function tokens(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.REFRESH_TOKEN_REQUEST:
    case types.SIGN_IN_REQUEST: {
      return {
        ...state,
        errorMessage: null,
        loading: true,
      };
    }
    case types.REFRESH_TOKEN_SUCCESS:
    case types.SIGN_IN_SUCCESS: {
      return {
        ...state,
        accessToken: action.payload.access,
        expireAt: Date.now() + 12 * 60 * 1000, // 12 minutes from now
        loading: false,
      };
    }
    case types.REFRESH_TOKEN_FAILURE:
    case types.SIGN_IN_FAILURE: {
      return {
        ...state,
        accessToken: null,
        errorMessage: errorFromCode(action.payload),
        expireAt: null,
        loading: false,
      };
    }
    default:
      return state;
  }
}

export default combineReducers({
  me,
  tokens,
});

export const getMe = (state) => state.auth.me;

export const getAuth = (state) => state.auth;
export const getAccessToken = (state) => getAuth(state).tokens.accessToken;
export const getExpireAt = (state) => getAuth(state).tokens.expireAt;
export const getIsExpired = (state) => getExpireAt(state) && getExpireAt(state) < Date.now();
export const getIsLoading = (state) => getAuth(state).tokens.loading;
export const getErrorMessage = (state) => getAuth(state).tokens.errorMessage;
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
      me: null,
    },
  };
};
