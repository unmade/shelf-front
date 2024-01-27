import { createSelector } from '@reduxjs/toolkit';

import apiSlice from './apiSlice';
import { filesAdapter } from './files';
import { mediaItemsAdapter } from './photos';

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addBookmark: builder.mutation({
      query: (fileId) => ({
        url: '/users/bookmarks/add',
        method: 'POST',
        body: { id: fileId },
      }),
      async onQueryStarted(fileId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('listBookmarks', undefined, (draft) => {
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
    listBookmarks: builder.query({
      query: () => '/users/bookmarks/list',
      transformResponse: (response) => response.items,
    }),
    removeBookmark: builder.mutation({
      query: (fileId) => ({
        url: '/users/bookmarks/remove',
        method: 'POST',
        body: { id: fileId },
      }),
      async onQueryStarted(fileId, { dispatch, queryFulfilled }) {
        const patchListBookmarksResult = dispatch(
          apiSlice.util.updateQueryData('listBookmarks', undefined, (draft) =>
            draft.filter((id) => id !== fileId),
          ),
        );
        const patchListBookmarkedFilesResult = dispatch(
          apiSlice.util.updateQueryData('listBookmarkedFiles', undefined, (draft) =>
            filesAdapter.removeOne(draft, fileId),
          ),
        );
        const patchListMediaItemsResult = dispatch(
          apiSlice.util.updateQueryData('listMediaItems', { favourites: true }, (draft) =>
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

const selectBookmarksFromResult = usersApi.endpoints.listBookmarks.select();
const empty = new Set();

export const selectAllBookmarks = createSelector(selectBookmarksFromResult, (bookmarksResult) =>
  bookmarksResult?.data ? new Set(bookmarksResult.data) : empty,
);

export const selectIsBookmarked = (state, id) => selectAllBookmarks(state).has(id);
