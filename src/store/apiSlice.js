import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Mutex } from 'async-mutex';

import { tokenRefreshed, signedOut, selectRefreshToken, selectAccessToken } from './authSlice';

export const API_BASE_URL = import.meta.env.SNOWPACK_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = selectAccessToken(getState());
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

function isTokenError(error) {
  const code = error?.data?.code;
  return code === 'INVALID_TOKEN' || code === 'MISSING_TOKEN';
}

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  const refreshToken = selectRefreshToken(api.getState());
  if (refreshToken && isTokenError(result.error)) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          {
            url: 'auth/refresh_token',
            method: 'POST',
            headers: {
              'x-shelf-refresh-token': refreshToken,
            },
          },
          api,
          extraOptions
        );
        if (refreshResult.data) {
          const { access_token: accessToken, refresh_token: nextRefreshToken } = refreshResult.data;
          api.dispatch(tokenRefreshed({ accessToken, refreshToken: nextRefreshToken }));
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(signedOut());
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Files', 'Sharing'],
  endpoints: () => ({}),
});

export default apiSlice;
export const {
  util: { invalidateTags },
} = apiSlice;
