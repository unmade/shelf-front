import {
  SIGN_IN_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
} from './actions';

export const INITIAL_STATE = {
  tokens: {
    access: null,
  },
  loading: false,
  error: null,
};


function errorFromCode({ code }) {
  switch (code) {
    case "USER_NOT_FOUND": {
      return {
        message: "Incorrect username or password."
      };
    }
    default:
      return {
        message: "Unknown error."
      };
  }
}


const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case SIGN_IN_SUCCESS: {
      return {
        ...state,
        tokens: action.payload,
        loading: false,
      };
    }
    case SIGN_IN_FAILURE: {
      return {
        tokens: {
          access: null,
        },
        loading: false,
        error: errorFromCode(action.payload),
      };
    }
    default:
      return state;
  }
};


export default AuthReducer;
