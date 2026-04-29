import axios from 'axios';
import type { ListenerEffectAPI } from '@reduxjs/toolkit';

import type { IUpload } from '@/types/uploads';
import type { IMediaItem } from '@/types/photos';

import { API_BASE_URL } from '@/store/apiSlice';
import { selectFeatureUploadFileMaxSize } from '@/store/features';
import { photosApi, toMediaItem, type MediaItemSchema } from '@/store/mediaItems';

import type { AppDispatch, RootState } from '@/store/store';

import { uploadFulfilled, uploadsAdded, uploadRejected } from './slice';
import type { IMediaItemEntriesAddedPayload } from './slice';
import { normalizeUploadEntry, runSequentialUpload, type StoreAPI } from './_shared';

function updateMediaItemsCache(mediaItem: IMediaItem, { dispatch, getState }: StoreAPI): void {
  for (const { endpointName, originalArgs } of photosApi.util.selectInvalidatedBy(getState(), [
    { type: 'MediaItems', id: 'list' },
  ])) {
    if (endpointName === 'listMediaItems') {
      dispatch(
        photosApi.util.updateQueryData(endpointName, originalArgs, (draft) => {
          if (draft.pages.length > 0) {
            draft.pages[0] = [mediaItem, ...draft.pages[0]];
          }
        }),
      );
    }
  }

  dispatch(
    photosApi.util.updateQueryData('countMediaItems', undefined, (draft) => {
      if (draft.total != null) {
        draft.total += 1;
      }
    }),
  );
}

function createUploadedMediaItem(schema: MediaItemSchema, upload: IUpload): IMediaItem {
  return {
    ...toMediaItem(schema),
    thumbnailUrl: upload.thumbnail ?? schema.thumbnail_url,
  };
}

async function uploadMediaItem(upload: IUpload, fileObj: File, storeAPI: StoreAPI): Promise<void> {
  const { dispatch } = storeAPI;

  if (upload.error) {
    dispatch(uploadRejected({ upload, error: upload.error }));
    return;
  }

  await runSequentialUpload(storeAPI, upload, async (config) => {
    const body = new FormData();
    body.append('file', fileObj);

    let response: Awaited<ReturnType<typeof axios.post<MediaItemSchema>>>;
    try {
      response = await axios.post<MediaItemSchema>(
        `${API_BASE_URL}/photos/media_items/upload`,
        body,
        config,
      );
    } catch {
      dispatch(uploadRejected({ upload, error: { code: 'uploadError' } }));
      return;
    }

    if (response.status !== 200) {
      dispatch(uploadRejected({ upload, error: { code: 'uploadError' } }));
      return;
    }

    dispatch(uploadFulfilled({ upload }));
    updateMediaItemsCache(createUploadedMediaItem(response.data, upload), storeAPI);
  });
}

export default async function listenMediaItemEntriesAdded(
  action: { payload: IMediaItemEntriesAddedPayload },
  listenerApi: ListenerEffectAPI<RootState, AppDispatch>,
): Promise<void> {
  const { files } = action.payload;
  const maxUploadSize = selectFeatureUploadFileMaxSize(listenerApi.getState());

  const uploads = await Promise.all(
    files.map((file) => normalizeUploadEntry(file, maxUploadSize, 'mediaItems')),
  );

  listenerApi.dispatch(uploadsAdded({ uploads: uploads.map(([upload]) => upload) }));

  const storeAPI: StoreAPI = {
    dispatch: listenerApi.dispatch,
    getState: listenerApi.getState,
  };

  for (const [upload, fileObj] of uploads) {
    await uploadMediaItem(upload, fileObj, storeAPI);
  }
}
