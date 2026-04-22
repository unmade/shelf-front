import type { ListenerEffectAPI } from '@reduxjs/toolkit';
import { matchPath } from 'react-router';

import axios from 'axios';

import type { IUpload } from '@/types/uploads';

import * as routes from '@/routes';

import { API_BASE_URL } from '@/store/apiSlice';
import { selectFeatureUploadFileMaxSize } from '@/store/features';
import { filesAdapter, filesApi, selectListFolderData, type FileSchema } from '@/store/files';

import type { AppDispatch, RootState } from '@/store/store';

import { uploadsAdded, uploadRejected, uploadFulfilled } from './slice';
import type { IFileEntriesAddedPayload } from './slice';
import { normalizeUploadEntry, runSequentialUpload, type StoreAPI } from './_shared';

async function normalizeFileUploadEntry(
  entry: FileSystemFileEntry | File,
  uploadTo: string,
  maxUploadSize: number,
): Promise<[IUpload, File]> {
  const [upload, fileObj] = await normalizeUploadEntry(entry, maxUploadSize, 'files');

  if (entry instanceof File) {
    upload.uploadPath = `${uploadTo}/${entry.name}`;
  } else {
    upload.uploadPath = `${uploadTo}${entry.fullPath}`;
  }

  upload.parentPath = routes.parent(upload.uploadPath) ?? null;

  return [upload, fileObj];
}

function updateListFolderCache(file: FileSchema, { dispatch, getState }: StoreAPI): void {
  const { path, size } = file;

  // When uploading a folder we need to re-fetch files in the current path for the folder to appear.
  // Consider the case when user uploads a `Scans/img.jpeg` to the `Documents` folder. Thus,
  // we need to add 'Scans' folder to the `listFolder('Documents')` cache. But the upload endpoint
  // returns data about uploaded file. So, we need to re-fetch files in the current path in order
  // for missing folders to appear.
  const invalidatesTags: { type: 'Files'; id: string }[] = [];
  const match = matchPath(routes.FILES.route, window.location.pathname);
  if (match != null) {
    const { '*': dirPath } = match.params;
    const currentPath = dirPath === '' ? '.' : dirPath!;

    const files = filesAdapter
      .getSelectors((state: RootState) => selectListFolderData(state, currentPath))
      .selectAll(getState());

    const paths = new Set(Object.values(files).map((entry) => entry.path.toLowerCase()));
    paths.add(file.name.toLowerCase());
    const existingPath = routes.parents(path).filter((entry) => paths.has(entry.toLowerCase()));
    if (existingPath.length === 0) {
      invalidatesTags.push({ type: 'Files', id: currentPath });
    }
  }

  if (invalidatesTags.length) {
    dispatch(filesApi.util.invalidateTags(invalidatesTags));
  }

  const { selectAll } = filesAdapter.getSelectors();
  routes.parents(path).forEach((pathToUpdate) =>
    dispatch(
      filesApi.util.updateQueryData('listFolder', routes.parent(pathToUpdate)!, (draft) => {
        // we don't know the ID of the parent, so loop through and search by path.
        // on average there shouldn't be a lot of files to loop over.
        const entries = selectAll(draft);
        Object.values(entries).forEach((value) => {
          if (value.path === pathToUpdate) {
            filesAdapter.updateOne(draft, { id: value.id, changes: { size: value.size + size } });
          }
        });
      }),
    ),
  );

  dispatch(
    filesApi.util.updateQueryData('listFolder', routes.parent(path)!, (draft) => {
      if (draft != null) {
        filesAdapter.upsertOne(draft, file);
      }
    }),
  );
}

async function uploadFile(upload: IUpload, fileObj: File, storeAPI: StoreAPI): Promise<void> {
  const { dispatch } = storeAPI;

  if (upload.error) {
    dispatch(uploadRejected({ upload, error: upload.error }));
    return;
  }

  await runSequentialUpload(storeAPI, upload, async (config) => {
    const body = new FormData();
    body.append('file', fileObj);
    if (upload.uploadPath != null) {
      body.append('path', upload.uploadPath);
    }
    if (upload.mtime != null) {
      body.append('mtime', String(upload.mtime / 1000));
    }

    let response: Awaited<ReturnType<typeof axios.post<FileSchema>>>;
    try {
      response = await axios.post<FileSchema>(`${API_BASE_URL}/files/upload`, body, config);
    } catch {
      dispatch(uploadRejected({ upload, error: { code: 'uploadError' } }));
      return;
    }

    if (response.status !== 200) {
      dispatch(uploadRejected({ upload, error: { code: 'uploadError' } }));
      return;
    }

    dispatch(uploadFulfilled({ upload }));
    updateListFolderCache(response.data, storeAPI);
  });
}

export default async function listenFileEntriesAdded(
  action: { payload: IFileEntriesAddedPayload },
  listenerApi: ListenerEffectAPI<RootState, AppDispatch>,
): Promise<void> {
  const { files, uploadTo } = action.payload;
  const maxUploadSize = selectFeatureUploadFileMaxSize(listenerApi.getState());

  const uploads = await Promise.all(
    files.map((file) => normalizeFileUploadEntry(file, uploadTo, maxUploadSize)),
  );

  listenerApi.dispatch(uploadsAdded({ uploads: uploads.map(([upload]) => upload) }));

  const storeAPI: StoreAPI = {
    dispatch: listenerApi.dispatch,
    getState: listenerApi.getState,
  };

  for (const [upload, fileObj] of uploads) {
    await uploadFile(upload, fileObj, storeAPI);
  }
}
