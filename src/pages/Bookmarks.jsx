import React, { createContext } from 'react';

import { useTranslation } from 'react-i18next';

import { selectBookmarkedFileById, useListBookmarkedFilesQuery } from '../store/files';

import useResolvedPreviewSearchParam from '../hooks/resolved-preview-search-param';

import * as icons from '../icons';

import BrowserDataProvider from '../components/Browser/BrowserDataProvider';
import TableView from '../components/Browser/TableView';
import DeleteDialogProvider from '../components/DeleteDialogProvider';
import FilePreview from '../components/FilePreview';
import MoveDialogProvider from '../components/MoveDialogProvider';
import PageHeader from '../components/PageHeader';
import RenameFileDialogProvider from '../components/RenameFileDialogProvider';

function FilePreviewContainer() {
  const { ids, isFetching: loading } = useListBookmarkedFilesQuery(undefined, {
    selectFromResult: ({ data, isFetching }) => ({ ids: data?.ids, isFetching }),
  });

  return <FilePreview ids={ids} loading={loading} selectById={selectBookmarkedFileById} />;
}

FilePreviewContainer.propTypes = {};

const BookmarksDataContext = createContext(null);

function BookmarksDataProvider({ children }) {
  const { ids, isFetching: loading } = useListBookmarkedFilesQuery(undefined, {
    selectFromResult: ({ data, isFetching }) => ({ ids: data?.ids, isFetching }),
  });

  return (
    <BookmarksDataContext.Provider value={{ ids, loading, selectById: selectBookmarkedFileById }}>
      {children}
    </BookmarksDataContext.Provider>
  );
}

function BookmarkList() {
  const { t } = useTranslation();

  return (
    <BookmarksDataProvider>
      <BrowserDataProvider dataContext={BookmarksDataContext}>
        <TableView
          emptyIcon={
            <icons.BookmarkAltOutlined className="h-12 w-12 text-gray-400 dark:text-zinc-500" />
          }
          emptyTitle={t('Bookmarks will appear here')}
        />
      </BrowserDataProvider>
    </BookmarksDataProvider>
  );
}

BookmarkList.propTypes = {};

function BookmarksContainer() {
  const { t } = useTranslation();

  const pathToPreview = useResolvedPreviewSearchParam();

  if (pathToPreview) {
    return <FilePreviewContainer pathToPreview={pathToPreview} />;
  }

  return (
    <div className="flex h-full flex-col">
      <PageHeader title={t('Bookmarks')}>
        <PageHeader.Title
          icon={
            <icons.BookmarkOutlined className="ml-2 h-7 w-7 text-gray-400 dark:text-zinc-500" />
          }
        >
          {t('Bookmarks')}
        </PageHeader.Title>
        <PageHeader.Actions />
      </PageHeader>
      <div className="flex h-full flex-row overflow-scroll pt-4">
        <BookmarkList />
      </div>
    </div>
  );
}

BookmarksContainer.propTypes = {};

function Bookmarks() {
  return (
    <DeleteDialogProvider>
      <MoveDialogProvider>
        <RenameFileDialogProvider>
          <BookmarksContainer />
        </RenameFileDialogProvider>
      </MoveDialogProvider>
    </DeleteDialogProvider>
  );
}

Bookmarks.propTypes = {};

export default Bookmarks;
