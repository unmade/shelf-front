import { 
  RETRIEVE_USER_REQUEST,
  RETRIEVE_USER_SUCCESS,
  RETRIEVE_USER_FAILURE,
} from './actions';

const INITIAL_STATE = {
  user: null,
  loading: false,
  error: null,
};


function UserReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RETRIEVE_USER_REQUEST: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case RETRIEVE_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
      };
    }
    case RETRIEVE_USER_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        user: null,
      };
    }
    default:
      return state;
  }
}

export default UserReducer;
