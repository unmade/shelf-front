import { types } from '../actions/loading';

function loading(state = {}, action) {
  switch (action.type) {
    case types.SET_LOADING: {
      const { scope, value } = action.payload;
      return {
        ...state,
        [scope]: value,
      };
    }
    default:
      return state;
  }
}

export default loading;

export const getLoading = (state, scope) => state.loading[scope] || false;
