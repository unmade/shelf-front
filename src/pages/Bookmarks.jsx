import React from 'react';

import { useTranslation } from 'react-i18next';

import { selectBookmarkedFileById, useListBookmarkedFilesQuery } from '../store/files';

import useResolvedPreviewSearchParam from '../hooks/resolved-preview-search-param';

import * as icons from '../icons';

import Browser from '../components/Browser';
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

function BookmarksBrowserContainer() {
  const { t } = useTranslation();

  const breadcrumbs = [
    {
      key: 'bookmarks',
      name: (
        <span className="flex space-x-2 text-gray-500 dark:text-zinc-400">
          <icons.Bookmark className="h-4 w-4 shrink-0 text-gray-300 dark:text-zinc-600" />
          <p>{t('Bookmarks')}</p>
        </span>
      ),
      url: null,
      path: null,
    },
  ];

  const { ids, isFetching: loading } = useListBookmarkedFilesQuery(undefined, {
    selectFromResult: ({ data, isFetching }) => ({ ids: data?.ids, isFetching }),
  });

  return (
    <Browser
      ids={ids}
      loading={loading}
      selectById={selectBookmarkedFileById}
      breadcrumbs={breadcrumbs}
      emptyIcon={
        <icons.BookmarkAltOutlined className="h-12 w-12 text-gray-400 dark:text-zinc-500" />
      }
      emptyTitle={t('Bookmarks will appear here')}
    />
  );
}

BookmarksBrowserContainer.propTypes = {};

function Bookmarks() {
  const { t } = useTranslation();

  const pathToPreview = useResolvedPreviewSearchParam();

  if (pathToPreview) {
    return <FilePreviewContainer pathToPreview={pathToPreview} />;
  }

  return (
    <DeleteDialogProvider>
      <MoveDialogProvider>
        <RenameFileDialogProvider>
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

            <BookmarksBrowserContainer />
          </div>
        </RenameFileDialogProvider>
      </MoveDialogProvider>
    </DeleteDialogProvider>
  );
}

Bookmarks.propTypes = {};

export default Bookmarks;
