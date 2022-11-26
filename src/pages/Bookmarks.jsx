import React from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import useSidePreview from '../hooks/preview-available';

import { fileSelectionCleared } from '../store/browser';
import { useGetBatchQuery } from '../store/files';
import { useListBookmarksQuery } from '../store/users';

import * as icons from '../icons';
import { MediaQuery } from '../constants';

import DeleteDialogProvider from '../components/DeleteDialogProvider';
import FileTableView from '../components/FileTableView';
import FileTableCell from '../components/FileTableCell';
import MoveDialogProvider from '../components/MoveDialogProvider';
import RenameFileDialogProvider from '../components/RenameFileDialogProvider';
import SideBarModal from '../components/SideBarModal';
import SidePreview from '../components/Browser/SidePreview';

const empty = [];

function Bookmarks() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data: fileIds } = useListBookmarksQuery();
  const { data: files, isLoading } = useGetBatchQuery(fileIds, { skip: fileIds == null });
  const withSidePreview = useSidePreview();
  const isLaptop = useMediaQuery({ query: MediaQuery.lg });

  const title = t('Bookmarks');

  React.useEffect(
    () => () => {
      dispatch(fileSelectionCleared());
    },
    []
  );

  return (
    <DeleteDialogProvider>
      <MoveDialogProvider>
        <RenameFileDialogProvider>
          <div className="flex h-full flex-col">
            {/* header */}
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

            {/* bookmark list */}
            <div className="flex flex-1 flex-row pt-4">
              <div className={withSidePreview ? 'w-7/12' : 'w-full'}>
                <FileTableView
                  className="border-transparent"
                  items={files ?? empty}
                  scrollKey="bookmarks-table-view" // possible collissions
                  itemRender={FileTableCell}
                  loading={isLoading}
                  emptyIcon={
                    <icons.BookmarkAltOutlined className="h-12 w-12 text-gray-400 dark:text-zinc-500" />
                  }
                  emptyTitle={t('Bookmarks will appear here')}
                />
              </div>
              {withSidePreview && (
                <div className="w-5/12">
                  <SidePreview />
                </div>
              )}
            </div>
          </div>
        </RenameFileDialogProvider>
      </MoveDialogProvider>
    </DeleteDialogProvider>
  );
}

export default Bookmarks;
