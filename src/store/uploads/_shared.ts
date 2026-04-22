import { nanoid } from '@reduxjs/toolkit';

import { Mutex } from 'async-mutex';
import axios, { type AxiosProgressEvent, type AxiosRequestConfig } from 'axios';

import type { IUpload, UploadScope } from '@/types/uploads';

import { MediaType, REFRESH_ACCESS_TOKEN_ON_UPLOAD_DELTA } from '@/constants';

import { API_BASE_URL } from '@/store/apiSlice';
import {
  selectAccessToken,
  selectAccessTokenRefreshedAt,
  selectRefreshToken,
  signedOut,
  tokenRefreshed,
} from '@/store/authSlice';

import type { AppDispatch, RootState } from '@/store/store';

import { uploadProgressed } from './slice';

const mutex = new Mutex();

export interface StoreAPI {
  dispatch: AppDispatch;
  getState: () => RootState;
}

interface RefreshTokenResult {
  accessToken: string;
  refreshToken: string;
}

export async function normalizeUploadEntry(
  entry: FileSystemFileEntry | File,
  maxUploadSize: number,
  scope: UploadScope,
): Promise<[IUpload, File]> {
  const upload: IUpload = {
    id: nanoid(),
    name: entry.name,
    scope,
    mediatype: null,
    uploadPath: null,
    parentPath: null,
    progress: 0,
    thumbnail: null,
    mtime: null,
    error: null,
    done: false,
  };

  let fileObj: File;

  if (entry instanceof File) {
    fileObj = entry;
  } else {
    try {
      fileObj = await new Promise<File>((resolve, reject) => {
        entry.file(resolve, reject);
      });
    } catch {
      upload.error = { code: 'badFile' };
      return [upload, new File([], entry.name)];
    }
  }

  upload.mediatype = fileObj.type;
  upload.mtime = fileObj.lastModified;

  if (MediaType.isImage(upload.mediatype ?? '')) {
    upload.thumbnail = URL.createObjectURL(fileObj);
  }

  if (fileObj.size > maxUploadSize) {
    upload.error = { code: 'uploadTooLarge' };
  }

  return [upload, fileObj];
}

async function refreshAccessToken(refreshToken: string): Promise<RefreshTokenResult | null> {
  try {
    const { data } = await axios.post<{
      access_token: string;
      refresh_token: string;
    }>(`${API_BASE_URL}/auth/refresh_token`, null, {
      headers: { 'x-shelf-refresh-token': refreshToken },
    });
    return { accessToken: data.access_token, refreshToken: data.refresh_token };
  } catch {
    return null;
  }
}

export async function runSequentialUpload(
  storeAPI: StoreAPI,
  upload: IUpload,
  effect: (config: AxiosRequestConfig<FormData>) => Promise<void>,
): Promise<void> {
  const { dispatch, getState } = storeAPI;

  await mutex.waitForUnlock();
  const release = await mutex.acquire();

  try {
    const accessTokenRefreshedAt = selectAccessTokenRefreshedAt(getState());
    if (accessTokenRefreshedAt != null) {
      const delta = Date.now() - new Date(accessTokenRefreshedAt).getTime();
      if (delta > Number(REFRESH_ACCESS_TOKEN_ON_UPLOAD_DELTA)) {
        const currentRefreshToken = selectRefreshToken(getState());
        if (currentRefreshToken == null) {
          dispatch(signedOut());
          return;
        }
        const tokens = await refreshAccessToken(currentRefreshToken);
        if (tokens == null) {
          dispatch(signedOut());
          return;
        }
        dispatch(tokenRefreshed(tokens));
      }
    }

    const accessToken = selectAccessToken(getState());
    if (accessToken == null) {
      dispatch(signedOut());
      return;
    }

    let prevProgressCeiled = 0;
    const config: AxiosRequestConfig<FormData> = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
        'X-Request-ID': nanoid(),
      },
      onUploadProgress: ({ progress }: AxiosProgressEvent) => {
        const progressCeiled = Math.ceil(100 * (progress ?? 0));
        if (progressCeiled !== prevProgressCeiled) {
          dispatch(uploadProgressed({ upload, progress: progressCeiled }));
          prevProgressCeiled = progressCeiled;
        }
      },
    };

    await effect(config);
  } finally {
    release();
  }
}
