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


const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN_REQUEST: {
      return {
        ...state,
        loading: true,
        errorMessage: null,
      };
    }
    case SIGN_IN_SUCCESS: {
      return {
        ...state,
        accessToken: action.payload.access,
        loading: false,
      };
    }
    case SIGN_IN_FAILURE: {
      return {
        accessToken: null,
        loading: false,
        errorMessage: errorFromCode(action.payload),
      };
    }
    case REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        loading: true,
        errorMessage: null,
      };
    }
    case REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        loading: false,
        accessToken: action.payload.access,
      };
    }
    case REFRESH_TOKEN_FAILURE: {
      return {
        ...state,
        loading: false,
        accessToken: null,
        errorMessage: errorFromCode(action.payload.access),
      };
    }
    default:
      return state;
  }
};


export default AuthReducer;
