import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { Mutex } from 'async-mutex';

import { tokenRefreshed, signedOut, selectRefreshToken, selectAccessToken } from './authSlice';
import type { RootState } from './store';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = selectAccessToken(getState() as RootState);
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

interface RefreshResponse {
  access_token: string;
  refresh_token: string;
}

async function isTokenError(error: unknown): Promise<boolean> {
  if (!error || typeof error !== 'object') {
    return false;
  }

  const data = 'data' in error ? (error as { data?: unknown }).data : undefined;
  let code: unknown;

  if (data instanceof Blob) {
    try {
      const text = await data.text();
      const parsed = JSON.parse(text) as { code?: unknown };
      code = parsed?.code;
    } catch {
      // ignore
    }
  } else if (typeof data === 'string') {
    try {
      const parsed = JSON.parse(data) as { code?: unknown };
      code = parsed?.code;
    } catch {
      // ignore
    }
  } else if (data && typeof data === 'object' && 'code' in data) {
    code = (data as { code?: unknown }).code;
  }

  return code === 'INVALID_TOKEN' || code === 'MISSING_TOKEN';
}

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  const refreshToken = selectRefreshToken(api.getState() as RootState);
  if (refreshToken && (await isTokenError(result.error))) {
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
          extraOptions,
        );

        const data = refreshResult.data as Partial<RefreshResponse> | undefined;
        if (typeof data?.access_token === 'string' && typeof data?.refresh_token === 'string') {
          api.dispatch(
            tokenRefreshed({ accessToken: data.access_token, refreshToken: data.refresh_token }),
          );
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(signedOut());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Accounts', 'Albums', 'AlbumItems', 'Files', 'Sharing', 'fileMembers', 'MediaItems'],
  endpoints: () => ({}),
});

export default apiSlice;
export const {
  util: { invalidateTags },
} = apiSlice;
