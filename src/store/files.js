import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';

import { MediaType, thumbnailSizes } from '../constants';
import * as routes from '../routes';

import apiSlice from './apiSlice';

export { download } from './_download';

export const filesAdapter = createEntityAdapter({
  sortComparer: (a, b) => {
    if (a.mediatype === MediaType.FOLDER && b.mediatype !== MediaType.FOLDER) {
      return -1;
    }
    if (a.mediatype !== MediaType.FOLDER && b.mediatype === MediaType.FOLDER) {
      return 1;
    }
    return a.path.toLowerCase().localeCompare(b.path.toLowerCase());
  },
});
const initialState = filesAdapter.getInitialState();

export const filesApi = apiSlice.injectEndpoints({
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
    downloadContent: builder.query({
      query: (path) => ({
        url: '/files/download',
        method: 'POST',
        body: { path },
        responseHandler: (response) => {
          const contentType = response.headers.get('content-type');
          return MediaType.isText(contentType) ? response.text() : response.blob();
        },
      }),
      transformResponse: (data, meta, arg) => {
        const contentType = meta.response.headers.get('content-type');
        const content = MediaType.isText(contentType) ? data : URL.createObjectURL(data);
        return { path: arg, content };
      },
      async onCacheEntryAdded(_arg, { cacheDataLoaded, cacheEntryRemoved }) {
        const data = await cacheDataLoaded;
        await cacheEntryRemoved;
        URL.revokeObjectURL(data?.content);
      },
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
    getContentMetadata: builder.query({
      query: (fileId) => ({
        url: '/files/get_content_metadata',
        method: 'POST',
        body: { id: fileId },
      }),
    }),
    getThumbnail: builder.query({
      query: ({ url, size, mtime }) => ({
        url,
        params: { size, mtime },
        responseHandler: (response) => response.blob(),
      }),
      transformResponse: (data, _meta, arg) => {
        const content = URL.createObjectURL(data);
        return { fileId: arg, content };
      },
      async onCacheEntryAdded(_arg, { cacheDataLoaded, cacheEntryRemoved }) {
        const data = await cacheDataLoaded;
        await cacheEntryRemoved;
        URL.revokeObjectURL(data?.content);
      },
    }),
    listBookmarkedFiles: builder.query({
      async queryFn(arg, _queryApi, _extraOptions, fetchWithBQ) {
        const fileIdsResult = await fetchWithBQ('/users/bookmarks/list');
        if (fileIdsResult.error) {
          return { error: fileIdsResult.error };
        }
        const { items: fileIds } = fileIdsResult.data;
        const result = await fetchWithBQ({
          url: '/files/get_batch',
          method: 'POST',
          body: { ids: fileIds },
        });
        return result.data
          ? { data: filesAdapter.setAll(initialState, result.data.items) }
          : { error: result.error };
      },
      providesTags: () => [{ type: 'Files', id: 'listBookmarkedFiles' }],
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
  useDownloadContentQuery,
  useEmptyTrashMutation,
  useFindDuplicatesQuery,
  useGetContentMetadataQuery,
  useGetThumbnailQuery,
  useListBookmarkedFilesQuery,
  useListFolderQuery,
  useMoveFileBatchMutation,
  useMoveToTrashBatchMutation,
} = filesApi;

export const selectListFolderData = createSelector(
  (state, path) => filesApi.endpoints.listFolder.select(path)(state),
  (result) => result.data ?? initialState,
);

export const selectFileByIdInPath = createSelector(
  (state, { path, id }) => {
    const { selectById } = filesAdapter.getSelectors((state_) =>
      selectListFolderData(state_, path),
    );
    return selectById(state, id);
  },
  (entity) => entity,
);

const selectListBookmarkedFilesResult = filesApi.endpoints.listBookmarkedFiles.select();

const selectListBookmarkedFilesData = createSelector(
  selectListBookmarkedFilesResult,
  (listBookmarkedFilesResult) => listBookmarkedFilesResult.data,
);

export const { selectById: selectBookmarkedFileById } = filesAdapter.getSelectors(
  (state) => selectListBookmarkedFilesData(state) ?? initialState,
);

export const selectFallbackThumbnail = (state, { fileId, size, mtime }) => {
  const selector = filesApi.endpoints.getThumbnail.select;
  let thumbnail = null;

  // eslint-disable-next-line no-restricted-syntax
  for (const fallbackSize of thumbnailSizes) {
    const { data } = selector({ fileId, size: fallbackSize, mtime })(state);
    if (data?.content != null) {
      thumbnail = data;
    }
    if (fallbackSize === size) {
      break;
    }
  }

  return thumbnail;
};
