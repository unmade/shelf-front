import React from 'react';

import { useTranslation } from 'react-i18next';

import useDirPath from '../hooks/dir-path';
import { useIsLaptop } from '../hooks/media-query';
import useResolvedPreviewSearchParam from '../hooks/resolved-preview-search-param';

import * as icons from '../icons';
import * as routes from '../routes';

import Empty from '../components/ui/Empty';

import BreadcrumbDropdown from '../components/BreadcrumbDropdown';
import CopyLinkDialogProvider from '../components/CopyLinkDialogProvider';
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
import FileDrop from '../containers/FileDrop';
import FilePreviewContainer from '../containers/FilePreviewContainer';

function DialogsProvider({ children }) {
  return (
    <CopyLinkDialogProvider>
      <CreateFolderDialogProvider>
        <DeleteDialogProvider>
          <MoveDialogProvider>
            <RenameFileDialogProvider>{children}</RenameFileDialogProvider>
          </MoveDialogProvider>
        </DeleteDialogProvider>
      </CreateFolderDialogProvider>
    </CopyLinkDialogProvider>
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

function EmptyContainer() {
  const { t } = useTranslation();

  const icon = <icons.Collection className="h-12 w-12 text-gray-400 dark:text-zinc-500" />;
  const title = t('This folder is empty');
  const description = t('Drag and drop files to upload');

  return <Empty icon={icon} title={title} description={description} />;
}

EmptyContainer.propTypes = {};

function Files() {
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

  const browser = (
    <BrowserContainer path={dirPath} breadcrumbs={breadcrumbs} emptyView={<EmptyContainer />} />
  );

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

          <FileDrop
            className="h-full"
            uploadTo={dirPath}
            render={({ innerRef, dragging }) => (
              <div className="relative flex h-full w-full flex-col">
                <div
                  ref={innerRef}
                  className={`${
                    dragging ? 'block' : 'hidden'
                  } absolute z-10 h-full w-full px-2 pb-10`}
                >
                  <div className="h-full w-full rounded-2xl border-4 border-dashed border-teal-200 dark:border-teal-600" />
                </div>
                {browser}
              </div>
            )}
          />
        </div>
      )}
    </DialogsProvider>
  );
}

export default Files;
