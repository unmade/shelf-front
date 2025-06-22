import { EntityState, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { defaultSerializeQueryArgs } from '@reduxjs/toolkit/query';

import { IAlbum, IMediaItem } from 'types/photos';

import apiSlice from './apiSlice';
import { RootState } from './store';

const ALBUM_ITEMS_PAGE_SIZE = 250;

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

export interface IListAlbumItemsFilters {
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
const albumInitialState = albumsAdapter.getInitialState();

export const albumItemsAdapter = createEntityAdapter<IMediaItem>({});

export const albumsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addAlbumItems: builder.mutation<void, { albumSlug: string; fileIds: string[] }>({
      query: ({ albumSlug, fileIds }) => ({
        url: `/photos/albums/${albumSlug}/items`,
        method: 'PUT',
        body: {
          file_ids: fileIds,
        },
      }),
    }),

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
        albumsAdapter.setAll(albumInitialState, data.items.map(toAlbum)),
    }),

    listAlbumItems: builder.infiniteQuery<IMediaItem[], IListAlbumItemsFilters, number>({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams, queryArg) => {
          if (!lastPage.length) {
            return undefined;
          }
          if (lastPage.length < (queryArg.pageSize ?? ALBUM_ITEMS_PAGE_SIZE)) {
            return undefined;
          }
          return lastPageParam + 1;
        },
      },
      query: ({ queryArg, pageParam }) => ({
        url: `/photos/albums/${queryArg.albumSlug}/items`,
        method: 'GET',
        params: {
          page: pageParam,
          page_size: queryArg?.pageSize ?? ALBUM_ITEMS_PAGE_SIZE,
          favourites: queryArg?.favourites,
        },
      }),
      transformResponse: (data: { items: IAlbumItemSchema[] }) => data.items.map(toMediaItem),
    }),
  }),
});

export const {
  useAddAlbumItemsMutation,
  useCreateAlbumMutation,
  useGetAlbumQuery,
  useListAlbumsQuery,
  useListAlbumItemsInfiniteQuery,
} = albumsApi;

export const selectListAlbumsData = createSelector(
  [(state: RootState) => state, (state: RootState, filters: IListAlbumsFilters) => filters],
  (state: RootState, filters: IListAlbumsFilters) =>
    albumsApi.endpoints.listAlbums.select(filters)(state).data ?? albumInitialState,
);
