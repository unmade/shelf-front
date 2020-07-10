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

const INITIAL_STATE = {
  accessToken: null,
  errorMessage: null,
  expireAt: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
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
};

export const getAuth = (state) => state.auth;
export const getAccessToken = (state) => getAuth(state).accessToken;
export const getExpireAt = (state) => getAuth(state).expireAt;
export const getIsExpired = (state) => getExpireAt(state) && getExpireAt(state) < Date.now();
export const getIsLoading = (state) => getAuth(state).loading;
export const getErrorMessage = (state) => getAuth(state).errorMessage;
export const getIsAuthenticated = (state) => getAccessToken(state) && !getIsExpired(state);

const KEY = 'state.auth';

export const saveAuthState = (state) => {
  const accessToken = getAccessToken(state);
  const expireAt = getExpireAt(state);
  const authState = JSON.stringify({ accessToken, expireAt });
  if (authState !== localStorage.getItem(KEY)) {
    localStorage.setItem(KEY, authState);
  }
};

export const loadAuthState = () => {
  const authState = JSON.parse(localStorage.getItem(KEY)) || {};
  return {
    auth: {
      ...INITIAL_STATE,
      ...authState,
    },
  };
};
