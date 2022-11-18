import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getAccessToken } from './reducers/auth';

const API_BASE_URL = import.meta.env.SNOWPACK_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';

export default createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getAccessToken(getState());
      headers.set('content-type', 'application/json');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
