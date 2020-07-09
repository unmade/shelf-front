import { types } from '../actions/accounts';

const INITIAL_STATE = {
  me: null,
  loading: false,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.ACCOUNT_ME_REQUEST: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case types.ACCOUNT_ME_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        me: action.payload,
      };
    }
    case types.ACCOUNT_ME_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        me: null,
      };
    }
    default:
      return state;
  }
};

export const getAccount = (state) => state.accounts;
export const getMe = (state) => getAccount(state).me;
export const getUsername = (state) => getMe(state) && getMe(state).username;
