import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';

import type { IFile } from '@/types/files';

import type { AppDispatch, RootState } from './store';
import { API_BASE_URL, invalidateTags } from './apiSlice';
import { selectAccessToken } from './authSlice';

export enum Scopes {
  DeletingImmediatelyBatch = 'deletingImmediatelyBatch',
  EmptyingTrash = 'emptyingTrash',
  MovingBatch = 'movingBatch',
  MovingToTrash = 'movingToTrash',
}

const endpointsByScope = {
  [Scopes.DeletingImmediatelyBatch]: '/files/delete_immediately_batch/check',
  [Scopes.EmptyingTrash]: '/files/empty_trash/check',
  [Scopes.MovingBatch]: '/files/move_batch/check',
  [Scopes.MovingToTrash]: '/files/move_batch/check',
};

interface Arg {
  taskId: string;
  scope: Scopes;
  itemsCount: number;
  files?: IFile[];
}

interface AsyncTaskResult {
  file: IFile | null;
  err_code:
    | 'internal_error'
    | 'file_action_not_allowed'
    | 'file_already_exists'
    | 'file_not_found'
    | 'file_too_large'
    | 'is_a_directory'
    | 'malformed_path'
    | 'missing_parent'
    | 'not_a_directory'
    | null;
}

interface ResponseData {
  status: 'pending' | 'completed';
  result: AsyncTaskResult[];
}

export const waitForBackgroundTaskToComplete = createAsyncThunk<
  ResponseData,
  Arg,
  { dispatch: AppDispatch; getState: () => RootState }
>('tasks/waitForTask', async ({ taskId, scope }, { dispatch, getState }) => {
  const accessToken = selectAccessToken(getState() as RootState);

  const endpoint = endpointsByScope[scope];
  const url = `${API_BASE_URL}${endpoint}`;
  const options: RequestInit = {
    method: 'POST',
    mode: 'cors',
    cache: 'default',
    headers: new Headers({
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'X-Request-ID': nanoid(),
    }),
    body: JSON.stringify({ async_task_id: taskId }),
  };

  while (true) {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    dispatch(invalidateTags([{ type: 'Files', id: 'listFolder' }]));

    const response = await fetch(url, options);

    const data = await response.json();
    if (data.status === 'completed') {
      return data;
    }
  }
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    [Scopes.DeletingImmediatelyBatch]: 0,
    [Scopes.EmptyingTrash]: 0,
    [Scopes.MovingBatch]: 0,
    [Scopes.MovingToTrash]: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(waitForBackgroundTaskToComplete.pending, (state, action) => {
        const { scope, itemsCount } = action.meta.arg;
        state[scope] += itemsCount;
      })
      .addCase(waitForBackgroundTaskToComplete.fulfilled, (state, action) => {
        const { scope, itemsCount } = action.meta.arg;
        state[scope] -= itemsCount;
      });
  },
});

export default tasksSlice.reducer;

export const selectCounterByScope = (state: RootState, scope: Scopes) => state.tasks[scope];
