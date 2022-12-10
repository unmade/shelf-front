import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import {
  fileSelectionCleared,
  filesSelectionChanged,
  selectAllSelectedFileIds,
} from '../store/browser';
import { useGetBatchQuery } from '../store/files';

import { useListBookmarksQuery } from '../store/users';

import { FileShape } from '../types';

import * as icons from '../icons';
import { MediaQuery } from '../constants';
import useResolvedPreviewSearchParam from '../hooks/resolved-preview-search-param';
import useSidePreview from '../hooks/preview-available';

import DeleteDialogProvider from '../components/DeleteDialogProvider';
import FilePreview from '../components/FilePreview';
import FileTableView from '../components/FileTableView';
import FileTableCell from '../components/FileTableCell';
import MoveDialogProvider from '../components/MoveDialogProvider';
import RenameFileDialogProvider from '../components/RenameFileDialogProvider';
import SideBarModal from '../components/SideBarModal';
import SidePreview from '../components/Browser/SidePreview';

const empty = [];

function BookmarkHeader() {
  const { t } = useTranslation();
  const isLaptop = useMediaQuery({ query: MediaQuery.lg });

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

function BookmarkList({ files, filesById, loading, withSidePreview }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-1 flex-row pt-4">
      <div className={withSidePreview ? 'w-7/12' : 'w-full'}>
        <FileTableView
          className="border-transparent"
          items={files}
          scrollKey="bookmarks-table-view" // possible collissions
          itemRender={FileTableCell}
          loading={loading}
          emptyIcon={
            <icons.BookmarkAltOutlined className="h-12 w-12 text-gray-400 dark:text-zinc-500" />
          }
          emptyTitle={t('Bookmarks will appear here')}
        />
      </div>
      {withSidePreview && (
        <div className="w-5/12">
          <SidePreview itemsMap={filesById} />
        </div>
      )}
    </div>
  );
}

BookmarkList.propTypes = {
  files: PropTypes.arrayOf(FileShape).isRequired,
  filesById: PropTypes.objectOf(FileShape).isRequired,
  loading: PropTypes.bool.isRequired,
  withSidePreview: PropTypes.bool.isRequired,
};

function BookmarksContainer() {
  const pathToPreview = useResolvedPreviewSearchParam();

  const dispatch = useDispatch();
  const withSidePreview = useSidePreview();
  const selectedIds = useSelector(selectAllSelectedFileIds);

  const { data: fileIds } = useListBookmarksQuery();
  const { data, isLoading: loading } = useGetBatchQuery(fileIds, { skip: fileIds == null });

  const files = React.useMemo(
    () => data?.ids.map((id) => data?.entities[id]) ?? empty,
    [data?.ids, data?.entities]
  );

  React.useEffect(
    () => () => {
      dispatch(fileSelectionCleared());
    },
    []
  );

  React.useEffect(() => {
    const existingIds = fileIds?.filter((id) => selectedIds.has(id));
    if (existingIds != null && !shallowEqual(existingIds, [...selectedIds])) {
      dispatch(filesSelectionChanged({ ids: existingIds }));
    }
  }, [selectedIds, fileIds]);

  if (pathToPreview) {
    return <FilePreview pathToPreview={pathToPreview} files={files} />;
  }

  return (
    <div className="flex h-full flex-col">
      <BookmarkHeader />
      <BookmarkList
        files={files}
        filesById={data?.entities ?? {}}
        loading={loading}
        withSidePreview={withSidePreview}
      />
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
