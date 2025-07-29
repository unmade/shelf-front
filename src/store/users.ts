import { createSelector } from '@reduxjs/toolkit';

import apiSlice from './apiSlice';
import { filesAdapter, filesApi } from './files';
import { mediaItemsAdapter, photosApi } from './mediaItems';
import type { RootState } from './store';

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addBookmarkBatch: builder.mutation<null, string[]>({
      query: (fileIds) => ({
        url: '/users/bookmarks/add_batch',
        method: 'POST',
        body: { file_ids: fileIds },
      }),
      async onQueryStarted(fileIds, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          usersApi.util.updateQueryData('listBookmarks', undefined, (draft) => {
            draft.push(...fileIds);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: () => [
        { type: 'Files', id: 'listBookmarkedFiles' },
        { type: 'MediaItems', id: 'listFavourites' },
      ],
    }),

    listBookmarks: builder.query<string[], undefined>({
      query: () => '/users/bookmarks/list',
      transformResponse: (response: { items: string[] }) => response.items,
    }),

    removeBookmarkBatch: builder.mutation<undefined, string[]>({
      query: (fileIds) => ({
        url: '/users/bookmarks/remove_batch',
        method: 'POST',
        body: { file_ids: fileIds },
      }),
      async onQueryStarted(fileIds, { dispatch, queryFulfilled }) {
        const uniqueFileIds = new Set(fileIds);
        const patches = [
          dispatch(
            usersApi.util.updateQueryData('listBookmarks', undefined, (draft) =>
              draft.filter((id) => !uniqueFileIds.has(id)),
            ),
          ),
          dispatch(
            filesApi.util.updateQueryData('listBookmarkedFiles', undefined, (draft) =>
              // @ts-expect-error waiting for files.js to be rewritten in typescript
              filesAdapter.removeMany(draft, fileIds),
            ),
          ),
          dispatch(
            photosApi.util.updateQueryData('listMediaItems', { favourites: true }, (draft) =>
              mediaItemsAdapter.removeMany(draft, fileIds),
            ),
          ),
        ];
        try {
          await queryFulfilled;
        } catch {
          patches.forEach((patch) => {
            patch.undo();
          });
        }
      },
    }),
  }),
});

export const {
  useAddBookmarkBatchMutation,
  useListBookmarksQuery,
  useRemoveBookmarkBatchMutation,
} = usersApi;

const selectBookmarksFromResult = usersApi.endpoints.listBookmarks.select(undefined);
const empty = new Set();

export const selectAllBookmarks = createSelector(selectBookmarksFromResult, (bookmarksResult) =>
  bookmarksResult.data ? new Set(bookmarksResult.data) : empty,
);

export const selectIsBookmarked = (state: RootState, id: string) =>
  selectAllBookmarks(state).has(id);
