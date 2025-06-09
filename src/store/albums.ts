import { EntityState, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { defaultSerializeQueryArgs } from '@reduxjs/toolkit/query';

import { IAlbum, IMediaItem } from 'types/photos';

import apiSlice from './apiSlice';
import { RootState } from './store';

interface IAlbumsSchema {
  id: string;
  slug: string;
  title: string;
  items_count: number;
  created_at: string;
  cover: {
    file_id: string;
    thumbnail_url: string | null;
  } | null;
}

interface IAlbumItemSchema {
  file_id: string;
  name: string;
  size: number;
  modified_at: string;
  mediatype: string;
  thumbnail_url: string;
  deleted_at: string;
}

interface IListAlbumsFilters {
  page?: number;
  pageSize?: number;
}

interface IListAlbumItemsFilters {
  albumSlug: string;
  page?: number;
  pageSize?: number;
  favourites?: boolean;
}

function toAlbum(schema: IAlbumsSchema): IAlbum {
  const { id, slug, title, items_count: itemsCount, created_at: createdAt } = schema;
  let cover = null;
  if (schema.cover != null) {
    cover = {
      fileId: schema.cover.file_id,
      thumbnailUrl: schema.cover.thumbnail_url,
    };
  }
  return { id, slug, title, cover, itemsCount, createdAt };
}

function toMediaItem(schema: IAlbumItemSchema): IMediaItem {
  return {
    id: schema.file_id,
    fileId: schema.file_id,
    name: schema.name,
    size: schema.size,
    modifiedAt: schema.modified_at,
    mediatype: schema.mediatype,
    deletedAt: schema.deleted_at ?? null,
    thumbnailUrl: schema.thumbnail_url,
  };
}

export const albumsAdapter = createEntityAdapter({
  selectId: (album: IAlbum) => album.slug,
});
const initialState = albumsAdapter.getInitialState();

export const albumItemsAdapter = createEntityAdapter<IMediaItem>({});
const albumItemsInitialState = albumItemsAdapter.getInitialState();

export const albumsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAlbum: builder.mutation<IAlbum, { title: string }>({
      query: ({ title }) => ({
        url: '/photos/albums',
        method: 'POST',
        body: { title },
      }),
    }),

    getAlbum: builder.query<IAlbum, string>({
      query: (albumSlug) => ({
        url: `/photos/albums/${albumSlug}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, albumSlug) => [{ type: 'Albums', id: albumSlug }],
      transformResponse: (data: IAlbumsSchema) => toAlbum(data),
    }),

    listAlbums: builder.query<EntityState<IAlbum, string>, IListAlbumsFilters | undefined>({
      query: (filters) => ({
        url: '/photos/albums',
        method: 'GET',
        params: {
          page: filters?.page,
          page_size: filters?.pageSize,
        },
      }),
      serializeQueryArgs: ({ endpointDefinition, endpointName, queryArgs }) => {
        const args: Partial<IListAlbumsFilters> = queryArgs ? { ...queryArgs } : {};
        delete args.page;
        return defaultSerializeQueryArgs({ endpointDefinition, endpointName, queryArgs: args });
      },
      merge: (currentCache, newItems) => {
        const { selectAll } = albumsAdapter.getSelectors();
        return albumsAdapter.upsertMany(currentCache, selectAll(newItems));
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: [{ type: 'Albums', id: 'list' }],
      transformResponse: (data: { items: IAlbumsSchema[] }) =>
        albumsAdapter.setAll(initialState, data.items.map(toAlbum)),
    }),

    listAlbumItems: builder.query<EntityState<IMediaItem, string>, IListAlbumItemsFilters>({
      query: (filters) => ({
        url: `/photos/albums/${filters.albumSlug}/items`,
        method: 'GET',
        params: {
          page: filters?.page,
          page_size: filters?.pageSize,
          favourites: filters?.favourites,
        },
      }),
      serializeQueryArgs: ({ endpointDefinition, endpointName, queryArgs }) => {
        const args: Partial<IListAlbumItemsFilters> = queryArgs ? { ...queryArgs } : {};
        delete args.page;
        return defaultSerializeQueryArgs({ endpointDefinition, endpointName, queryArgs: args });
      },
      merge: (currentCache, newItems) => {
        const { selectAll } = albumItemsAdapter.getSelectors();
        return albumItemsAdapter.upsertMany(currentCache, selectAll(newItems));
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: (_result, _error, arg) => [{ type: 'AlbumItems', id: arg.albumSlug }],
      transformResponse: (data: { items: IAlbumItemSchema[] }) =>
        albumItemsAdapter.setAll(albumItemsInitialState, data.items.map(toMediaItem)),
    }),
  }),
});

export const {
  useCreateAlbumMutation,
  useGetAlbumQuery,
  useListAlbumsQuery,
  useListAlbumItemsQuery,
} = albumsApi;

export const selectListAlbumsData = createSelector(
  [(state: RootState) => state, (state: RootState, filters: IListAlbumsFilters) => filters],
  (state, filters) => albumsApi.endpoints.listAlbums.select(filters)(state).data ?? initialState,
);

export const selectListAlbumItemsData = createSelector(
  [(state: RootState) => state, (state: RootState, filters: IListAlbumItemsFilters) => filters],
  (state, filters) =>
    albumsApi.endpoints.listAlbumItems.select(filters)(state).data ?? initialState,
);
