import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';

import type { IAlbum, IMediaItem } from 'types/photos';

import apiSlice from './apiSlice';
import { toMediaItem, type MediaItemSchema } from './mediaItems';
import type { RootState } from './store';

const ALBUMS_PAGE_SIZE = 100;
const ALBUM_ITEMS_PAGE_SIZE = 250;

interface IAlbumsSchema {
  id: string;
  slug: string;
  title: string;
  items_count: number;
  created_at: string;
  cover: {
    media_item_id: string;
    thumbnail_url: string | null;
  } | null;
}

interface IListAlbumItemsFilters {
  albumSlug: string;
  page?: number;
  pageSize?: number;
}

function toAlbum(schema: IAlbumsSchema): IAlbum {
  const { id, slug, title, items_count: itemsCount, created_at: createdAt } = schema;
  let cover = null;
  if (schema.cover != null) {
    cover = {
      mediaItemId: schema.cover.media_item_id,
      thumbnailUrl: schema.cover.thumbnail_url,
    };
  }
  return { id, slug, title, cover, itemsCount, createdAt };
}

export const albumsAdapter = createEntityAdapter({
  selectId: (album: IAlbum) => album.slug,
  sortComparer: (a: IAlbum, b: IAlbum) => a.title.localeCompare(b.title),
});
export const albumItemsAdapter = createEntityAdapter<IMediaItem>({});

const albumsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addAlbumItems: builder.mutation<IAlbum, { albumSlug: string; mediaItemIds: string[] }>({
      query: ({ albumSlug, mediaItemIds }) => ({
        url: `/photos/albums/${albumSlug}/items`,
        method: 'PUT',
        body: {
          media_item_ids: mediaItemIds,
        },
      }),
      invalidatesTags: (_result, _error, { albumSlug }) => [
        { type: 'Albums', id: `albumItems:${albumSlug}` },
      ],
      transformResponse: (data: IAlbumsSchema) => toAlbum(data),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            albumsApi.util.updateQueryData('listAlbums', undefined, (draft) => {
              draft.pages = draft.pages.map((page) =>
                page.map((album) => (album.slug === data.slug ? data : album)),
              );
            }),
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
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            albumsApi.util.updateQueryData('listAlbums', undefined, (draft) => {
              if (draft.pages.length > 0) {
                const page = [...draft.pages[0]];
                const idx = page.findIndex((a) => data.title.localeCompare(a.title) < 0);
                page.splice(idx === -1 ? page.length : idx, 0, data);
                draft.pages[0] = page;
              }
            }),
          );
        } catch {
          /* empty */
        }
      },
    }),

    deleteAlbum: builder.mutation<IAlbum, string>({
      query: (albumSlug) => ({
        url: `/photos/albums/${albumSlug}`,
        method: 'DELETE',
      }),
      transformResponse: (data: IAlbumsSchema) => toAlbum(data),
      async onQueryStarted(albumSlug, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          albumsApi.util.updateQueryData('listAlbums', undefined, (draft) => {
            draft.pages = draft.pages.map((page) =>
              page.filter((album) => album.slug !== albumSlug),
            );
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    getAlbum: builder.query<IAlbum, string>({
      query: (albumSlug) => ({
        url: `/photos/albums/${albumSlug}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, albumSlug) => [{ type: 'Albums', id: albumSlug }],
      transformResponse: (data: IAlbumsSchema) => toAlbum(data),
    }),

    listAlbums: builder.infiniteQuery<IAlbum[], undefined, number>({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage, _allPages, lastPageParam) =>
          lastPage.length < ALBUMS_PAGE_SIZE ? undefined : lastPageParam + 1,
      },
      query: ({ pageParam }) => ({
        url: '/photos/albums',
        method: 'GET',
        params: {
          page: pageParam,
          page_size: ALBUMS_PAGE_SIZE,
        },
      }),
      providesTags: [{ type: 'Albums', id: 'list' }],
      transformResponse: (data: { items: IAlbumsSchema[] }) => data.items.map(toAlbum),
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
        },
      }),
      providesTags: (_result, _error, { albumSlug }) => [
        { type: 'Albums', id: `albumItems:${albumSlug}` },
      ],
      transformResponse: (data: { items: MediaItemSchema[] }) => data.items.map(toMediaItem),
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
          albumsApi.util.updateQueryData('listAlbums', undefined, (draft) => {
            draft.pages = draft.pages.map((page) =>
              page.map((album) => (album.slug === albumSlug ? { ...album, cover: null } : album)),
            );
          }),
        );
        try {
          const { data } = await queryFulfilled;
          dispatch(
            albumsApi.util.updateQueryData('listAlbums', undefined, (draft) => {
              draft.pages = draft.pages.map((page) =>
                page.map((album) => (album.slug === data.slug ? data : album)),
              );
            }),
          );
          dispatch(albumsApi.util.updateQueryData('getAlbum', data.slug, () => data));
        } catch {
          patchResult.undo();
        }
      },
    }),

    removeAlbumItems: builder.mutation<IAlbum, { albumSlug: string; mediaItemIds: string[] }>({
      query: ({ albumSlug, mediaItemIds }) => ({
        url: `/photos/albums/${albumSlug}/items`,
        method: 'DELETE',
        body: {
          media_item_ids: mediaItemIds,
        },
      }),
      transformResponse: (data: IAlbumsSchema) => toAlbum(data),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { albumSlug, mediaItemIds } = arg;
        const listAlbumItemsPatchResult = dispatch(
          albumsApi.util.updateQueryData('listAlbumItems', { albumSlug }, (draft) => {
            if (draft?.pages) {
              draft.pages = draft.pages.map((page: IMediaItem[]) =>
                page.filter((item) => !mediaItemIds.includes(item.id)),
              );
            }
          }),
        );

        try {
          const { data } = await queryFulfilled;
          dispatch(
            albumsApi.util.updateQueryData('listAlbums', undefined, (draft) => {
              draft.pages = draft.pages.map((page) =>
                page.map((album) => (album.slug === data.slug ? data : album)),
              );
            }),
          );
          dispatch(albumsApi.util.updateQueryData('getAlbum', albumSlug, () => data));
        } catch {
          listAlbumItemsPatchResult.undo();
        }
      },
    }),

    setAlbumCover: builder.mutation<IAlbum, { albumSlug: string; mediaItemId: string }>({
      query: ({ albumSlug, mediaItemId }) => ({
        url: `/photos/albums/${albumSlug}/cover`,
        method: 'PUT',
        body: { media_item_id: mediaItemId },
      }),
      transformResponse: (data: IAlbumsSchema) => toAlbum(data),
      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
        const { albumSlug, mediaItemId } = arg;

        let thumbnailUrl: string | null = null;
        const albumItemsState = albumsApi.endpoints.listAlbumItems.select({ albumSlug })(
          getState(),
        );
        if (albumItemsState?.data?.pages) {
          const allItems = albumItemsState.data.pages.flat();
          const mediaItem = allItems.find((item) => item.id === mediaItemId);
          if (mediaItem) {
            thumbnailUrl = mediaItem.thumbnailUrl ?? null;
          }
        }

        const patchResult = dispatch(
          albumsApi.util.updateQueryData('listAlbums', undefined, (draft) => {
            draft.pages = draft.pages.map((page) =>
              page.map((album) =>
                album.slug === albumSlug
                  ? { ...album, cover: { mediaItemId, thumbnailUrl } }
                  : album,
              ),
            );
          }),
        );
        const patchGetAlbumResult = dispatch(
          albumsApi.util.updateQueryData('getAlbum', albumSlug, (draft) => {
            if (draft) {
              return { ...draft, cover: { mediaItemId, thumbnailUrl } };
            }
            return draft;
          }),
        );

        try {
          const { data } = await queryFulfilled;
          dispatch(
            albumsApi.util.updateQueryData('listAlbums', undefined, (draft) => {
              draft.pages = draft.pages.map((page) =>
                page.map((album) => (album.slug === data.slug ? data : album)),
              );
            }),
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
          albumsApi.util.updateQueryData('listAlbums', undefined, (draft) => {
            draft.pages = draft.pages.map((page) =>
              page.map((album) => (album.slug === albumSlug ? { ...album, title } : album)),
            );
          }),
        );

        try {
          const { data } = await queryFulfilled;
          dispatch(
            albumsApi.util.updateQueryData('listAlbums', undefined, (draft) => {
              draft.pages = draft.pages.map((page) =>
                page.map((album) => (album.slug === albumSlug ? data : album)),
              );
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
  useListAlbumsInfiniteQuery,
  useListAlbumItemsInfiniteQuery,
  useRemoveAlbumCoverMutation,
  useRemoveAlbumItemsMutation,
  useSetAlbumCoverMutation,
  useUpdateAlbumMutation,
} = albumsApi;

const selectListAlbumsResult = albumsApi.endpoints.listAlbums.select(undefined);

const selectAlbumsLookupMap = createSelector(
  (state: RootState) => selectListAlbumsResult(state).data,
  (data): Map<string, IAlbum> => {
    const map = new Map<string, IAlbum>();
    data?.pages.flat().forEach((album) => map.set(album.slug, album));
    return map;
  },
);

export const selectAlbumBySlug = (state: RootState, slug: string): IAlbum | undefined =>
  selectAlbumsLookupMap(state).get(slug);
