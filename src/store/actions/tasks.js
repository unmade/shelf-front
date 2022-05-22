import { createAction } from '@reduxjs/toolkit';

export const scopes = {
  deletingImmediatelyBatch: 'deletingImmediatelyBatch',
  emptyingTrash: 'emptyingTrash',
  moving: 'moving',
  movingBatch: 'movingBatch',
  movingToTrash: 'movingToTrash',
};

export const taskStarted = createAction('tasks/taskStarted', (scope, taskId, payload) => ({
  payload: { scope, taskId, payload },
}));

export const taskCompleted = createAction('tasks/taskCompleted', (scope, taskId, result) => ({
  payload: { scope, taskId, result },
}));
