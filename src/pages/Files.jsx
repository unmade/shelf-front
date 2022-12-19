import React from 'react';

import { useTranslation } from 'react-i18next';

import useDirPath from '../hooks/dir-path';
import useResolvedPreviewSearchParam from '../hooks/resolved-preview-search-param';

import * as icons from '../icons';

import FilePreviewContainer from '../containers/FilePreviewContainer';

import Browser from '../components/Browser';
import CreateFolderDialogProvider from '../components/CreateFolderDialogProvider';
import DeleteDialogProvider from '../components/DeleteDialogProvider';
import ListFolderDataProvider, {
  ListFolderDataContext,
} from '../components/ListFolderDataProvider';
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

  const dirPath = useDirPath();
  const pathToPreview = useResolvedPreviewSearchParam();

  return (
    <DialogsProvider>
      {pathToPreview ? (
        <FilePreviewContainer dirPath={dirPath} />
      ) : (
        <div className="flex h-full flex-col">
          <Browser
            actionButton={Uploader}
            dirPath={dirPath}
            droppable
            dataProvider={ListFolderDataProvider}
            dataContext={ListFolderDataContext}
            emptyIcon={<icons.Collection className="h-12 w-12 text-gray-400 dark:text-zinc-500" />}
            emptyTitle={t('This folder is empty')}
            emptyDescription={t('Drag and drop files to upload')}
          />
        </div>
      )}
    </DialogsProvider>
  );
}

export default Files;
