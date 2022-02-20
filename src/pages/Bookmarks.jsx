import React from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import useSidePreview from '../hooks/preview-available';

import { getBatch } from '../store/actions/files';
import { scopes } from '../store/actions/loading';
import { getLoading } from '../store/reducers/loading';
import { getBookmarks } from '../store/reducers/users';

import * as icons from '../icons';
import { Dialogs, MediaQuery } from '../constants';

import CreateFolderDialog from '../containers/CreateFolderDialog';
import RenameFileDialog from '../containers/RenameFileDialog';

import DeleteDialog from '../components/DeleteDialog';
import FileTableView from '../components/FileTableView';
import FileTableCell from '../components/FileTableCell';
import MoveDialog from '../components/MoveDialog';
import SideBarModal from '../components/SideBarModal';
import SidePreview from '../components/Browser/SidePreview';

function Bookmarks() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const bookmarks = useSelector(getBookmarks);
  const loading = useSelector((state) => getLoading(state, scopes.listingBookmarks));
  const withSidePreview = useSidePreview();
  const isLaptop = useMediaQuery({ query: MediaQuery.lg });

  const title = t('Bookmarks');

  React.useEffect(() => {
    dispatch(getBatch([...bookmarks]));
  }, [bookmarks, dispatch]);

  return (
    <>
      <div className="flex h-full flex-col">
        {/* header */}
        <div className="flex flex-row items-center justify-between px-6 py-7 sm:pl-5 sm:pr-8">
          {!isLaptop ? (
            <>
              <SideBarModal />
              <h2 className="ml-2 truncate text-xl font-medium text-gray-900 sm:text-3xl">
                {title}
              </h2>
            </>
          ) : (
            <div className="flex min-w-0 flex-1 items-center ">
              <icons.BookmarkOutlined className="ml-2 h-7 w-7 text-gray-400" />
              <h2 className="ml-2 truncate text-xl font-medium text-gray-900 sm:text-3xl">
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
              items={[...bookmarks]}
              scrollKey="bookmarks-table-view" // possible collissions
              itemRender={FileTableCell}
              loading={loading}
            />
          </div>
          {withSidePreview && (
            <div className="w-5/12">
              <SidePreview />
            </div>
          )}
        </div>
      </div>
      <CreateFolderDialog uid={Dialogs.createFolder} />
      <RenameFileDialog uid={Dialogs.rename} />
      <MoveDialog uid={Dialogs.move} />
      <DeleteDialog uid={Dialogs.delete} />
    </>
  );
}

export default Bookmarks;
