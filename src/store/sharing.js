import { createAsyncThunk } from '@reduxjs/toolkit';

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

const sharingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSharedLink: builder.mutation({
      query: (path) => ({
        url: '/sharing/create_shared_link',
        method: 'POST',
        body: { path },
      }),
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
    getSharingLinkFile: builder.query({
      query: ({ token, filename }) => ({
        url: '/sharing/get_shared_link_file',
        method: 'POST',
        body: { token, filename },
      }),
    }),
  }),
});

export const {
  useCreateSharedLinkMutation,
  useDownloadSharedLinkContentQuery,
  useGetSharingLinkFileQuery,
} = sharingApi;
