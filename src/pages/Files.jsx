import React from 'react';

import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import useDirPath from '../hooks/dir-path';
import * as icons from '../icons';
import * as routes from '../routes';

import FilePreview from '../containers/FilePreview';

import Browser from '../components/Browser';
import CreateFolderDialogProvider from '../components/CreateFolderDialogProvider';
import DeleteDialogProvider from '../components/DeleteDialogProvider';
import MoveDialogProvider from '../components/MoveDialogProvider';
import RenameFileDialogProvider from '../components/RenameFileDialogProvider';
import Uploader from '../components/Uploader';

function DialogsProvider({ children }) {
  return (
    <CreateFolderDialogProvider>
      <DeleteDialogProvider>
        <MoveDialogProvider>
          <RenameFileDialogProvider>{children}</RenameFileDialogProvider>
        </MoveDialogProvider>
      </DeleteDialogProvider>
    </CreateFolderDialogProvider>
  );
}

function Files() {
  const { t } = useTranslation();

  const location = useLocation();
  const dirPath = useDirPath();

  const { search } = location;
  const queryParams = new URLSearchParams(search);
  const preview = queryParams.get('preview');

  const preparePreviewPath = (path) =>
    routes.makeUrlFromPath({ path: dirPath, queryParams: { preview: routes.basename(path) } });

  return (
    <DialogsProvider>
      <div className={`flex h-full flex-col ${preview ? 'hidden' : 'block'}`}>
        <Browser
          actionButton={() => <Uploader />}
          dirPath={dirPath}
          droppable
          emptyIcon={<icons.Collection className="h-12 w-12 text-gray-400 dark:text-zinc-500" />}
          emptyTitle={t('This folder is empty')}
          emptyDescription={t('Drag and drop files to upload')}
        />
      </div>
      {preview && (
        <FilePreview dirPath={dirPath || '.'} name={preview} preparePath={preparePreviewPath} />
      )}
    </DialogsProvider>
  );
}

export default Files;
