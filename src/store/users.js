import { createSelector } from '@reduxjs/toolkit';

import apiSlice from './apiSlice';
import { filesAdapter } from './files';

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
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: () => [{ type: 'Files', id: 'listBookmarkedFiles' }],
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
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('listBookmarks', undefined, (draft) =>
            draft.filter((id) => id !== fileId)
          )
        );
        const patchResult2 = dispatch(
          apiSlice.util.updateQueryData('listBookmarkedFiles', undefined, (draft) =>
            filesAdapter.removeOne(draft, fileId)
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          patchResult2.undo();
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
  bookmarksResult?.data ? new Set(bookmarksResult.data) : empty
);

export const selectIsBookmarked = (state, id) => selectAllBookmarks(state).has(id);
