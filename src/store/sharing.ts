import { createEntityAdapter, createSelector, type EntityState } from '@reduxjs/toolkit';
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { matchPath } from 'react-router';

import * as routes from '@/routes';

import { selectCurrentAccount } from './accounts';
import apiSlice from './apiSlice';
import { filesAdapter, filesApi } from './files';
import { isFetchBaseQueryErrorWithApiErrorCode, type RootState } from './store';

export function isFileMemberAlreadyExists(error: unknown): boolean {
  return isFetchBaseQueryErrorWithApiErrorCode(error, 'FILE_MEMBER_ALREADY_EXISTS');
}

type FileMemberAccessLevel = 'owner' | 'editor' | 'viewer';

interface FileMemberPermissions {
  can_change_access_level: boolean;
  can_remove: boolean;
}

interface FileMemberSchema {
  id: string;
  file_id: string;
  username: string;
  display_name: string;
  access_level: FileMemberAccessLevel;
  permissions: FileMemberPermissions;
}

interface SharedFileSchema {
  id: string;
  name: string;
  path: string;
  size: number;
  mediatype: string;
  hidden: boolean;
  shared: boolean;
  thumbnail_url?: string;
  modified_at: string;
}

interface ListFileMemberBatchItem {
  file_id: string;
  members: FileMemberSchema[];
}

interface SharedFile extends SharedFileSchema {
  members: FileMemberSchema[];
  owner: FileMemberSchema;
}

const fileMembersAdapter = createEntityAdapter<FileMemberSchema>({
  sortComparer: (a) => (a.access_level === 'owner' ? 1 : 0),
});
const fileMembersinitialState = fileMembersAdapter.getInitialState();

const sharedFilesAdapter = createEntityAdapter<SharedFile>();
const sharedFilesInitialState = sharedFilesAdapter.getInitialState();

const sharingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addFileMember: builder.mutation<FileMemberSchema, { fileId: string; username: string }>({
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
          if (dirPath != null) {
            const currentPath = dirPath === '' ? '.' : dirPath;
            listFolderPatchResult = dispatch(
              filesApi.util.updateQueryData('listFolder', currentPath, (draft) =>
                filesAdapter.updateOne(draft, { id: fileId, changes: { shared: true } }),
              ),
            );
          }
        }
        try {
          await queryFulfilled;
        } catch {
          listFolderPatchResult?.undo();
        }
      },
    }),

    listFileMembers: builder.query<EntityState<FileMemberSchema, string>, string>({
      query: (fileId) => ({
        url: '/sharing/list_members',
        method: 'POST',
        body: { id: fileId },
      }),
      providesTags: (_result, _error, fileId) => [{ type: 'fileMembers', id: fileId }],
      transformResponse: (data: { members: FileMemberSchema[] }) =>
        fileMembersAdapter.setAll(fileMembersinitialState, data.members),
    }),

    listSharedFiles: builder.query<EntityState<SharedFile, string>, void>({
      providesTags: [{ type: 'Sharing', id: 'listSharedFiles' }],
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const sharedFilesResult = await fetchWithBQ('/sharing/list_shared_files');
        if (sharedFilesResult.error) {
          return { error: sharedFilesResult.error as FetchBaseQueryError };
        }
        const { items: sharedFiles } = sharedFilesResult.data as { items: SharedFileSchema[] };

        if (sharedFiles.length === 0) {
          return { data: sharedFilesInitialState };
        }

        const result = await fetchWithBQ({
          url: '/sharing/list_members_batch',
          method: 'POST',
          body: { ids: sharedFiles.map((item) => item.id) },
        });

        if (result.error) {
          return { error: result.error as FetchBaseQueryError };
        }

        const { items: membersByFile } = result.data as { items: ListFileMemberBatchItem[] };

        const membersByFileId = new Map(
          membersByFile.map((item) => [item.file_id, item.members] as const),
        );

        const joined: SharedFile[] = sharedFiles
          .map((file) => {
            const fileMembers = membersByFileId.get(file.id);
            if (!fileMembers) {
              return null;
            }
            const owner = fileMembers.find((member) => member.access_level === 'owner');
            return {
              ...file,
              shared: true,
              members: fileMembers.filter((member) => member.access_level !== 'owner'),
              owner: owner!,
            };
          })
          .filter((file): file is SharedFile => file !== null);

        return { data: sharedFilesAdapter.setAll(sharedFilesInitialState, joined) };
      },
    }),

    removeFileMember: builder.mutation<void, { fileId: string; memberId: string }>({
      query: ({ fileId, memberId }) => ({
        url: '/sharing/remove_member',
        method: 'POST',
        body: { file_id: fileId, member_id: memberId },
      }),
      async onQueryStarted({ fileId, memberId }, { dispatch, queryFulfilled, getState }) {
        let listFolderPatchResult = null;
        const fileMemberPatchResult = dispatch(
          sharingApi.util.updateQueryData('listFileMembers', fileId, (draft) =>
            fileMembersAdapter.removeOne(draft, memberId),
          ),
        );
        const account = selectCurrentAccount(getState() as RootState);
        const currentUserIsRemovedMember = account?.id === memberId;
        const match = matchPath(routes.FILES.route, window.location.pathname);
        if (currentUserIsRemovedMember && match != null) {
          const { '*': dirPath } = match.params;
          if (dirPath != null) {
            const currentPath = dirPath === '' ? '.' : dirPath;
            listFolderPatchResult = dispatch(
              filesApi.util.updateQueryData('listFolder', currentPath, (draft) =>
                filesAdapter.removeOne(draft, fileId),
              ),
            );
          }
        }
        try {
          await queryFulfilled;
        } catch {
          fileMemberPatchResult.undo();
          listFolderPatchResult?.undo();
        }
      },
    }),

    setFileMemberAccessLevel: builder.mutation<
      void,
      { fileId: string; memberId: string; accessLevel: FileMemberAccessLevel }
    >({
      query: ({ fileId, memberId, accessLevel }) => ({
        url: '/sharing/set_member_access_level',
        method: 'POST',
        body: { file_id: fileId, member_id: memberId, access_level: accessLevel },
      }),
      async onQueryStarted({ fileId, memberId, accessLevel }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          sharingApi.util.updateQueryData('listFileMembers', fileId, (draft) =>
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

const selectListSharedFilesResult = sharingApi.endpoints.listSharedFiles.select(undefined);

const selectListSharedFilesResultData = createSelector(
  selectListSharedFilesResult,
  (result) => result.data,
);

export const { selectById: selectSharedFileById } = sharedFilesAdapter.getSelectors(
  (state: RootState) => selectListSharedFilesResultData(state) ?? sharedFilesInitialState,
);
