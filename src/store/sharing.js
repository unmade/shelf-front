import { createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

import apiSlice, { API_BASE_URL } from './apiSlice';

import { MediaType } from '../constants';

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
  }
);

const fileMembersAdapter = createEntityAdapter();
const initialState = fileMembersAdapter.getInitialState();

const sharingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addFileMember: builder.mutation({
      query: ({ fileId, username }) => ({
        url: '/sharing/add_member',
        method: 'POST',
        body: { file_id: fileId, username },
      }),
      async onQueryStarted({ fileId }, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(
          apiSlice.util.updateQueryData('listFileMembers', fileId, (draft) =>
            fileMembersAdapter.addOne(draft, data)
          )
        );
      },
    }),
    createSharedLink: builder.mutation({
      query: (path) => ({
        url: '/sharing/create_shared_link',
        method: 'POST',
        body: { path },
      }),
      async onQueryStarted(path, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(apiSlice.util.updateQueryData('getSharedLink', path, () => data));
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
    getSharedLink: builder.query({
      query: (path) => ({
        url: '/sharing/get_shared_link',
        method: 'POST',
        body: { path },
      }),
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
      transformResponse: (data) => fileMembersAdapter.setAll(initialState, data.members),
    }),
    removeFileMember: builder.mutation({
      query: ({ fileId, memberId }) => ({
        url: '/sharing/remove_member',
        method: 'POST',
        body: { file_id: fileId, member_id: memberId },
      }),
      async onQueryStarted({ fileId, memberId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('listFileMembers', fileId, (draft) =>
            fileMembersAdapter.removeOne(draft, memberId)
          )
        );
        try {
          await queryFulfilled;
        } catch (e) {
          patchResult.undo();
        }
      },
    }),
    revokeSharedLink: builder.mutation({
      query: ({ token, filename }) => ({
        url: '/sharing/revoke_shared_link',
        method: 'POST',
        body: { token, filename },
      }),
      async onQueryStarted({ path }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getSharedLink', path, () => null)
        );
        try {
          await queryFulfilled;
        } catch (e) {
          patchResult.undo();
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
            })
          )
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
  useCreateSharedLinkMutation,
  useDownloadSharedLinkContentQuery,
  useGetSharedLinkQuery,
  useGetSharedLinkFileQuery,
  useListFileMembersQuery,
  useRemoveFileMemberMutation,
  useRevokeSharedLinkMutation,
  useSetFileMemberAccessLevelMutation,
} = sharingApi;
