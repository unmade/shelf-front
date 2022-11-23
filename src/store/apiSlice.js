import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const API_BASE_URL = import.meta.env.SNOWPACK_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Auth', 'Files'],
  endpoints: () => ({}),
});

export default apiSlice;
export const {
  util: { invalidateTags },
} = apiSlice;
