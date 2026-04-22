import { createEntityAdapter, createSelector, type EntityState } from '@reduxjs/toolkit';
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { MediaType, thumbnailSizes } from '@/constants';
import * as routes from '@/routes';
import type { DataExifSchema } from '@/types/Exif';

import apiSlice from './apiSlice';
import { isFetchBaseQueryErrorWithApiErrorCode, type RootState } from './store';

export { download } from './_download';

export function isFileActionNotAllowed(error: unknown): boolean {
  return isFetchBaseQueryErrorWithApiErrorCode(error, 'ACTION_NOT_ALLOWED');
}

export function isFileAlreadyExists(error: unknown): boolean {
  return isFetchBaseQueryErrorWithApiErrorCode(error, 'FILE_ALREADY_EXISTS');
}

export function isNotADirectory(error: unknown): boolean {
  return isFetchBaseQueryErrorWithApiErrorCode(error, 'NOT_A_DIRECTORY');
}

export interface FileSchema {
  id: string;
  name: string;
  path: string;
  size: number;
  mediatype: string;
  hidden: boolean;
  shared: boolean;
  thumbnail_url?: string;
  modified_at: string;
}

interface FileContentMetadataSchema {
  file_id: string;
  data: DataExifSchema;
}

export const filesAdapter = createEntityAdapter<FileSchema>({
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
    createFolder: builder.mutation<FileSchema, { name: string; inPath: string }>({
      query: ({ name, inPath }) => ({
        url: '/files/create_folder',
        method: 'POST',
        body: { path: routes.join(inPath, name) },
      }),
      invalidatesTags: (_result, _error, { inPath }) => [{ type: 'Files', id: inPath }],
    }),

    deleteImmediatelyBatch: builder.mutation<{ taskId: string }, string[]>({
      query: (paths) => ({
        url: '/files/delete_immediately_batch',
        method: 'POST',
        body: { items: paths.map((path) => ({ path })) },
      }),
      transformResponse: (responseData: { async_task_id: string }) => ({
        taskId: responseData.async_task_id,
      }),
    }),

    downloadContent: builder.query<{ path: string; content: string }, string>({
      query: (path) => ({
        url: '/files/download',
        method: 'POST',
        body: { path },
        responseHandler: (response: Response) => {
          const contentType = response.headers.get('content-type');
          if (MediaType.isText(contentType)) {
            return response.text();
          }
          return response.blob();
        },
      }),
      transformResponse: (data: string | Blob, _meta, arg) => {
        const content = typeof data === 'string' ? data : URL.createObjectURL(data);
        return { path: arg, content };
      },
      async onCacheEntryAdded(_arg, { cacheDataLoaded, cacheEntryRemoved }) {
        const data = await cacheDataLoaded;
        await cacheEntryRemoved;
        URL.revokeObjectURL(data.data.content);
      },
    }),

    emptyTrash: builder.mutation<{ taskId: string }, void>({
      query: () => ({
        url: '/files/empty_trash',
        method: 'POST',
      }),
      transformResponse: (responseData: { async_task_id: string }) => ({
        taskId: responseData.async_task_id,
      }),
    }),

    getContentMetadata: builder.query<FileContentMetadataSchema, string>({
      query: (fileId) => ({
        url: '/files/get_content_metadata',
        method: 'POST',
        body: { id: fileId },
      }),
    }),

    getThumbnail: builder.query<{ content: string }, { url: string; size: string }>({
      query: ({ url, size }) => ({
        url,
        params: { size },
        responseHandler: (response: Response) => response.blob(),
      }),
      transformResponse: (data: Blob) => {
        const content = URL.createObjectURL(data);
        return { content };
      },
      async onCacheEntryAdded(_arg, { cacheDataLoaded, cacheEntryRemoved }) {
        const data = await cacheDataLoaded;
        await cacheEntryRemoved;
        URL.revokeObjectURL(data.data.content);
      },
    }),

    listBookmarkedFiles: builder.query({
      async queryFn(arg, _queryApi, _extraOptions, fetchWithBQ) {
        const fileIdsResult = await fetchWithBQ('/users/bookmarks/list');
        if (fileIdsResult.error) {
          return { error: fileIdsResult.error as FetchBaseQueryError };
        }
        const { items: fileIds } = fileIdsResult.data as { items: string[] };
        const result = await fetchWithBQ({
          url: '/files/get_batch',
          method: 'POST',
          body: { ids: fileIds },
        });
        if (result.error) {
          return { error: result.error as FetchBaseQueryError };
        }
        const { items } = result.data as { items: FileSchema[] };
        return result.data
          ? { data: filesAdapter.setAll(initialState, items) }
          : { error: result.error };
      },
      providesTags: () => [{ type: 'Files', id: 'listBookmarkedFiles' }],
    }),

    listFolder: builder.query<EntityState<FileSchema, string>, string>({
      query: (path) => ({
        url: '/files/list_folder',
        method: 'POST',
        body: { path },
      }),
      providesTags: (_result, _error, arg) => [
        { type: 'Files', id: arg },
        { type: 'Files', id: 'listFolder' },
      ],
      transformResponse: (data: { items: FileSchema[] }) =>
        filesAdapter.setAll(initialState, data.items),
    }),

    moveFileBatch: builder.mutation<{ taskId: string }, { fromPath: string; toPath: string }[]>({
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
      transformResponse: (data: { async_task_id: string }) => ({ taskId: data.async_task_id }),
    }),

    moveToTrashBatch: builder.mutation<{ taskId: string }, string[]>({
      query: (paths) => ({
        url: '/files/move_to_trash_batch',
        method: 'POST',
        body: { items: paths.map((path) => ({ path })) },
      }),
      transformResponse: (data: { async_task_id: string }) => ({ taskId: data.async_task_id }),
    }),
  }),
});

export const {
  useCreateFolderMutation,
  useDeleteImmediatelyBatchMutation,
  useDownloadContentQuery,
  useEmptyTrashMutation,
  useGetContentMetadataQuery,
  useGetThumbnailQuery,
  useListBookmarkedFilesQuery,
  useListFolderQuery,
  useMoveFileBatchMutation,
  useMoveToTrashBatchMutation,
} = filesApi;

export const selectListFolderData = createSelector(
  [(state) => state, (_state, path) => path],
  (state, path) => filesApi.endpoints.listFolder.select(path)(state).data ?? initialState,
);

export const selectFileByIdInPath = createSelector(
  [(state) => state, (_state, arg) => arg],
  (state, { path, id }) => {
    const { selectById } = filesAdapter.getSelectors((state_) =>
      selectListFolderData(state_, path),
    );
    return selectById(state, id);
  },
);

const selectListBookmarkedFilesResult = filesApi.endpoints.listBookmarkedFiles.select(undefined);

const selectListBookmarkedFilesData = createSelector(
  selectListBookmarkedFilesResult,
  (listBookmarkedFilesResult) => listBookmarkedFilesResult.data,
);

export const { selectById: selectBookmarkedFileById } = filesAdapter.getSelectors(
  (state: RootState) => selectListBookmarkedFilesData(state) ?? initialState,
);

export const selectFallbackThumbnail = (
  state: RootState,
  { url, size }: { url: string; size: string },
) => {
  const selector = filesApi.endpoints.getThumbnail.select;
  let thumbnail = null;

  for (const fallbackSize of thumbnailSizes) {
    const { data } = selector({ url, size: fallbackSize })(state);
    if (data?.content != null) {
      thumbnail = data;
    }
    if (fallbackSize === size) {
      break;
    }
  }

  return thumbnail;
};
