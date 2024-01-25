import { EntityState, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

import { IMediaItem } from 'types/photos';

import { RootState } from 'store/store';

import apiSlice from './apiSlice';

interface IMediaItemSchema {
  file_id: string;
  name: string;
  size: number;
  mtime: number;
  mediatype: string;
  thumbnail_url: string;
}

interface IMediaItemCategorySchema {
  name: string;
  origin: 'auto' | 'user';
  probability: number;
}

interface IListMediaItemCategoriesResponse {
  file_id: string;
  categories: IMediaItemCategorySchema[];
}

function toMediaItem(item: IMediaItemSchema): IMediaItem {
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

export const mediaItemsAdapter = createEntityAdapter<IMediaItem>({
  sortComparer: (a, b) => (a.mtime > b.mtime ? -1 : 1),
});
const initialState = mediaItemsAdapter.getInitialState();

const photosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listMediaItems: builder.query<EntityState<IMediaItem>, undefined>({
      query: () => ({
        url: '/photos/list_media_items',
        method: 'GET',
      }),
      providesTags: (_result, _error, arg) => [{ type: 'MediaItems', id: arg }],
      transformResponse: (data: { items: IMediaItemSchema[] }) =>
        mediaItemsAdapter.setAll(initialState, data.items.map(toMediaItem)),
    }),
    listMediaItemCategories: builder.query<IListMediaItemCategoriesResponse, string>({
      query: (fileId) => ({
        url: '/photos/list_media_item_categories',
        method: 'POST',
        body: { file_id: fileId },
      }),
    }),
    setMediaItemCategories: builder.mutation({
      query: ({ fileId, categories }: { fileId: string; categories: string[] }) => ({
        url: '/photos/set_media_item_categories',
        method: 'POST',
        body: { file_id: fileId, categories },
      }),
      async onQueryStarted({ fileId, categories }, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          photosApi.util.updateQueryData('listMediaItemCategories', fileId, () => ({
            file_id: fileId,
            categories: categories.map((name) => ({ name, origin: 'user', probability: 100 })),
          })),
        );
      },
    }),
  }),
});

export const {
  useListMediaItemsQuery,
  useListMediaItemCategoriesQuery,
  useSetMediaItemCategoriesMutation,
} = photosApi;

const selectListMediaItemsResult = photosApi.endpoints.listMediaItems.select(undefined);

const selectListMediaItemsData = createSelector(
  selectListMediaItemsResult,
  (result) => result.data,
);

export const { selectById: selectMediaItemById } = mediaItemsAdapter.getSelectors(
  (state: RootState) => selectListMediaItemsData(state) ?? initialState,
);
