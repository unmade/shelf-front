export const types = {
  TASK_STARTED: 'TASK_STARTED',
  TASK_COMPLETED: 'TASK_COMPLETED',
};

export const scopes = {
  deletingImmediatelyBatch: 'deletingImmediatelyBatch',
  emptyingTrash: 'emptyingTrash',
  moving: 'moving',
  movingBatch: 'movingBatch',
  movingToTrash: 'movingToTrash',
};

export const taskStarted = (scope, taskId, payload) => ({
  type: types.TASK_STARTED,
  payload: { scope, taskId, payload },
});

export const taskCompleted = (scope, taskId, result) => ({
  type: types.TASK_COMPLETED,
  payload: { scope, taskId, result },
});
