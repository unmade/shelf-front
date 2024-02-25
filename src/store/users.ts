import { createSelector } from '@reduxjs/toolkit';

import apiSlice from './apiSlice';
import { filesAdapter, filesApi } from './files';
import { mediaItemsAdapter, photosApi } from './mediaItems';
import { RootState } from './store';

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addBookmark: builder.mutation<null, string>({
      query: (fileId) => ({
        url: '/users/bookmarks/add',
        method: 'POST',
        body: { id: fileId },
      }),
      async onQueryStarted(fileId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          usersApi.util.updateQueryData('listBookmarks', undefined, (draft) => {
            draft.push(fileId);
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
    removeBookmark: builder.mutation<undefined, string>({
      query: (fileId) => ({
        url: '/users/bookmarks/remove',
        method: 'POST',
        body: { id: fileId },
      }),
      async onQueryStarted(fileId: string, { dispatch, queryFulfilled }) {
        const patchListBookmarksResult = dispatch(
          usersApi.util.updateQueryData('listBookmarks', undefined, (draft) =>
            draft.filter((id) => id !== fileId),
          ),
        );
        const patchListBookmarkedFilesResult = dispatch(
          filesApi.util.updateQueryData('listBookmarkedFiles', undefined, (draft) =>
            // @ts-expect-error waiting for files.js to be rewritten in typescript
            filesAdapter.removeOne(draft, fileId),
          ),
        );
        const patchListMediaItemsResult = dispatch(
          photosApi.util.updateQueryData('listMediaItems', { favourites: true }, (draft) =>
            mediaItemsAdapter.removeOne(draft, fileId),
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          patchListBookmarksResult.undo();
          patchListBookmarkedFilesResult.undo();
          patchListMediaItemsResult.undo();
        }
      },
    }),
  }),
});

export const { useAddBookmarkMutation, useListBookmarksQuery, useRemoveBookmarkMutation } =
  usersApi;

const selectBookmarksFromResult = usersApi.endpoints.listBookmarks.select(undefined);
const empty = new Set();

export const selectAllBookmarks = createSelector(selectBookmarksFromResult, (bookmarksResult) =>
  bookmarksResult?.data ? new Set(bookmarksResult.data) : empty,
);

export const selectIsBookmarked = (state: RootState, id: string) =>
  selectAllBookmarks(state).has(id);
