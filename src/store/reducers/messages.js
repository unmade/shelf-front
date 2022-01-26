import { combineReducers } from 'redux';

import { types } from '../actions/messages';

function byId(state = {}, action) {
  switch (action.type) {
    case types.CREATE_ERROR_MESSAGE: {
      const message = action.payload;
      return {
        ...state,
        [message.id]: message,
      };
    }
    case types.REMOVE_MESSAGE: {
      const { id } = action.payload;
      const { [id]: deletedMessageId, ...nextState } = state;
      return nextState;
    }
    default:
      return state;
  }
}

function all(state = [], action) {
  switch (action.type) {
    case types.CREATE_ERROR_MESSAGE: {
      const message = action.payload;
      return [...state, message.id];
    }
    case types.REMOVE_MESSAGE: {
      const { id } = action.payload;
      return state.filter((messageId) => messageId !== id);
    }
    default:
      return state;
  }
}

export default combineReducers({
  byId,
  all,
});

export const getMessageById = (state, props) => state.messages.byId[props.id];
export const getAllMessages = (state) => state.messages.all;
