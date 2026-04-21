import type { EntityState } from '@reduxjs/toolkit';
import { createAsyncThunk, createEntityAdapter, createSelector, nanoid } from '@reduxjs/toolkit';
import { defaultSerializeQueryArgs } from '@reduxjs/toolkit/query';

import type { IMediaItem } from 'types/photos';

import type { RootState } from 'store/store';

import type { DataExifSchema } from '@/types/Exif';

import apiSlice, { API_BASE_URL } from './apiSlice';

export interface MediaItemSchema {
  id: string;
  name: string;
  size: number;
  media_type: string;
  thumbnail_url: string | null;
  taken_at: string | null;
  created_at: string;
  modified_at: string;
  deleted_at: string | null;
}

interface IMediaItemCategorySchema {
  name: string;
  origin: 'auto' | 'user';
  probability: number;
}

interface IListMediaItemFilters {
  favourites?: boolean;
  page?: number;
  pageSize?: number;
}

interface ICountMediaItemsResponse {
  total: number;
  deleted: number;
}

interface IListFavouriteMediaItemsResponse {
  ids: string[];
}

interface IListMediaItemCategoriesSchemaResponse {
  media_item_id: string;
  categories: IMediaItemCategorySchema[];
}

interface IListMediaItemCategoriesResponse {
  mediaItemId: string;
  categories: IMediaItemCategorySchema[];
}

interface MediaItemContentMetadataSchema {
  media_item_id: string;
  data: DataExifSchema;
}

export function toMediaItem(schema: MediaItemSchema): IMediaItem {
  return {
    id: schema.id,
    name: schema.name,
    size: schema.size,
    mediaType: schema.media_type,
    thumbnailUrl: schema.thumbnail_url,
    takenAt: schema.taken_at,
    createdAt: schema.created_at,
    modifiedAt: schema.modified_at,
    deletedAt: schema.deleted_at,
  };
}

export const mediaItemsAdapter = createEntityAdapter<IMediaItem>({
  sortComparer: (a, b) => Date.parse(b.modifiedAt) - Date.parse(a.modifiedAt),
});
const initialState = mediaItemsAdapter.getInitialState();

