import { 
  RETRIEVE_ACC_ME_REQUEST,
  RETRIEVE_ACC_ME_SUCCESS,
  RETRIEVE_ACC_ME_FAILURE,
} from './actions';

const INITIAL_STATE = {
  account: null,
  loading: false,
  error: null,
};


function AccountsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RETRIEVE_ACC_ME_REQUEST: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case RETRIEVE_ACC_ME_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        account: action.payload,
      };
    }
    case RETRIEVE_ACC_ME_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        account: null,
      };
    }
    default:
      return state;
  }
}

export default AccountsReducer;
