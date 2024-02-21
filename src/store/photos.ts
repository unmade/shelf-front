import { EntityState, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { defaultSerializeQueryArgs } from '@reduxjs/toolkit/query';

import { IMediaItem, IMediaItemSharedLink } from 'types/photos';

import { RootState } from 'store/store';

import apiSlice from './apiSlice';

interface IMediaItemSchema {
  file_id: string;
  name: string;
  size: number;
  modified_at: string;
  mediatype: string;
  thumbnail_url: string;
  deleted_at: string;
}

interface IMediaItemCategorySchema {
  name: string;
  origin: 'auto' | 'user';
  probability: number;
}

interface ISharedLinkSchema {
  token: string;
  created_at: string;
  item: IMediaItemSchema;
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

interface IListMediaItemCategoriesResponse {
  file_id: string;
  categories: IMediaItemCategorySchema[];
}

function toMediaItem(schema: IMediaItemSchema): IMediaItem {
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

function toSharedLink(schema: ISharedLinkSchema): IMediaItemSharedLink {
  return {
    token: schema.token,
    createdAt: schema.created_at,
    item: toMediaItem(schema.item),
  };
}

export const mediaItemsAdapter = createEntityAdapter<IMediaItem>({
  sortComparer: (a, b) => Date.parse(b.modifiedAt) - Date.parse(a.modifiedAt),
});
const initialState = mediaItemsAdapter.getInitialState();

export const sharedLinkAdapter = createEntityAdapter<IMediaItemSharedLink>({
  selectId: (entity) => entity.item.fileId,
});
const sharedLinksInitialState = sharedLinkAdapter.getInitialState();

export const photosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    countMediaItems: builder.query<ICountMediaItemsResponse, undefined>({
      query: () => ({
        url: '/photos/count_media_items',
        method: 'GET',
      }),
      keepUnusedDataFor: Number.MAX_SAFE_INTEGER,
    }),
    deleteMediaItems: builder.mutation({
      query: (fileIds) => ({
        url: '/photos/delete_media_item_batch',
        method: 'POST',
        body: { file_ids: fileIds },
      }),
      async onQueryStarted(fileIds, { dispatch, queryFulfilled, getState }) {
        const patches = [];
        // eslint-disable-next-line no-restricted-syntax
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
                  mediaItemsAdapter.removeMany(draft, fileIds);
                }),
              ),
            );
          }
        }
        patches.push(
          dispatch(
            photosApi.util.updateQueryData('listMediaItemSharedLinks', undefined, (draft) =>
              sharedLinkAdapter.removeMany(draft, fileIds),
            ),
          ),
          dispatch(
            photosApi.util.updateQueryData('countMediaItems', undefined, (draft) => {
              if (draft.deleted != null) {
                // eslint-disable-next-line no-param-reassign
                draft.deleted += 1;
              }
              if (draft.total != null) {
                // eslint-disable-next-line no-param-reassign
                draft.total -= 1;
              }
            }),
          ),
        );
        try {
          const { data } = await queryFulfilled;
          dispatch(
            photosApi.util.updateQueryData('listDeletedMediaItems', undefined, (draft) =>
              mediaItemsAdapter.addMany(draft, data.items.map(toMediaItem)),
            ),
          );
        } catch {
          patches.forEach((patch) => patch.undo());
        }
      },
    }),
    deleteMediaItemsImmediately: builder.mutation({
      query: (fileIds) => ({
        url: '/photos/delete_media_item_immediately_batch',
        method: 'POST',
        body: { file_ids: fileIds },
      }),
      async onQueryStarted(fileIds, { dispatch, queryFulfilled }) {
        const patches = [];
        patches.push(
          dispatch(
            photosApi.util.updateQueryData('listDeletedMediaItems', undefined, (draft) =>
              mediaItemsAdapter.removeMany(draft, fileIds),
            ),
          ),
          dispatch(
            photosApi.util.updateQueryData('countMediaItems', undefined, (draft) => {
              if (draft.deleted != null) {
                // eslint-disable-next-line no-param-reassign
                draft.deleted -= 1;
              }
            }),
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          patches.forEach((patch) => patch.undo());
        }
      },
    }),
    emptyMediaItemsTrash: builder.mutation({
      query: () => ({
        url: '/photos/empty_trash',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const listDeletedPatchResult = dispatch(
          photosApi.util.updateQueryData('listDeletedMediaItems', undefined, (draft) =>
            mediaItemsAdapter.removeAll(draft),
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          listDeletedPatchResult.undo();
        }
      },
    }),
    listDeletedMediaItems: builder.query<EntityState<IMediaItem>, undefined>({
      query: () => ({
        url: '/photos/list_deleted_media_items',
        method: 'GET',
      }),
      transformResponse: (data: { items: IMediaItemSchema[] }) =>
        mediaItemsAdapter.setAll(initialState, data.items.map(toMediaItem)),
    }),
    listMediaItems: builder.query<EntityState<IMediaItem>, IListMediaItemFilters | undefined>({
      query: (filters) => ({
        url: '/photos/list_media_items',
        method: 'GET',
        params: {
          page: filters?.page,
          page_size: filters?.pageSize,
          favourites: filters?.favourites,
        },
      }),
      serializeQueryArgs: ({ endpointDefinition, endpointName, queryArgs }) => {
        const args = queryArgs ? { ...queryArgs } : {};
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
    listMediaItemSharedLinks: builder.query<EntityState<IMediaItemSharedLink>, undefined>({
      query: () => ({
        url: 'photos/list_shared_links',
        method: 'GET',
      }),
      providesTags: () => [{ type: 'MediaItems', id: 'listSharedLinks' }],
      transformResponse: (data: { items: ISharedLinkSchema[] }) =>
        sharedLinkAdapter.setAll(sharedLinksInitialState, data.items.map(toSharedLink)),
    }),
    restoreMediaItems: builder.mutation({
      query: (fileIds) => ({
        url: '/photos/restore_media_item_batch',
        method: 'POST',
        body: { file_ids: fileIds },
      }),
      async onQueryStarted(fileIds, { dispatch, queryFulfilled, getState }) {
        const patches = [];
        patches.push(
          dispatch(
            photosApi.util.updateQueryData('listDeletedMediaItems', undefined, (draft) =>
              mediaItemsAdapter.removeMany(draft, fileIds),
            ),
          ),
          dispatch(
            photosApi.util.updateQueryData('countMediaItems', undefined, (draft) => {
              if (draft.deleted != null) {
                // eslint-disable-next-line no-param-reassign
                draft.deleted -= 1;
              }
              if (draft.total != null) {
                // eslint-disable-next-line no-param-reassign
                draft.total += 1;
              }
            }),
          ),
        );
        try {
          const { data } = await queryFulfilled;
          const items = data.items as IMediaItemSchema[];
          // eslint-disable-next-line no-restricted-syntax
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
                  mediaItemsAdapter.upsertMany(draft, items.map(toMediaItem));
                }),
              );
            }
          }
        } catch {
          patches.forEach((patch) => patch.undo());
        }
      },
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
  useCountMediaItemsQuery,
  useDeleteMediaItemsMutation,
  useDeleteMediaItemsImmediatelyMutation,
  useEmptyMediaItemsTrashMutation,
  useListDeletedMediaItemsQuery,
  useListMediaItemsQuery,
  useListMediaItemCategoriesQuery,
  useListMediaItemSharedLinksQuery,
  useRestoreMediaItemsMutation,
  useSetMediaItemCategoriesMutation,
} = photosApi;

export const selectListMediaItemsData = createSelector(
  (state: RootState, filters: IListMediaItemFilters | undefined) =>
    photosApi.endpoints.listMediaItems.select(filters)(state),
  (result) => result.data ?? initialState,
);

const createListSharedLinksDataSelector =
  photosApi.endpoints.listMediaItemSharedLinks.select(undefined);

export const { selectById: selectMediaItemSharedLink } = sharedLinkAdapter.getSelectors(
  (state: RootState) => createListSharedLinksDataSelector(state).data ?? sharedLinksInitialState,
);

const createListDeletedMediaItemsSelector =
  photosApi.endpoints.listDeletedMediaItems.select(undefined);

export const { selectById: selectDeletedMediaItemById } = mediaItemsAdapter.getSelectors(
  (state: RootState) => createListDeletedMediaItemsSelector(state).data ?? initialState,
);
