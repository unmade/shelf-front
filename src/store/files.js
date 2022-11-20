import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import apiSlice from './apiSlice';

const filesAdapter = createEntityAdapter();
const initialState = filesAdapter.getInitialState();

const filesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBatch: builder.query({
      query: (ids) => ({
        url: '/files/get_batch',
        method: 'POST',
        body: { ids },
      }),
      transformResponse: (data) => data.items,
    }),
    listFolder: builder.query({
      query: (path) => ({
        url: '/files/list_folder',
        method: 'POST',
        body: { path },
      }),
      providesTags: (_result, _error, arg) => [{ type: 'Files', id: arg }],
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
  }),
});

export const {
  useGetBatchQuery,
  useListFolderQuery,
  util: { invalidateTags },
} = filesApi;

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
