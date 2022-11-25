import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import { shallowEqual } from 'react-redux';

const uploadsAdapter = createEntityAdapter();
const initialState = uploadsAdapter.getInitialState();

const uploadsSlice = createSlice({
  name: 'uploads',
  initialState,
  reducers: {
    fileEntriesAdded() {},
    uploadsAdded(state, action) {
      const { uploads } = action.payload;
      uploadsAdapter.upsertMany(state, uploads);
    },
    uploadProgressed(state, action) {
      const { upload, progress } = action.payload;
      uploadsAdapter.updateOne(state, { id: upload.id, changes: { progress } });
    },
    uploadFulfilled(state, action) {
      const { upload } = action.payload;
      uploadsAdapter.updateOne(state, { id: upload.id, changes: { done: true } });
    },
    uploadRejected(state, action) {
      const { upload, error } = action.payload;
      uploadsAdapter.updateOne(state, { id: upload.id, changes: { error, done: true } });
    },
  },
});

export default uploadsSlice.reducer;

export const { fileEntriesAdded, uploadsAdded, uploadProgressed, uploadFulfilled, uploadRejected } =
  uploadsSlice.actions;

export const {
  selectById: selectUploadById,
  selectIds: selectUploadIds,
  selectAll: selectAllUploads,
} = uploadsAdapter.getSelectors((state) => state.uploads);

export const selectVisibleUploads = createSelector(
  selectAllUploads,
  (_state, props) => props.filter,
  (uploads, filter) => {
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
  {
    memoizeOptions: {
      equalityCheck: (a, b) => a === b,
      maxSize: 3,
      resultEqualityCheck: shallowEqual,
    },
  }
);

export const selectVisibleUploadsLength = (state, filter) =>
  selectVisibleUploads(state, { filter }).length;

export const selectIsUploading = (state) => selectVisibleUploadsLength(state, 'inProgress') > 0;
