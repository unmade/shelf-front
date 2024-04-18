import { EntityState, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { defaultSerializeQueryArgs } from '@reduxjs/toolkit/query';

import { IAlbum } from 'types/photos';

import apiSlice from './apiSlice';
import { RootState } from './store';

interface IAlbumsSchema {
  id: string;
  title: string;
  created_at: string;
  cover: {
    file_id: string;
    thumbnail_url: string | null;
  } | null;
}

interface IListAlbumsFilters {
  page?: number;
  pageSize?: number;
}

function toAlbum(schema: IAlbumsSchema): IAlbum {
  const { id, title, created_at: createdAt } = schema;
  let cover = null;
  if (schema.cover != null) {
    cover = {
      fileId: schema.cover.file_id,
      thumbnailUrl: schema.cover.thumbnail_url,
    };
  }
  return { id, title, createdAt, cover };
}

export const albumsAdapter = createEntityAdapter<IAlbum>();
const initialState = albumsAdapter.getInitialState();

export const albumsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAlbum: builder.mutation<IAlbum, { title: string }>({
      query: ({ title }) => ({
        url: '/photos/albums/create',
        method: 'POST',
        body: { title },
      }),
    }),
    listAlbums: builder.query<EntityState<IAlbum, string>, IListAlbumsFilters | undefined>({
      query: (filters) => ({
        url: '/photos/albums/list',
        method: 'GET',
        params: {
          page: filters?.page,
          page_size: filters?.pageSize,
        },
      }),
      serializeQueryArgs: ({ endpointDefinition, endpointName, queryArgs }) => {
        const args = queryArgs ? { ...queryArgs } : {};
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
  }),
});

export const { useCreateAlbumMutation, useListAlbumsQuery } = albumsApi;

export const selectListAlbumsData = createSelector(
  [(state: RootState) => state, (state: RootState, filters: IListAlbumsFilters) => filters],
  (state, filters) => albumsApi.endpoints.listAlbums.select(filters)(state).data ?? initialState,
);
