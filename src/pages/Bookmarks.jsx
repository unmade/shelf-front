import React from 'react';

import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import * as icons from 'icons';

import { selectBookmarkedFileById, useListBookmarkedFilesQuery } from 'store/files';

import Empty from 'components/ui-legacy/Empty';

import Heading from 'components/ui/Heading';

import Browser from 'components/Browser';
import CopyLinkDialogProvider from 'components/CopyLinkDialogProvider';
import DeleteDialogProvider from 'components/DeleteDialogProvider';
import FilePreview from 'components/FilePreview';
import MoveDialogProvider from 'components/MoveDialogProvider';
import RenameFileDialogProvider from 'components/RenameFileDialogProvider';

import { Page, PageHeader, PageHeaderTitle } from 'apps/files/components/page';

import useResolvedPreviewSearchParam from '../hooks/resolved-preview-search-param';

function FilePreviewContainer() {
  const { ids = [], isFetching: loading } = useListBookmarkedFilesQuery(undefined, {
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
      emptyView={
        <Empty
          icon={
            <icons.BookmarkAltOutlined className="h-12 w-12 text-gray-400 dark:text-zinc-500" />
          }
          title={t('Bookmarks will appear here')}
        />
      }
    />
  );
}

BookmarksBrowserContainer.propTypes = {};

function Bookmarks() {
  const { t } = useTranslation();

  const pathToPreview = useResolvedPreviewSearchParam();

  return (
    <>
      <Helmet>
        <title>{t('Bookmarks')} - Shelf</title>
      </Helmet>
      <CopyLinkDialogProvider>
        <DeleteDialogProvider>
          <MoveDialogProvider>
            <RenameFileDialogProvider>
              {pathToPreview ? (
                <FilePreviewContainer pathToPreview={pathToPreview} />
              ) : (
                <Page className="flex h-full flex-col">
                  <PageHeader title={t('Bookmarks')}>
                    <PageHeaderTitle>
                      <icons.BookmarkOutlined data-slot="icon" />
                      <Heading>{t('Bookmarks')}</Heading>
                    </PageHeaderTitle>
                  </PageHeader>

                  <BookmarksBrowserContainer />
                </Page>
              )}
            </RenameFileDialogProvider>
          </MoveDialogProvider>
        </DeleteDialogProvider>
      </CopyLinkDialogProvider>
    </>
  );
}

Bookmarks.propTypes = {};

export default Bookmarks;
