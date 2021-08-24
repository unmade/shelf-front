import { combineReducers } from 'redux';

import { scopes, types } from '../actions/tasks';

const INITIAL_STATE = Object.fromEntries(Object.keys(scopes).map((key) => [key, []]));

function byId(state = {}, action) {
  switch (action.type) {
    case types.TASK_STARTED: {
      const { scope, taskId, payload } = action.payload;
      return {
        ...state,
        [taskId]: {
          id: taskId,
          scope,
          payload,
          result: null,
        },
      };
    }
    case types.TASK_COMPLETED: {
      const { taskId, result } = action.payload;
      return {
        ...state,
        [taskId]: {
          ...state[taskId],
          result,
        },
      };
    }
    default:
      return state;
  }
}

function activeByScope(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.TASK_STARTED: {
      const { scope, taskId } = action.payload;
      return {
        ...state,
        [scope]: [
          ...state[scope],
          taskId,
        ],
      };
    }
    case types.TASK_COMPLETED: {
      const { scope, taskId } = action.payload;
      return {
        ...state,
        [scope]: state[scope].filter((id) => id !== taskId),
      };
    }
    default:
      return state;
  }
}

export default combineReducers({
  byId,
  activeByScope,
});

const getTaskById = (state, taskId) => state.tasks.byId[taskId];
const getActiveTaskIdsByScope = (state, scope) => state.tasks.activeByScope[scope];

export const getDeletingFilesCounter = (state) => {
  const ids = [
    ...getActiveTaskIdsByScope(state, scopes.deletingImmediatelyBatch),
    ...getActiveTaskIdsByScope(state, scopes.movingToTrash),
  ];
  const tasks = ids.map((taskId) => getTaskById(state, taskId));
  return tasks.reduce((acc, task) => acc + task.payload.items.length, 0);
};

export const getMovingFilesCounter = (state) => {
  const ids = getActiveTaskIdsByScope(state, scopes.movingBatch);
  const tasks = ids.map((taskId) => getTaskById(state, taskId));
  return tasks.reduce((acc, task) => acc + task.payload.items.length, 0);
};

export const getIsEmptyingTrash = (state) => {
  const ids = getActiveTaskIdsByScope(state, scopes.emptyingTrash);
  return ids.length > 0;
};
