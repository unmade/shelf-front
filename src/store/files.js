import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';

import apiSlice from './apiSlice';

import * as routes from '../routes';

const filesAdapter = createEntityAdapter();
const initialState = filesAdapter.getInitialState();

const filesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createFolder: builder.mutation({
      query: ({ name, inPath }) => ({
        url: '/files/create_folder',
        method: 'POST',
        body: { path: routes.join(inPath, name) },
      }),
      invalidatesTags: (_result, _error, { inPath }) => [{ type: 'Files', id: inPath }],
    }),
    deleteImmediatelyBatch: builder.mutation({
      query: (paths) => ({
        url: '/files/delete_immediately_batch',
        method: 'POST',
        body: { items: paths.map((path) => ({ path })) },
      }),
      transformResponse: (responseData) => ({ taskId: responseData.async_task_id }),
    }),
    emptyTrash: builder.mutation({
      query: () => ({
        url: '/files/empty_trash',
        method: 'POST',
      }),
      transformResponse: (responseData) => ({ taskId: responseData.async_task_id }),
    }),
    findDuplicates: builder.query({
      query: ({ path, maxDistance }) => ({
        url: '/files/find_duplicates',
        method: 'POST',
        body: { path, max_distance: maxDistance },
      }),
      transformResponse: (data) => data.items,
    }),
    getBatch: builder.query({
      query: (ids) => ({
        url: '/files/get_batch',
        method: 'POST',
        body: { ids },
      }),
      transformResponse: (data) => data.items,
    }),
    getContentMetadata: builder.query({
      query: (path) => ({
        url: '/files/get_content_metadata',
        method: 'POST',
        body: { path },
      }),
    }),
    listFolder: builder.query({
      query: (path) => ({
        url: '/files/list_folder',
        method: 'POST',
        body: { path },
      }),
      providesTags: (_result, _error, arg) => [
        { type: 'Files', id: arg },
        { type: 'Files', id: 'listFolder' },
      ],
      transformResponse: (data) => filesAdapter.setAll(initialState, data.items),
      async onQueryStarted({ path }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const items = Object.values(data?.entities ?? {});
          dispatch({ type: 'files/listFolder/fulfilled', payload: { path, items } });
        } catch (err) {
          //
        }
      },
    }),
    moveFileBatch: builder.mutation({
      query: (relocations) => ({
        url: '/files/move_batch',
        method: 'POST',
        body: {
          items: relocations.map((relocation) => ({
            from_path: relocation.fromPath,
            to_path: relocation.toPath,
          })),
        },
      }),
      transformResponse: (responseData) => ({ taskId: responseData.async_task_id }),
    }),
    moveToTrashBatch: builder.mutation({
      query: (paths) => ({
        url: '/files/move_to_trash_batch',
        method: 'POST',
        body: { items: paths.map((path) => ({ path })) },
      }),
      transformResponse: (responseData) => ({ taskId: responseData.async_task_id }),
    }),
  }),
});

export const {
  useCreateFolderMutation,
  useDeleteImmediatelyBatchMutation,
  useEmptyTrashMutation,
  useFindDuplicatesQuery,
  useGetBatchQuery,
  useGetContentMetadataQuery,
  useListFolderQuery,
  useMoveFileBatchMutation,
  useMoveToTrashBatchMutation,
} = filesApi;

export const selectFindDuplicatesData = createSelector(
  (state, path, maxDistance) => filesApi.endpoints.findDuplicates.select(path, maxDistance)(state),
  (result) => result.data ?? null
);

export const selectListFolderData = createSelector(
  (state, path) => filesApi.endpoints.listFolder.select(path)(state),
  (result) => result.data ?? initialState
);

export const selectFileByIdInPath = createSelector(
  (state, { path, id }) => {
    const { selectById } = filesAdapter.getSelectors((state_) =>
      selectListFolderData(state_, path)
    );
    return selectById(state, id);
  },
  (entity) => entity
);
