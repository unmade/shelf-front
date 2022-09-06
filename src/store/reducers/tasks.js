import { combineReducers, createReducer } from '@reduxjs/toolkit';

import * as actions from '../actions/tasks';

const BY_ID_INITIAL_STATE = {};

const byId = createReducer(BY_ID_INITIAL_STATE, (builder) => {
  builder.addCase(actions.taskStarted, (state, action) => {
    const { scope, taskId, payload } = action.payload;
    state[taskId] = {
      id: taskId,
      scope,
      payload,
      result: null,
    };
  });
  builder.addCase(actions.taskCompleted, (state, action) => {
    const { taskId, result } = action.payload;
    state[taskId].result = result;
  });
});

export default combineReducers({
  byId,
});

function countItemsByScopes(tasks, scopes) {
  let counter = 0;
  tasks.forEach((task) => {
    if (task.result == null && scopes.includes(task.scope)) {
      counter += task.payload.items.length;
    }
  });
  return counter;
}

export const getDeletingFilesCounter = (state) => {
  const scopes = [actions.scopes.deletingImmediatelyBatch, actions.scopes.movingToTrash];
  return countItemsByScopes(Object.values(state.tasks.byId), scopes);
};

export const getMovingFilesCounter = (state) => {
  const scopes = [actions.scopes.movingBatch];
  return countItemsByScopes(Object.values(state.tasks.byId), scopes);
};

export const getIsEmptyingTrash = (state) =>
  Object.values(state.tasks.byId).some(
    (task) => task.result == null && task.scope === actions.scopes.emptyingTrash
  );
