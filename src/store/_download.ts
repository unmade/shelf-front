import { createAsyncThunk, nanoid } from '@reduxjs/toolkit';

import { API_BASE_URL } from './apiSlice';

import { RootState } from './store';

export const download = createAsyncThunk('files/download', async (fileId: string, { getState }) => {
  const { accessToken } = (getState() as RootState).auth;

  const url = `${API_BASE_URL}/files/get_download_url`;
  const options: RequestInit = {
    method: 'POST',
    mode: 'cors',
    cache: 'default',
    headers: new Headers({
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'X-Request-ID': nanoid(),
    }),
    body: JSON.stringify({ id: fileId }),
  };

  const response = await fetch(url, options);
  const data = await response.json();

  if (data != null) {
    const link = document.createElement('a');
    link.href = data.download_url;
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  }
});

export default download;
