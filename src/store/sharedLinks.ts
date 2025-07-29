import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import apiSlice from './apiSlice';
import { sharedLinkAdapter as mediaItemsSharedLinksAdapter, photosApi } from './mediaItems';

interface ISharedLinkSchema {
  file_id: string;
  token: string | null;
  created_at: string | null;
}

export const sharedLinksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSharedLink: builder.mutation<ISharedLinkSchema, string>({
      query: (fileId) => ({
        url: '/sharing/create_shared_link',
        method: 'POST',
        body: { file_id: fileId },
      }),
      invalidatesTags: [
        { type: 'Sharing', id: 'listFilesSharedViaLink' },
        { type: 'MediaItems', id: 'listSharedLinks' },
      ],
      async onQueryStarted(fileId, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(sharedLinksApi.util.updateQueryData('getSharedLink', fileId, () => data));
      },
    }),
    getSharedLink: builder.query<ISharedLinkSchema, string>({
      queryFn: async (arg, _queryApi, _extraOptions, baseQuery) => {
        try {
          const result = await baseQuery({
            url: '/sharing/get_shared_link',
            method: 'POST',
            body: { file_id: arg },
          });
          if (result.data) {
            return { data: result.data as ISharedLinkSchema };
          }
          // @ts-expect-error: we expect code to exists
          if (result.error?.data?.code === 'SHARED_LINK_NOT_FOUND') {
            return {
              data: {
                file_id: arg,
                token: null,
                created_at: null,
              },
            };
          }
          return { error: result.error! };
        } catch (error) {
          return { error: { status: 'FETCH_ERROR', error } as FetchBaseQueryError };
        }
      },
    }),
    revokeSharedLink: builder.mutation<null, { fileId: string; token: string }>({
      query: ({ token }) => ({
        url: '/sharing/revoke_shared_link',
        method: 'POST',
        body: { token, filename: '' },
      }),
      invalidatesTags: [{ type: 'Sharing', id: 'listFilesSharedViaLink' }],
      async onQueryStarted({ fileId }, { dispatch, queryFulfilled }) {
        const getSharedLinkPatchResult = dispatch(
          sharedLinksApi.util.updateQueryData('getSharedLink', fileId, () => ({
            file_id: fileId,
            token: null,
            created_at: '',
          })),
        );
        const listMediaItemSharedLinksPatchResult = dispatch(
          photosApi.util.updateQueryData('listMediaItemSharedLinks', undefined, (draft) =>
            mediaItemsSharedLinksAdapter.removeOne(draft, fileId),
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          getSharedLinkPatchResult.undo();
          listMediaItemSharedLinksPatchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useCreateSharedLinkMutation,
  useGetSharedLinkQuery,
  // useGetSharedLinkFileQuery,
  useRevokeSharedLinkMutation,
} = sharedLinksApi;
