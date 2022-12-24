import React from 'react';

import { useTranslation } from 'react-i18next';

import useDirPath from '../hooks/dir-path';
import { useIsLaptop } from '../hooks/media-query';
import useResolvedPreviewSearchParam from '../hooks/resolved-preview-search-param';

import * as icons from '../icons';
import * as routes from '../routes';

import BreadcrumbDropdown from '../components/BreadcrumbDropdown';
import CreateFolderDialogProvider, {
  useCreateFolderDialog,
} from '../components/CreateFolderDialogProvider';
import DeleteDialogProvider from '../components/DeleteDialogProvider';
import GoBackButton from '../components/GoBackButton';
import MoveDialogProvider from '../components/MoveDialogProvider';
import PageHeader from '../components/PageHeader';
import RenameFileDialogProvider from '../components/RenameFileDialogProvider';
import SearchButton from '../components/SearchButton';
import Uploader from '../components/Uploader';

import BrowserContainer from '../containers/BrowserContainer';
import FilePreviewContainer from '../containers/FilePreviewContainer';

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

function CreateFolderDialogButton({ inPath }) {
  const { t } = useTranslation();

  const isLaptop = useIsLaptop();

  const openCreateFolderDialog = useCreateFolderDialog();

  if (isLaptop) {
    return (
      <button
        type="button"
        title={t('button_create_folder_title')}
        className="group m-1 rounded-lg border border-gray-300 bg-white py-0.5 px-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-1 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:bg-zinc-600 dark:hover:text-zinc-200 dark:focus:ring-zinc-700 dark:focus:ring-offset-zinc-800"
        onClick={() => openCreateFolderDialog(inPath)}
      >
        <span className="flex space-x-2">
          <icons.NewFolder className="h-4 w-4 text-gray-400 group-hover:text-blue-400 dark:group-hover:text-zinc-200" />
          <p>{t('New Folder')}</p>
        </span>
      </button>
    );
  }
  return (
    <button
      type="button"
      title={t('button_create_folder_title')}
      className="w-full border-t border-zinc-700"
      onClick={() => openCreateFolderDialog(inPath)}
    >
      <div className="flex items-center justify-between px-4 py-2">
        <div className="font-medium">{t('New Folder')}</div>
        <icons.NewFolder className="h-5 w-5 shrink-0 text-gray-400 dark:text-zinc-500" />
      </div>
    </button>
  );
}

CreateFolderDialogButton.propTypes = {};

function Files() {
  const { t } = useTranslation();

  const dirPath = useDirPath();
  const pathToPreview = useResolvedPreviewSearchParam();
  const isLaptop = useIsLaptop();

  const breadcrumbs = routes.breadcrumbs(dirPath);
  if (!isLaptop) {
    breadcrumbs.reverse();
  }
  breadcrumbs.push({
    key: 'create-folder',
    name: <CreateFolderDialogButton inPath={dirPath} />,
    url: null,
    path: null,
  });

  const title = routes.folderName(dirPath);

  return (
    <DialogsProvider>
      {pathToPreview ? (
        <FilePreviewContainer dirPath={dirPath} />
      ) : (
        <div className="flex h-full flex-col">
          <PageHeader>
            <PageHeader.Title
              icon={<GoBackButton to={routes.parent(dirPath)} disabled={routes.isRoot(dirPath)} />}
            >
              {isLaptop ? title : <BreadcrumbDropdown items={breadcrumbs} />}
            </PageHeader.Title>
            <PageHeader.Actions>
              <SearchButton />
              <Uploader uploadTo={dirPath} />
            </PageHeader.Actions>
          </PageHeader>

          <BrowserContainer
            path={dirPath}
            breadcrumbs={breadcrumbs}
            emptyIcon={<icons.Collection className="h-12 w-12 text-gray-400 dark:text-zinc-500" />}
            emptyTitle={t('This folder is empty')}
            emptyDescription={t('Drag and drop files to upload')}
            droppable
          />
        </div>
      )}
    </DialogsProvider>
  );
}

export default Files;
