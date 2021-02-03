import React, { useEffect } from 'react';

import { TRASH_FOLDER_NAME } from '../constants';
import * as icons from '../icons';

import EmptyTrashDialog from '../containers/EmptyTrashDialog';
import FileTableCell from '../containers/FileTableCell';
import FileTableView from '../containers/FileTableView';

import Breadcrumbs from './ui/Breadcrumbs';

import BreadcrumbItem from './BreadcrumbItem';

function Trash({
  match, listFolder, deselectFiles, changePath, onEmptyTrash,
}) {
  let { dirPath } = match.params;
  dirPath = (dirPath) ? `${TRASH_FOLDER_NAME}/${dirPath}` : TRASH_FOLDER_NAME;

  useEffect(() => {
    changePath(dirPath);
    listFolder(dirPath);

    // we want to deselect all files when
    // current directory has changed
    deselectFiles();
  }, [dirPath, changePath, listFolder, deselectFiles]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-row justify-between p-4 border-b-2 border-gray-100">
        <Breadcrumbs path={match.url} itemRender={BreadcrumbItem} />

        <div className="flex flex-row">
          <button
            type="button"
            title="Empty Trash"
            className="mr-4 align-middle text-xl text-red-500 rounded-full"
            onClick={onEmptyTrash}
          >
            <icons.TrashOutlined />
          </button>
        </div>
      </div>

      <div className="flex-1">
        <FileTableView path={dirPath} itemRender={FileTableCell} />
      </div>

      <EmptyTrashDialog />
    </div>
  );
}

export default Trash;
