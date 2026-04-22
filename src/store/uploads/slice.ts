import { createAction, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';

import type { IUpload, IUploadError, UploadEntries, UploadScope } from '@/types/uploads';

import type { RootState } from '@/store/store';

export type UploadsFilter = 'all' | 'inProgress' | 'failed';

interface UploadSelectorProps {
  filter: UploadsFilter;
  scope: UploadScope;
}

interface ScopedUploadsProps {
  scope: UploadScope;
}

const uploadsAdapter = createEntityAdapter<IUpload>();

export interface IFileEntriesAddedPayload {
  files: UploadEntries;
  uploadTo: string;
}

export interface IMediaItemEntriesAddedPayload {
  files: UploadEntries;
}

export const fileEntriesAdded = createAction<IFileEntriesAddedPayload>('uploads/fileEntriesAdded');
export const mediaItemEntriesAdded = createAction<IMediaItemEntriesAddedPayload>(
  'uploads/mediaItemEntriesAdded',
);

const uploadsSlice = createSlice({
  name: 'uploads',
  initialState: uploadsAdapter.getInitialState(),
  reducers: {
    uploadsAdded(state, action: { payload: { uploads: IUpload[] } }) {
      const { uploads } = action.payload;
      uploadsAdapter.upsertMany(state, uploads);
    },
    uploadProgressed(state, action: { payload: { upload: IUpload; progress: number } }) {
      const { upload, progress } = action.payload;
      uploadsAdapter.updateOne(state, { id: upload.id, changes: { progress } });
    },
    uploadFulfilled(state, action: { payload: { upload: IUpload } }) {
      const { upload } = action.payload;
      uploadsAdapter.updateOne(state, { id: upload.id, changes: { done: true } });
    },
    uploadRejected(state, action: { payload: { upload: IUpload; error: IUploadError } }) {
      const { upload, error } = action.payload;
      uploadsAdapter.updateOne(state, { id: upload.id, changes: { error, done: true } });
    },
  },
});

export default uploadsSlice.reducer;

export const { uploadsAdded, uploadProgressed, uploadFulfilled, uploadRejected } =
  uploadsSlice.actions;

export const {
  selectById: selectUploadById,
  selectIds: selectUploadIds,
  selectAll: selectAllUploads,
} = uploadsAdapter.getSelectors<RootState>((state: RootState) => state.uploads);

const selectScopedUploads = createSelector(
  [selectAllUploads, (_state: RootState, props: ScopedUploadsProps) => props.scope],
  (uploads: IUpload[], scope: UploadScope) => uploads.filter((upload) => upload.scope === scope),
);

export const selectVisibleUploads = createSelector(
  [selectScopedUploads, (_state: RootState, props: UploadSelectorProps) => props.filter],
  (uploads: IUpload[], filter: UploadsFilter) => {
    switch (filter) {
      case 'all':
        return uploads.map((upload) => upload.id);
      case 'inProgress':
        return uploads
          .filter(({ progress, error }) => progress < 100 && !error)
          .map((upload) => upload.id);
      case 'failed':
        return uploads.filter((upload) => upload.error).map((upload) => upload.id);
    }
  },
);

export const selectVisibleUploadsLength = (
  state: RootState,
  filter: UploadsFilter,
  scope: UploadScope,
) => selectVisibleUploads(state, { filter, scope }).length;

export const selectIsUploading = (state: RootState, scope: UploadScope) =>
  selectVisibleUploadsLength(state, 'inProgress', scope) > 0;

export const selectUploadsTotalProgress = createSelector([selectScopedUploads], (uploads) => {
  if (uploads.length === 0) {
    return 0;
  }

  const totalProgress = uploads.reduce((acc, upload) => acc + upload.progress, 0);
  return Math.floor(totalProgress / uploads.length);
});
