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

interface IListMediaItemFilters {
  favourites: boolean;
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
    listMediaItems: builder.query<EntityState<IMediaItem>, IListMediaItemFilters | undefined>({
      query: (filters) => ({
        url: '/photos/list_media_items',
        method: 'GET',
        params: { favourites: filters?.favourites ?? false },
      }),
      providesTags: (_result, _error, arg) => [
        { type: 'MediaItems', id: arg?.favourites ? 'listFavourites' : 'list' },
      ],
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

const selectListMediaItemsData = createSelector(
  (state: RootState, filters: IListMediaItemFilters | undefined) =>
    photosApi.endpoints.listMediaItems.select(filters)(state),
  (result) => result.data ?? initialState,
);

const createSelectMediaItemByIdSelector = createSelector(
  (filters: IListMediaItemFilters | undefined) => filters,
  (filters) => {
    const { selectById } = mediaItemsAdapter.getSelectors((state_: RootState) =>
      selectListMediaItemsData(state_, filters),
    );
    return selectById;
  },
);

export const selectMediaItemById = createSelector(
  [
    (state: RootState) => state,
    (_state: RootState, arg: { id: string; filters?: IListMediaItemFilters }) =>
      createSelectMediaItemByIdSelector(arg.filters),
    (_state: RootState, arg: { id: string; filters?: IListMediaItemFilters | undefined }) => arg.id,
  ],
  (state, selectById, id) => selectById(state, id),
);
