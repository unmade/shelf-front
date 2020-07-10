import { types } from '../actions/files';

const INITIAL_STATE = {
  data: {
    items: [],
  },
  error: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LIST_FOLDER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.LIST_FOLDER_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export const getFolder = (state) => state.files;
