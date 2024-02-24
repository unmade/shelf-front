import { createAction, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';

import { RootState } from 'store/store';
import { IUpload, IUploadError } from 'types/files';

export type UploadsFilter = 'all' | 'inProgress' | 'failed';

const uploadsAdapter = createEntityAdapter<IUpload>();

interface IFileEntriesAddedPayload {
  allowedMediaTypes?: string[];
  files: FileSystemFileEntry[] | File[];
  uploadTo: string;
}

export const fileEntriesAdded = createAction<IFileEntriesAddedPayload>('uploads/fileEntriesAdded');

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
} = uploadsAdapter.getSelectors((state: RootState) => state.uploads);

export const selectVisibleUploads = createSelector(
  [selectAllUploads, (_state: RootState, props: { filter: UploadsFilter }) => props.filter],
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
      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  },
);

export const selectVisibleUploadsLength = (state: RootState, filter: UploadsFilter) =>
  selectVisibleUploads(state, { filter }).length;

export const selectIsUploading = (state: RootState) =>
  selectVisibleUploadsLength(state, 'inProgress') > 0;

export const selectUploadsTotalProgress = createSelector(
  [
    (state) => selectAllUploads(state).reduce((acc, upload) => acc + upload.progress, 0),
    (state) => selectUploadIds(state).length,
  ],
  (totalProgress, uploadsCount) => Math.floor(totalProgress / uploadsCount),
);
