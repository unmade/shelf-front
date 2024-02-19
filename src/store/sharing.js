import { createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

import { matchPath } from 'react-router-dom';

import { MediaType } from '../constants';
import * as routes from '../routes';

import { selectGetCurrentAccountResult } from './accounts';
import apiSlice, { API_BASE_URL } from './apiSlice';
import { filesAdapter } from './files';

export const downloadSharedLinkFile = createAsyncThunk(
  'sharing/downloadSharedLinkFile',
  async ({ token, filename }) => {
    const url = `${API_BASE_URL}/sharing/get_shared_link_download_url`;
    const options = {
      method: 'POST',
      mode: 'cors',
      cache: 'default',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify({
        token,
        filename,
      }),
    };

    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();

      if (data != null) {
        const link = document.createElement('a');
        link.href = data.download_url;
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      }
    }
  },
);

const fileMembersAdapter = createEntityAdapter({
  sortComparer: (a) => (a.access_level === 'owner' ? 1 : 0),
});
const fileMembersinitialState = fileMembersAdapter.getInitialState();

const sharedFilesAdapter = createEntityAdapter();
const sharedFilesInitialState = sharedFilesAdapter.getInitialState();

const filesSharedViaLinkAdapter = createEntityAdapter();
const filesSharedViaLinkInitialState = filesSharedViaLinkAdapter.getInitialState();

const sharingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addFileMember: builder.mutation({
      query: ({ fileId, username }) => ({
        url: '/sharing/add_member',
        method: 'POST',
        body: { file_id: fileId, username },
      }),
      invalidatesTags: (_result, _error, { fileId }) => [
        { type: 'fileMembers', id: fileId },
        { type: 'Sharing', id: 'listSharedFiles' },
      ],
      async onQueryStarted({ fileId }, { dispatch, queryFulfilled }) {
        let listFolderPatchResult = null;
        const match = matchPath(routes.FILES.route, window.location.pathname);
        if (match != null) {
          const { '*': dirPath } = match.params;
          const currentPath = dirPath === '' ? '.' : dirPath;
          listFolderPatchResult = dispatch(
            apiSlice.util.updateQueryData('listFolder', currentPath, (draft) =>
              filesAdapter.updateOne(draft, { id: fileId, changes: { shared: true } }),
            ),
          );
        }
        try {
          await queryFulfilled;
        } catch (e) {
          listFolderPatchResult?.undo();
        }
      },
    }),
    downloadSharedLinkContent: builder.query({
      async queryFn({ token, filename }, _queryApi, _extraOptions, fetchWithBQ) {
        const getDownloadUrlResult = await fetchWithBQ({
          url: '/sharing/get_shared_link_download_url',
          method: 'POST',
          body: {
            token,
            filename,
          },
        });
        if (getDownloadUrlResult.error) {
          return { error: getDownloadUrlResult.error };
        }
        const { download_url: url } = getDownloadUrlResult.data;
        const result = await fetchWithBQ({
          url,
          method: 'GET',
          responseHandler: (response) => {
            const contentType = response.headers.get('content-type');
            return MediaType.isText(contentType) ? response.text() : response.blob();
          },
        });
        if (result.data) {
          const { data } = result;
          const contentType = result.meta.response.headers.get('content-type');
          const content = MediaType.isText(contentType) ? data : URL.createObjectURL(data);
          return { data: { content } };
        }
        return { error: result.error };
      },
      async onCacheEntryAdded(_arg, { cacheDataLoaded, cacheEntryRemoved }) {
        const data = await cacheDataLoaded;
        await cacheEntryRemoved;
        URL.revokeObjectURL(data?.content);
      },
    }),
    getSharedLinkFile: builder.query({
      query: ({ token, filename }) => ({
        url: '/sharing/get_shared_link_file',
        method: 'POST',
        body: { token, filename },
      }),
    }),
    listFileMembers: builder.query({
      query: (fileId) => ({
        url: '/sharing/list_members',
        method: 'POST',
        body: { id: fileId },
      }),
      providesTags: (_result, _error, fileId) => [{ type: 'fileMembers', id: fileId }],
      transformResponse: (data) => fileMembersAdapter.setAll(fileMembersinitialState, data.members),
    }),
    listSharedFiles: builder.query({
      providesTags: [{ type: 'Sharing', id: 'listSharedFiles' }],
      async queryFn(arg, _queryApi, _extraOptions, fetchWithBQ) {
        const sharedFilesResult = await fetchWithBQ('/sharing/list_shared_files');
        if (sharedFilesResult.error) {
          return { error: sharedFilesResult.error };
        }
        const { items: sharedFiles } = sharedFilesResult.data;
        const state = sharedFilesAdapter.setAll(sharedFilesInitialState, sharedFiles);

        const fileIds = sharedFiles.map((item) => item.id);
        const result = await fetchWithBQ({
          url: '/sharing/list_members_batch',
          method: 'POST',
          body: { ids: fileIds },
        });

        if (result.error) {
          return { error: result.error };
        }

        const data = sharedFilesAdapter.updateMany(
          state,
          result.data.items.map((item) => ({
            id: item.file_id,
            changes: {
              shared: true,
              members: item.members.filter((member) => member.access_level !== 'owner'),
              owner: item.members.filter((member) => member.access_level === 'owner')[0],
            },
          })),
        );

        return { data };
      },
    }),
    listFilesSharedViaLink: builder.query({
      providesTags: [{ type: 'Sharing', id: 'listFilesSharedViaLink' }],
      async queryFn(arg, queryApi, _extraOptions, fetchWithBQ) {
        const sharedLinksResult = await fetchWithBQ('/sharing/list_shared_links');
        if (sharedLinksResult.error) {
          return { error: sharedLinksResult.error };
        }
        const { items: sharedLinks } = sharedLinksResult.data;

        const fileIds = sharedLinks.map((item) => item.file_id);
        const result = await fetchWithBQ({
          url: '/files/get_batch',
          method: 'POST',
          body: { ids: fileIds },
        });

        if (result.error) {
          return { error: result.error };
        }

        const files = result.data.items;
        const state = filesSharedViaLinkAdapter.setAll(filesSharedViaLinkInitialState, files);

        const data = filesSharedViaLinkAdapter.updateMany(
          state,
          sharedLinks.map((item) => ({
            id: item.file_id,
            changes: {
              token: item.token,
              created_at: item.created_at,
            },
          })),
        );

        const { selectAll } = filesSharedViaLinkAdapter.getSelectors();
        selectAll(data).forEach((entity) => {
          queryApi.dispatch(
            apiSlice.util.upsertQueryData('getSharedLink', entity.id, {
              file_id: entity.id,
              token: entity.token,
              created_at: entity.created_at,
            }),
          );
        });

        return { data };
      },
    }),
    removeFileMember: builder.mutation({
      query: ({ fileId, memberId }) => ({
        url: '/sharing/remove_member',
        method: 'POST',
        body: { file_id: fileId, member_id: memberId },
      }),
      async onQueryStarted({ fileId, memberId }, { dispatch, queryFulfilled, getState }) {
        let listFolderPatchResult = null;
        const fileMemberPatchResult = dispatch(
          apiSlice.util.updateQueryData('listFileMembers', fileId, (draft) =>
            fileMembersAdapter.removeOne(draft, memberId),
          ),
        );
        const account = selectGetCurrentAccountResult(getState());
        const currentUserIsRemovedMember = account.user.id === memberId;
        const match = matchPath(routes.FILES.route, window.location.pathname);
        if (currentUserIsRemovedMember && match != null) {
          const { '*': dirPath } = match.params;
          const currentPath = dirPath === '' ? '.' : dirPath;
          listFolderPatchResult = dispatch(
            apiSlice.util.updateQueryData('listFolder', currentPath, (draft) =>
              filesAdapter.removeOne(draft, fileId),
            ),
          );
        }
        try {
          await queryFulfilled;
        } catch (e) {
          fileMemberPatchResult.undo();
          listFolderPatchResult?.undo();
        }
      },
    }),
    setFileMemberAccessLevel: builder.mutation({
      query: ({ fileId, memberId, accessLevel }) => ({
        url: '/sharing/set_member_access_level',
        method: 'POST',
        body: { file_id: fileId, member_id: memberId, access_level: accessLevel },
      }),
      async onQueryStarted({ fileId, memberId, accessLevel }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('listFileMembers', fileId, (draft) =>
            fileMembersAdapter.updateOne(draft, {
              id: memberId,
              changes: { access_level: accessLevel },
            }),
          ),
        );
        try {
          await queryFulfilled;
        } catch (e) {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useAddFileMemberMutation,
  useDownloadSharedLinkContentQuery,
  useGetSharedLinkFileQuery,
  useListFileMembersQuery,
  useListSharedFilesQuery,
  useListFilesSharedViaLinkQuery,
  useRemoveFileMemberMutation,
  useSetFileMemberAccessLevelMutation,
} = sharingApi;

const selectListSharedFilesResult = sharingApi.endpoints.listSharedFiles.select();

const selectListSharedFilesResultData = createSelector(
  selectListSharedFilesResult,
  (result) => result.data,
);

export const { selectById: selectSharedFileById } = sharedFilesAdapter.getSelectors(
  (state) => selectListSharedFilesResultData(state) ?? sharedFilesInitialState,
);

const selectListFilesSharedViaLinkResult = sharingApi.endpoints.listFilesSharedViaLink.select();

const selectListFilesSharedViaLinkResultData = createSelector(
  selectListFilesSharedViaLinkResult,
  (result) => result.data,
);

export const { selectById: selectFileSharedViaLinkById } = filesSharedViaLinkAdapter.getSelectors(
  (state) => selectListFilesSharedViaLinkResultData(state) ?? filesSharedViaLinkInitialState,
);