export const photosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    countMediaItems: builder.query<ICountMediaItemsResponse, undefined>({
      query: () => ({
        url: '/photos/media_items/count',
        method: 'GET',
      }),
      keepUnusedDataFor: Number.MAX_SAFE_INTEGER,
    }),

    deleteMediaItems: builder.mutation<{ items: MediaItemSchema[] }, string[]>({
      query: (mediaItemIds) => ({
        url: '/photos/media_items/delete_batch',
        method: 'POST',
        body: { ids: mediaItemIds },
      }),
      async onQueryStarted(mediaItemIds, { dispatch, queryFulfilled, getState }) {
        const patches: { undo: () => void }[] = [];

        for (const { endpointName, originalArgs } of photosApi.util.selectInvalidatedBy(
          getState(),
          [
            { type: 'MediaItems', id: 'list' },
            { type: 'MediaItems', id: 'listFavourites' },
          ],
        )) {
          if (endpointName === 'listMediaItems') {
            patches.push(
              dispatch(
                photosApi.util.updateQueryData(endpointName, originalArgs, (draft) => {
                  mediaItemsAdapter.removeMany(draft, mediaItemIds);
                }),
              ),
            );
          }
        }

        patches.push(
          dispatch(
            photosApi.util.updateQueryData('countMediaItems', undefined, (draft) => {
              if (draft.deleted != null) {
                draft.deleted += mediaItemIds.length;
              }
              if (draft.total != null) {
                draft.total -= mediaItemIds.length;
              }
            }),
          ),
        );

        try {
          const { data } = await queryFulfilled;
          dispatch(
            photosApi.util.updateQueryData('listDeletedMediaItems', undefined, (draft) => {
              mediaItemsAdapter.addMany(draft, data.items.map(toMediaItem));
            }),
          );
        } catch {
          patches.forEach((patch) => {
            patch.undo();
          });
        }
      },
    }),

    deleteMediaItemsImmediately: builder.mutation<void, string[]>({
      query: (mediaItemIds) => ({
        url: '/photos/media_items/delete_immediately_batch',
        method: 'POST',
        body: { ids: mediaItemIds },
      }),
      async onQueryStarted(mediaItemIds, { dispatch, queryFulfilled }) {
        const patches: { undo: () => void }[] = [
          dispatch(
            photosApi.util.updateQueryData('listDeletedMediaItems', undefined, (draft) => {
              mediaItemsAdapter.removeMany(draft, mediaItemIds);
            }),
          ),
          dispatch(
            photosApi.util.updateQueryData('countMediaItems', undefined, (draft) => {
              if (draft.deleted != null) {
                draft.deleted -= mediaItemIds.length;
              }
            }),
          ),
        ];

        try {
          await queryFulfilled;
        } catch {
          patches.forEach((patch) => {
            patch.undo();
          });
        }
      },
    }),

    listMediaItems: builder.query<
      EntityState<IMediaItem, string>,
      IListMediaItemFilters | undefined
    >({
      query: (filters) => ({
        url: '/photos/media_items/list',
        method: 'GET',
        params: {
          page: filters?.page,
          page_size: filters?.pageSize,
          favourites: filters?.favourites,
        },
      }),
      serializeQueryArgs: ({ endpointDefinition, endpointName, queryArgs }) => {
        const args: Partial<IListMediaItemFilters> = queryArgs ? { ...queryArgs } : {};
        delete args.page;
        return defaultSerializeQueryArgs({ endpointDefinition, endpointName, queryArgs: args });
      },
      merge: (currentCache, newItems) => {
        const { selectAll } = mediaItemsAdapter.getSelectors();
        return mediaItemsAdapter.upsertMany(currentCache, selectAll(newItems));
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: (_result, _error, arg) => [
        { type: 'MediaItems', id: arg?.favourites ? 'listFavourites' : 'list' },
      ],
      transformResponse: (data: { items: MediaItemSchema[] }) =>
        mediaItemsAdapter.setAll(initialState, data.items.map(toMediaItem)),
    }),

    listDeletedMediaItems: builder.query<EntityState<IMediaItem, string>, undefined>({
      query: () => ({
        url: '/photos/media_items/list_deleted',
        method: 'GET',
      }),
      transformResponse: (data: { items: MediaItemSchema[] }) =>
        mediaItemsAdapter.setAll(initialState, data.items.map(toMediaItem)),
    }),

    listFavouriteMediaItemIds: builder.query<string[], undefined>({
      query: () => ({
        url: '/photos/media_items/favourites/list',
        method: 'GET',
      }),
      keepUnusedDataFor: Number.MAX_SAFE_INTEGER,
      transformResponse: (data: IListFavouriteMediaItemsResponse) => data.ids,
    }),

    getMediaItemContentMetadata: builder.query<MediaItemContentMetadataSchema, string>({
      query: (mediaItemId) => ({
        url: '/photos/media_items/get_content_metadata',
        method: 'POST',
        body: { media_item_id: mediaItemId },
      }),
    }),

    listMediaItemCategories: builder.query<IListMediaItemCategoriesResponse, string>({
      query: (mediaItemId) => ({
        url: '/photos/media_items/list_categories',
        method: 'POST',
        body: { media_item_id: mediaItemId },
      }),
      transformResponse: (data: IListMediaItemCategoriesSchemaResponse) => ({
        mediaItemId: data.media_item_id,
        categories: data.categories,
      }),
    }),

    markFavouriteMediaItems: builder.mutation<void, string[]>({
      query: (mediaItemIds) => ({
        url: '/photos/media_items/favourites/mark_batch',
        method: 'POST',
        body: { ids: mediaItemIds },
      }),
      invalidatesTags: [{ type: 'MediaItems', id: 'listFavourites' }],
      async onQueryStarted(mediaItemIds, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          photosApi.util.updateQueryData('listFavouriteMediaItemIds', undefined, (draft) => {
            const ids = new Set(draft);
            mediaItemIds.forEach((id) => ids.add(id));
            return Array.from(ids);
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    purgeMediaItems: builder.mutation<void, void>({
      query: () => ({
        url: '/photos/media_items/purge',
        method: 'POST',
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const listDeletedPatchResult = dispatch(
          photosApi.util.updateQueryData('listDeletedMediaItems', undefined, (draft) => {
            mediaItemsAdapter.removeAll(draft);
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          listDeletedPatchResult.undo();
        }
      },
    }),

    restoreMediaItems: builder.mutation<{ items: MediaItemSchema[] }, string[]>({
      query: (mediaItemIds) => ({
        url: '/photos/media_items/restore_batch',
        method: 'POST',
        body: { ids: mediaItemIds },
      }),
      async onQueryStarted(mediaItemIds, { dispatch, queryFulfilled, getState }) {
        const patches: { undo: () => void }[] = [
          dispatch(
            photosApi.util.updateQueryData('listDeletedMediaItems', undefined, (draft) => {
              mediaItemsAdapter.removeMany(draft, mediaItemIds);
            }),
          ),
          dispatch(
            photosApi.util.updateQueryData('countMediaItems', undefined, (draft) => {
              if (draft.deleted != null) {
                draft.deleted -= mediaItemIds.length;
              }
              if (draft.total != null) {
                draft.total += mediaItemIds.length;
              }
            }),
          ),
        ];

        try {
          const { data } = await queryFulfilled;

          for (const { endpointName, originalArgs } of photosApi.util.selectInvalidatedBy(
            getState(),
            [
              { type: 'MediaItems', id: 'list' },
              { type: 'MediaItems', id: 'listFavourites' },
            ],
          )) {
            if (endpointName === 'listMediaItems') {
              dispatch(
                photosApi.util.updateQueryData(endpointName, originalArgs, (draft) => {
                  mediaItemsAdapter.upsertMany(draft, data.items.map(toMediaItem));
                }),
              );
            }
          }
        } catch {
          patches.forEach((patch) => {
            patch.undo();
          });
        }
      },
    }),

    setMediaItemCategories: builder.mutation<void, { mediaItemId: string; categories: string[] }>({
      query: ({ mediaItemId, categories }) => ({
        url: '/photos/media_items/set_categories',
        method: 'POST',
        body: { media_item_id: mediaItemId, categories },
      }),
      async onQueryStarted({ mediaItemId, categories }, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(
          photosApi.util.updateQueryData('listMediaItemCategories', mediaItemId, () => ({
            mediaItemId,
            categories: categories.map((name) => ({
              name,
              origin: 'user' as const,
              probability: 100,
            })),
          })),
        );
      },
    }),

    unmarkFavouriteMediaItems: builder.mutation<void, string[]>({
      query: (mediaItemIds) => ({
        url: '/photos/media_items/favourites/unmark_batch',
        method: 'POST',
        body: { ids: mediaItemIds },
      }),
      invalidatesTags: [{ type: 'MediaItems', id: 'listFavourites' }],
      async onQueryStarted(mediaItemIds, { dispatch, queryFulfilled, getState }) {
        const mediaItemIdSet = new Set(mediaItemIds);
        const patches: { undo: () => void }[] = [
          dispatch(
            photosApi.util.updateQueryData('listFavouriteMediaItemIds', undefined, (draft) =>
              draft.filter((id) => !mediaItemIdSet.has(id)),
            ),
          ),
        ];

        for (const { endpointName, originalArgs } of photosApi.util.selectInvalidatedBy(
          getState(),
          [{ type: 'MediaItems', id: 'listFavourites' }],
        )) {
          if (endpointName === 'listMediaItems') {
            patches.push(
              dispatch(
                photosApi.util.updateQueryData(endpointName, originalArgs, (draft) => {
                  mediaItemsAdapter.removeMany(draft, mediaItemIds);
                }),
              ),
            );
          }
        }

        try {
          await queryFulfilled;
        } catch {
          patches.forEach((patch) => {
            patch.undo();
          });
        }
      },
    }),
  }),
});

export const {
  useCountMediaItemsQuery,
  useDeleteMediaItemsMutation,
  useDeleteMediaItemsImmediatelyMutation,
  useGetMediaItemContentMetadataQuery,
  useListDeletedMediaItemsQuery,
  useListFavouriteMediaItemIdsQuery,
  useListMediaItemsQuery,
  useListMediaItemCategoriesQuery,
  useMarkFavouriteMediaItemsMutation,
  usePurgeMediaItemsMutation,
  useRestoreMediaItemsMutation,
  useSetMediaItemCategoriesMutation,
  useUnmarkFavouriteMediaItemsMutation,
} = photosApi;

export const selectListMediaItemsData = createSelector(
  [(state: RootState) => state, (_state: RootState, filters: IListMediaItemFilters) => filters],
  (state, filters) =>
    photosApi.endpoints.listMediaItems.select(filters)(state).data ?? initialState,
);

const createListDeletedMediaItemsSelector =
  photosApi.endpoints.listDeletedMediaItems.select(undefined);

export const { selectById: selectDeletedMediaItemById } = mediaItemsAdapter.getSelectors(
  (state: RootState) => createListDeletedMediaItemsSelector(state).data ?? initialState,
);

const emptyFavouriteIds: string[] = [];
const emptyFavouriteIdSet = new Set<string>();
const selectListFavouriteMediaItemIdsResult =
  photosApi.endpoints.listFavouriteMediaItemIds.select(undefined);

export const selectFavouriteMediaItemIds = createSelector(
  selectListFavouriteMediaItemIdsResult,
  (result) => result.data ?? emptyFavouriteIds,
);

export const selectFavouriteMediaItemIdSet = createSelector(selectFavouriteMediaItemIds, (ids) =>
  ids.length ? new Set(ids) : emptyFavouriteIdSet,
);

export const selectIsFavouriteMediaItem = (state: RootState, mediaItemId: string) =>
  selectFavouriteMediaItemIdSet(state).has(mediaItemId);

export const downloadMediaItemsBatch = createAsyncThunk(
  'mediaItems/download_batch',
  async (mediaItemIds: string[], { getState }) => {
    const { accessToken } = (getState() as RootState).auth;

    const response = await fetch(`${API_BASE_URL}/photos/media_items/get_download_url`, {
      method: 'POST',
      mode: 'cors',
      cache: 'default',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Request-ID': nanoid(),
      }),
      body: JSON.stringify({ file_ids: mediaItemIds }),
    });

    if (!response.ok) {
      return;
    }

    const data = (await response.json()) as { download_url?: string };

    if (!data.download_url) {
      return;
    }

    const link = document.createElement('a');
    link.href = data.download_url;
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  },
);
