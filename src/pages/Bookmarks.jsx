import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import useSidePreview from '../hooks/preview-available';

import { getBatch } from '../store/actions/files';
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
  const dispatch = useDispatch();
  const bookmarks = useSelector(getBookmarks);
  const loading = useSelector(getLoading);
  const withSidePreview = useSidePreview();
  const isLaptop = useMediaQuery({ query: MediaQuery.lg });

  const title = 'Bookmarks';

  React.useEffect(() => {
    dispatch(getBatch([...bookmarks]));
  }, [bookmarks, dispatch]);

  return (
    <>
      <div className="h-full flex flex-col">
        {/* header */}
        <div className="flex flex-row items-center justify-between px-6 sm:pl-5 sm:pr-8 py-7">
          {(!isLaptop) ? (
            <>
              <SideBarModal />
              <h2 className="ml-2 text-gray-900 truncate text-xl sm:text-3xl font-medium">
                {title}
              </h2>
            </>
          ) : (
            <div className="min-w-0 flex-1 flex items-center ">
              <icons.BookmarkOutlined className="w-7 h-7 text-gray-400 ml-2" />
              <h2 className="ml-2 text-gray-900 truncate text-xl sm:text-3xl font-medium">
                {title}
              </h2>
            </div>
          )}
          <div className="sm:ml-6 flex text-2xl items-center sm:space-x-8">
            {/* hack: this is to center text like on other pages */}
            <div className="w-9 h-9">
              &nbsp;
            </div>
          </div>
        </div>

        {/* bookmark list */}
        <div className="pt-4 flex flex-row flex-1">
          <div className={(withSidePreview) ? 'w-7/12' : 'w-full'}>
            <FileTableView
              className="border-transparent"
              items={[...bookmarks]}
              scrollKey="bookmarks-table-view" // possible collissions
              itemRender={FileTableCell}
              loading={loading}
            />
          </div>
          {(withSidePreview) && (
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
