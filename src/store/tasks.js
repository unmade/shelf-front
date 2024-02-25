import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';

import apiSlice, { API_BASE_URL, invalidateTags } from './apiSlice';
import { selectAccessToken } from './authSlice';
import { selectPhotosLibraryPath } from './features';
import { mediaItemsAdapter } from './mediaItems';

export const scopes = {
  deletingImmediatelyBatch: 'deletingImmediatelyBatch',
  emptyingTrash: 'emptyingTrash',
  movingBatch: 'movingBatch',
  movingToTrash: 'movingToTrash',
};

const endpointsByScope = {
  [scopes.deletingImmediatelyBatch]: '/files/delete_immediately_batch/check',
  [scopes.emptyingTrash]: '/files/empty_trash/check',
  [scopes.movingBatch]: '/files/move_batch/check',
  [scopes.movingToTrash]: '/files/move_batch/check',
};

function updateMediaItemsCache(scope, files, responseData, { dispatch, getState }) {
  if (scope !== scopes.movingToTrash) {
    return null;
  }

  const filesByIds = Object.fromEntries(responseData.result.map((obj) => [obj.file?.id, obj.file]));

  const libraryPath = selectPhotosLibraryPath(getState());
  const mediaItemIds = files
    .filter((file) => file.path.startsWith(libraryPath) && filesByIds[file.id])
    .map((file) => file.id);

  if (mediaItemIds.length > 0) {
    dispatch(
      apiSlice.util.updateQueryData('listMediaItems', undefined, (draft) => {
        mediaItemsAdapter.removeMany(draft, mediaItemIds);
      }),
    );
  }
  return null;
}

export const waitForBackgroundTaskToComplete = createAsyncThunk(
  'tasks/waitForTask',
  async ({ taskId, scope, files }, { dispatch, getState }) => {
    const accessToken = selectAccessToken(getState());

    const endpoint = endpointsByScope[scope];
    const url = `${API_BASE_URL}${endpoint}`;
    const options = {
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

    // eslint-disable-next-line no-constant-condition
    while (true) {
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      dispatch(invalidateTags([{ type: 'Files', id: 'listFolder' }]));
      // eslint-disable-next-line no-await-in-loop
      const response = await fetch(url, options);
      // eslint-disable-next-line no-await-in-loop
      const data = await response.json();
      if (data.status === 'completed') {
        updateMediaItemsCache(scope, files, data, { dispatch, getState });
        return data;
      }
    }
  },
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    [scopes.deletingImmediatelyBatch]: 0,
    [scopes.emptyingTrash]: 0,
    [scopes.movingBatch]: 0,
    [scopes.movingToTrash]: 0,
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

export const selectCounterByScope = (state, scope) => state.tasks[scope];
