import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';

import { matchPath } from 'react-router';

import * as routes from '../routes';

import { selectGetCurrentAccountResult } from './accounts';
import apiSlice from './apiSlice';
import { filesAdapter } from './files';
import { isFetchBaseQueryErrorWithApiErrorCode } from './store';

export function isFileMemberAlreadyExists(error) {
  return isFetchBaseQueryErrorWithApiErrorCode(error, 'FILE_MEMBER_ALREADY_EXISTS');
}

const fileMembersAdapter = createEntityAdapter({
  sortComparer: (a) => (a.access_level === 'owner' ? 1 : 0),
});
const fileMembersinitialState = fileMembersAdapter.getInitialState();

const sharedFilesAdapter = createEntityAdapter();
const sharedFilesInitialState = sharedFilesAdapter.getInitialState();

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
        } catch {
          listFolderPatchResult?.undo();
        }
      },
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
        } catch {
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
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useAddFileMemberMutation,
  useListFileMembersQuery,
  useListSharedFilesQuery,
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
