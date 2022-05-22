import { combineReducers, createReducer } from '@reduxjs/toolkit';

import * as actions from '../actions/messages';

const DEFAULT_CLOSE_AFTER_IN_SECONDS = 10;

const BY_ID_INITIAL_STATE = {};

function isRejected(action) {
  return action.type.endsWith('rejected');
}

const byId = createReducer(BY_ID_INITIAL_STATE, (builder) => {
  builder.addCase(actions.messageClosed, (state, action) => {
    const { id } = action.payload;
    delete state[id];
  });
  builder.addMatcher(isRejected, (state, action) => {
    const {
      error: { title, description },
      meta: { requestId },
    } = action;
    state[requestId] = {
      title,
      description,
      closeAfter: DEFAULT_CLOSE_AFTER_IN_SECONDS,
    };
  });
});

const ALL_IDS_INITIAL_STATE = [];

const allIds = createReducer(ALL_IDS_INITIAL_STATE, (builder) => {
  builder.addCase(actions.messageClosed, (state, action) => {
    const { id } = action.payload;
    return state.filter((messageId) => messageId !== id);
  });
  builder.addMatcher(isRejected, (state, action) => {
    const {
      meta: { requestId },
    } = action;
    state.push(requestId);
  });
});

export default combineReducers({
  byId,
  allIds,
});

export const getMessageById = (state, props) => state.messages.byId[props.id];
export const getAllMessages = (state) => state.messages.allIds;
