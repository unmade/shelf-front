import type { EntityState } from '@reduxjs/toolkit';
import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { defaultSerializeQueryArgs } from '@reduxjs/toolkit/query';

import type { IAlbum, IMediaItem } from 'types/photos';

import apiSlice from './apiSlice';
import type { RootState } from './store';

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
  sortComparer: (a: IAlbum, b: IAlbum) => a.title.localeCompare(b.title),
});
const albumInitialState = albumsAdapter.getInitialState();

export const albumItemsAdapter = createEntityAdapter<IMediaItem>({});

export const albumsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addAlbumItems: builder.mutation<IAlbum, { albumSlug: string; fileIds: string[] }>({
      query: ({ albumSlug, fileIds }) => ({
        url: `/photos/albums/${albumSlug}/items`,
        method: 'PUT',
        body: {
          file_ids: fileIds,
        },
      }),
      invalidatesTags: (_result, _error, { albumSlug }) => [
        { type: 'Albums', id: `albumItems:${albumSlug}` },
      ],
      transformResponse: (data: IAlbumsSchema) => toAlbum(data),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            albumsApi.util.updateQueryData('listAlbums', { pageSize: 100 }, (draft) =>
              albumsAdapter.updateOne(draft, {
                id: data.slug,
                changes: data,
              }),
            ),
          );

          dispatch(albumsApi.util.updateQueryData('getAlbum', data.slug, () => data));
        } catch {
          /* empty */
        }
      },
    }),

    createAlbum: builder.mutation<IAlbum, { title: string }>({
      query: ({ title }) => ({
        url: '/photos/albums',
        method: 'POST',
        body: { title },
      }),
      transformResponse: (data: IAlbumsSchema) => toAlbum(data),
    }),

    deleteAlbum: builder.mutation<IAlbum, string>({
      query: (albumSlug) => ({
        url: `/photos/albums/${albumSlug}`,
        method: 'DELETE',
      }),
      transformResponse: (data: IAlbumsSchema) => toAlbum(data),
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
      providesTags: (_result, _error, { albumSlug }) => [
        { type: 'Albums', id: `albumItems:${albumSlug}` },
      ],
      transformResponse: (data: { items: IAlbumItemSchema[] }) => data.items.map(toMediaItem),
    }),

    removeAlbumCover: builder.mutation<IAlbum, { albumSlug: string }>({
      query: ({ albumSlug }) => ({
        url: `/photos/albums/${albumSlug}/cover`,
        method: 'DELETE',
      }),
      transformResponse: (data: IAlbumsSchema) => toAlbum(data),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { albumSlug } = arg;
        const patchResult = dispatch(
          albumsApi.util.updateQueryData('listAlbums', { pageSize: 100 }, (draft) =>
            albumsAdapter.updateOne(draft, {
              id: albumSlug,
              changes: { cover: null },
            }),
          ),
        );
        try {
          const { data } = await queryFulfilled;
          dispatch(
            albumsApi.util.updateQueryData('listAlbums', { pageSize: 100 }, (draft) =>
              albumsAdapter.updateOne(draft, {
                id: data.slug,
                changes: data,
              }),
            ),
          );
          dispatch(albumsApi.util.updateQueryData('getAlbum', data.slug, () => data));
        } catch {
          patchResult.undo();
        }
      },
    }),

    removeAlbumItems: builder.mutation<IAlbum, { albumSlug: string; fileIds: string[] }>({
      query: ({ albumSlug, fileIds }) => ({
        url: `/photos/albums/${albumSlug}/items`,
        method: 'DELETE',
        body: {
          file_ids: fileIds,
        },
      }),
      transformResponse: (data: IAlbumsSchema) => toAlbum(data),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { albumSlug, fileIds } = arg;
        const listAlbumItemsPatchResult = dispatch(
          albumsApi.util.updateQueryData('listAlbumItems', { albumSlug }, (draft) => {
            if (draft?.pages) {
              draft.pages = draft.pages.map((page: IMediaItem[]) =>
                page.filter((item) => !fileIds.includes(item.fileId)),
              );
            }
          }),
        );

        try {
          const { data } = await queryFulfilled;
          dispatch(
            albumsApi.util.updateQueryData('listAlbums', { pageSize: 100 }, (draft) =>
              albumsAdapter.updateOne(draft, {
                id: data.slug,
                changes: data,
              }),
            ),
          );
          dispatch(albumsApi.util.updateQueryData('getAlbum', albumSlug, () => data));
        } catch {
          listAlbumItemsPatchResult.undo();
        }
      },
    }),

    setAlbumCover: builder.mutation<IAlbum, { albumSlug: string; fileId: string }>({
      query: ({ albumSlug, fileId }) => ({
        url: `/photos/albums/${albumSlug}/cover`,
        method: 'PUT',
        body: { file_id: fileId },
      }),
      transformResponse: (data: IAlbumsSchema) => toAlbum(data),
      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
        const { albumSlug, fileId } = arg;

        let thumbnailUrl: string | null = null;
        const albumItemsState = albumsApi.endpoints.listAlbumItems.select({ albumSlug })(
          getState(),
        );
        if (albumItemsState?.data?.pages) {
          const allItems = albumItemsState.data.pages.flat();
          const mediaItem = allItems.find((item) => item.fileId === fileId);
          if (mediaItem) {
            thumbnailUrl = mediaItem.thumbnailUrl ?? null;
          }
        }

        const patchResult = dispatch(
          albumsApi.util.updateQueryData('listAlbums', { pageSize: 100 }, (draft) =>
            albumsAdapter.updateOne(draft, {
              id: albumSlug,
              changes: { cover: { fileId, thumbnailUrl } },
            }),
          ),
        );
        const patchGetAlbumResult = dispatch(
          albumsApi.util.updateQueryData('getAlbum', albumSlug, (draft) => {
            if (draft) {
              return { ...draft, cover: { fileId, thumbnailUrl } };
            }
            return draft;
          }),
        );

        try {
          const { data } = await queryFulfilled;
          dispatch(
            albumsApi.util.updateQueryData('listAlbums', { pageSize: 100 }, (draft) =>
              albumsAdapter.updateOne(draft, {
                id: data.slug,
                changes: data,
              }),
            ),
          );
          dispatch(albumsApi.util.updateQueryData('getAlbum', data.slug, () => data));
        } catch {
          patchResult.undo();
          patchGetAlbumResult.undo();
        }
      },
    }),

    updateAlbum: builder.mutation<IAlbum, { albumSlug: string; title: string }>({
      query: ({ albumSlug, title }) => ({
        url: `/photos/albums/${albumSlug}`,
        method: 'PATCH',
        body: { title },
      }),
      transformResponse: (data: IAlbumsSchema) => toAlbum(data),
      invalidatesTags: (_result, _error, { albumSlug }) => [{ type: 'Albums', id: albumSlug }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { albumSlug, title } = arg;
        const listAlbumsPatchResult = dispatch(
          albumsApi.util.updateQueryData('listAlbums', { pageSize: 100 }, (draft) =>
            albumsAdapter.updateOne(draft, {
              id: albumSlug,
              changes: { title },
            }),
          ),
        );

        try {
          const { data } = await queryFulfilled;
          dispatch(
            albumsApi.util.updateQueryData('listAlbums', { pageSize: 100 }, (draft) => {
              albumsAdapter.removeOne(draft, albumSlug);
              albumsAdapter.addOne(draft, data);
            }),
          );
          dispatch(albumsApi.util.updateQueryData('getAlbum', data.slug, () => data));
        } catch {
          listAlbumsPatchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useAddAlbumItemsMutation,
  useCreateAlbumMutation,
  useDeleteAlbumMutation,
  useGetAlbumQuery,
  useListAlbumsQuery,
  useListAlbumItemsInfiniteQuery,
  useRemoveAlbumCoverMutation,
  useRemoveAlbumItemsMutation,
  useSetAlbumCoverMutation,
  useUpdateAlbumMutation,
} = albumsApi;

export const selectListAlbumsData = createSelector(
  [(state: RootState) => state, (state: RootState, filters: IListAlbumsFilters) => filters],
  (state: RootState, filters: IListAlbumsFilters) =>
    albumsApi.endpoints.listAlbums.select(filters)(state).data ?? albumInitialState,
);
