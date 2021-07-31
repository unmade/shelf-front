export const types = {
  TASK_STARTED: 'TASK_STARTED',
  TASK_COMPLETED: 'TASK_COMPLETED',
};

export const scopes = {
  deletingImmediately: 'deletingImmediately',
  moving: 'moving',
  movingBatch: 'movingBatch',
  movingToTrash: 'movingToTrash',
};

export const taskStarted = (scope, taskId, payload) => ({
  type: types.TASK_STARTED,
  payload: { scope, taskId, payload },
});

export const taskCompleted = (scope, taskId, results) => ({
  type: types.TASK_COMPLETED,
  payload: { scope, taskId, results },
});
