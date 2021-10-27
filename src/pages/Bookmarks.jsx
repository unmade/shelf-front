import React from 'react';

import * as icons from '../icons';

import FileTableView from '../containers/FileTableView';
import FileTableCell from '../components/FileTableCell';

function Bookmarks() {
  const dirPath = '.';
  return (
    <div className="h-full flex flex-col">
      {/* header */}
      <div className="flex flex-row items-center justify-between px-6 sm:pl-5 sm:pr-8 py-7">
        <div className="min-w-0 flex-1 flex items-center ">
          <icons.BookmarkOutlined className="w-7 h-7 text-gray-400 ml-2" />
          <h2 className="ml-2 text-gray-900 truncate text-xl sm:text-3xl font-medium">
            Bookmarks
          </h2>
        </div>
      </div>

      {/* bookmark list */}
      <div className="pt-4 flex flex-row flex-1">
        <div className="w-full">
          <FileTableView path={dirPath ?? '.'} itemRender={FileTableCell} />
        </div>
      </div>
    </div>
  );
}

export default Bookmarks;
