import React, { createContext } from 'react';

import { useTranslation } from 'react-i18next';

import { selectBookmarkedFileById, useListBookmarkedFilesQuery } from '../store/files';

import { useIsLaptop } from '../hooks/media-query';
import useResolvedPreviewSearchParam from '../hooks/resolved-preview-search-param';

import * as icons from '../icons';

import BrowserDataProvider from '../components/Browser/BrowserDataProvider';
import TableView from '../components/Browser/TableView';
import DeleteDialogProvider from '../components/DeleteDialogProvider';
import FilePreview from '../components/FilePreview';
import MoveDialogProvider from '../components/MoveDialogProvider';
import RenameFileDialogProvider from '../components/RenameFileDialogProvider';
import SideBarModal from '../components/SideBarModal';

function FilePreviewContainer() {
  const { ids, isFetching: loading } = useListBookmarkedFilesQuery(undefined, {
    selectFromResult: ({ data, isFetching }) => ({ ids: data?.ids, isFetching }),
  });

  return <FilePreview ids={ids} loading={loading} selectById={selectBookmarkedFileById} />;
}

FilePreviewContainer.propTypes = {};

function BookmarkHeader() {
  const { t } = useTranslation();
  const isLaptop = useIsLaptop();

  const title = t('Bookmarks');

  return (
    <div className="flex flex-row items-center justify-between px-6 py-7 sm:pl-5 sm:pr-8">
      {!isLaptop ? (
        <>
          <SideBarModal />
          <h2 className="ml-2 truncate text-xl font-medium text-gray-900 dark:text-zinc-100 sm:text-3xl">
            {title}
          </h2>
        </>
      ) : (
        <div className="flex min-w-0 flex-1 items-center ">
          <icons.BookmarkOutlined className="ml-2 h-7 w-7 text-gray-400 dark:text-zinc-500" />
          <h2 className="ml-2 truncate text-xl font-medium text-gray-900 dark:text-zinc-100 sm:text-3xl">
            {title}
          </h2>
        </div>
      )}
      <div className="flex items-center text-2xl sm:ml-6 sm:space-x-8">
        {/* hack: this is to center text like on other pages */}
        <div className="h-9 w-9">&nbsp;</div>
      </div>
    </div>
  );
}

BookmarkHeader.propTypes = {};

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
  const pathToPreview = useResolvedPreviewSearchParam();

  if (pathToPreview) {
    return <FilePreviewContainer pathToPreview={pathToPreview} />;
  }

  return (
    <div className="flex h-full flex-col">
      <BookmarkHeader />
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
