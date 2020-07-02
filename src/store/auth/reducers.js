import {
  REFRESH_TOKEN_FAILURE,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
} from './actions';

export const INITIAL_STATE = {
  accessToken: null,
  expireAt: null,
  loading: false,
  errorMessage: null,
};


function errorFromCode({ errCode }) {
  switch (errCode) {
    case "USER_NOT_FOUND": {
      return "Incorrect username or password.";
    }
    default:
      return "Unknown error.";
  }
}


function expireAt() {
  return Date.now() + 12 * 60 * 1000; // 12 minutes from now
}


const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REFRESH_TOKEN_REQUEST:
    case SIGN_IN_REQUEST: {
      return {
        ...state,
        loading: true,
        errorMessage: null,
      };
    }
    case REFRESH_TOKEN_SUCCESS:
    case SIGN_IN_SUCCESS: {
      return {
        ...state,
        accessToken: action.payload.access,
        expireAt: expireAt(),
        loading: false,
      };
    }
    case REFRESH_TOKEN_FAILURE:
    case SIGN_IN_FAILURE: {
      return {
        ...state,
        accessToken: null,
        expireAt: null,
        loading: false,
        errorMessage: errorFromCode(action.payload),
      };
    }
    default:
      return state;
  }
};


export default AuthReducer;
