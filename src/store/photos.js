import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';

import apiSlice from './apiSlice';

function toMediaItem(item) {
  return {
    id: item.file_id,
    fileId: item.file_id,
    name: item.name,
    size: item.size,
    mtime: item.mtime,
    mediatype: item.mediatype,
    thumbnailUrl: item.thumbnail_url,
  };
}

export const mediaItemsAdapter = createEntityAdapter();
const initialState = mediaItemsAdapter.getInitialState();

const photosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listMediaItems: builder.query({
      query: () => ({
        url: '/photos/list_media_items',
        method: 'GET',
      }),
      providesTags: (_result, _error, arg) => [{ type: 'MediaItems', id: arg }],
      transformResponse: (data) =>
        mediaItemsAdapter.setAll(initialState, data.items.map(toMediaItem)),
    }),
  }),
});

export const { useListMediaItemsQuery } = photosApi;

const selectListMediaItemsResult = photosApi.endpoints.listMediaItems.select();

const selectListMediaItemsData = createSelector(
  selectListMediaItemsResult,
  (result) => result.data,
);

export const { selectById: selectMediaItemById } = mediaItemsAdapter.getSelectors(
  (state) => selectListMediaItemsData(state) ?? initialState,
);
