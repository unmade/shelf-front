import { createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import type { IFile } from '@/types/files';

import { isFetchBaseQueryErrorWithApiErrorCode, type RootState } from './store';

import apiSlice, { API_BASE_URL } from './apiSlice';
import { sharedLinkAdapter as mediaItemsSharedLinksAdapter, photosApi } from './mediaItems';
import { MediaType } from '@/constants';

export function isSharedLinkNotFound(error: unknown): boolean {
  return isFetchBaseQueryErrorWithApiErrorCode(error, 'SHARED_LINK_NOT_FOUND');
}

interface ISharedLinkSchema {
  file_id: string;
  token: string;
  created_at: string;
}

type SharedFile = IFile & ISharedLinkSchema;

const filesSharedViaLinkAdapter = createEntityAdapter<SharedFile>();
const filesSharedViaLinkInitialState = filesSharedViaLinkAdapter.getInitialState();

export const sharedLinksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSharedLink: builder.mutation<ISharedLinkSchema, string>({
      query: (fileId) => ({
        url: '/sharing/create_shared_link',
        method: 'POST',
        body: { file_id: fileId },
      }),
      invalidatesTags: (_result, _error, fileId) => [
        { type: 'MediaItems', id: 'listSharedLinks' },
        { type: 'Sharing', id: 'listFilesSharedViaLink' },
        { type: 'Sharing', id: `getSharedLink:${fileId}` },
      ],
    }),

    downloadSharedLinkContent: builder.query<
      { content: string },
      { token: string; filename: string }
    >({
      async queryFn({ token, filename }, _queryApi, _extraOptions, fetchWithBQ) {
        const getDownloadUrlResult = await fetchWithBQ({
          url: '/sharing/get_shared_link_download_url',
          method: 'POST',
          body: {
            token,
            filename,
          },
        });
        if (getDownloadUrlResult.error) {
          return { error: getDownloadUrlResult.error as FetchBaseQueryError };
        }
        const { download_url: url } = getDownloadUrlResult.data as { download_url: string };
        const result = await fetchWithBQ({
          url,
          method: 'GET',
          responseHandler: (response: Response) => {
            const contentType = response.headers.get('content-type');
            if (MediaType.isText(contentType)) {
              return response.text();
            }
            return response.blob();
          },
        });
        if (result.error) {
          return { error: result.error as FetchBaseQueryError };
        }
        const data = result.data as string | Blob;
        const content = typeof data === 'string' ? data : URL.createObjectURL(data);
        return { data: { content } };
      },
      async onCacheEntryAdded(_arg, { cacheDataLoaded, cacheEntryRemoved }) {
        const data = await cacheDataLoaded;
        await cacheEntryRemoved;
        URL.revokeObjectURL(data.data.content);
      },
    }),

    getSharedLink: builder.query<ISharedLinkSchema, string>({
      query: (fileId) => ({
        url: '/sharing/get_shared_link',
        method: 'POST',
        body: { file_id: fileId },
      }),
      providesTags: (_result, _error, fileId) => [
        { type: 'Sharing', id: `getSharedLink:${fileId}` },
      ],
    }),

    getSharedLinkFile: builder.query<IFile, { token: string; filename: string }>({
      query: ({ token, filename }) => ({
        url: '/sharing/get_shared_link_file',
        method: 'POST',
        body: { token, filename },
      }),
    }),

    listFilesSharedViaLink: builder.query({
      providesTags: [{ type: 'Sharing', id: 'listFilesSharedViaLink' }],
      async queryFn(arg, queryApi, _extraOptions, fetchWithBQ) {
        const sharedLinksResult = await fetchWithBQ('/sharing/list_shared_links');
        if (sharedLinksResult.error) {
          return { error: sharedLinksResult.error as FetchBaseQueryError };
        }
        const { items: sharedLinks } = sharedLinksResult.data as { items: ISharedLinkSchema[] };

        const sharedLinkByFileId = new Map(
          sharedLinks.map((item) => [item.file_id, item] as const),
        );
        const result = await fetchWithBQ({
          url: '/files/get_batch',
          method: 'POST',
          body: { ids: Array.from(sharedLinkByFileId.keys()) },
        });

        if (result.error) {
          return { error: result.error as FetchBaseQueryError };
        }

        const { items: files } = result.data as { items: IFile[] };

        const merged: SharedFile[] = files
          .map((file) => {
            const sharedLink = sharedLinkByFileId.get(file.id);
            if (!sharedLink) {
              return null;
            }
            return {
              ...file,
              token: sharedLink.token,
              created_at: sharedLink.created_at,
            };
          })
          .filter((x): x is SharedFile => x !== null);

        const data = filesSharedViaLinkAdapter.setAll(filesSharedViaLinkInitialState, merged);

        const { selectAll } = filesSharedViaLinkAdapter.getSelectors();
        queryApi.dispatch(
          sharedLinksApi.util.upsertQueryEntries(
            selectAll(data).map((entity) => ({
              endpointName: 'getSharedLink',
              arg: entity.id,
              value: {
                file_id: entity.id,
                token: entity.token,
                created_at: entity.created_at,
              },
            })),
          ),
        );

        return { data };
      },
    }),

    revokeSharedLink: builder.mutation<null, { fileId: string; token: string }>({
      query: ({ token }) => ({
        url: '/sharing/revoke_shared_link',
        method: 'POST',
        body: { token, filename: '' },
      }),
      invalidatesTags: (_result, _error, { fileId }) => [
        { type: 'Sharing', id: 'listFilesSharedViaLink' },
        { type: 'Sharing', id: `getSharedLink:${fileId}` },
      ],
      async onQueryStarted({ fileId }, { dispatch, queryFulfilled }) {
        const listMediaItemSharedLinksPatchResult = dispatch(
          photosApi.util.updateQueryData('listMediaItemSharedLinks', undefined, (draft) =>
            mediaItemsSharedLinksAdapter.removeOne(draft, fileId),
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          listMediaItemSharedLinksPatchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useCreateSharedLinkMutation,
  useDownloadSharedLinkContentQuery,
  useGetSharedLinkQuery,
  useGetSharedLinkFileQuery,
  useListFilesSharedViaLinkQuery,
  useRevokeSharedLinkMutation,
} = sharedLinksApi;

export const downloadSharedLinkFile = createAsyncThunk(
  'sharing/downloadSharedLinkFile',
  async ({ token, filename }: { token: string; filename: string }) => {
    const url = `${API_BASE_URL}/sharing/get_shared_link_download_url`;
    const options: RequestInit = {
      method: 'POST',
      mode: 'cors',
      cache: 'default',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify({
        token,
        filename,
      }),
    };

    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();

      if (data != null) {
        const link = document.createElement('a');
        link.href = data.download_url;
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      }
    }
  },
);

const selectListFilesSharedViaLinkResult =
  sharedLinksApi.endpoints.listFilesSharedViaLink.select(undefined);

const selectListFilesSharedViaLinkResultData = createSelector(
  selectListFilesSharedViaLinkResult,
  (result) => result.data,
);

export const { selectById: selectFilesSharedViaLinkById } = filesSharedViaLinkAdapter.getSelectors(
  (state: RootState) =>
    selectListFilesSharedViaLinkResultData(state) ?? filesSharedViaLinkInitialState,
);
