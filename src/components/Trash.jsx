import React, { useEffect } from 'react';

import { TRASH_FOLDER_NAME } from '../constants';
import * as icons from '../icons';

import DeleteImmediatelyDialog from '../containers/DeleteImmediatelyDialog';
import EmptyTrashDialog from '../containers/EmptyTrashDialog';
import FileTableCell from '../containers/FileTableCell';
import FileTableView from '../containers/FileTableView';

import Breadcrumb from './ui/Breadcrumb';
import Button from './ui/Button';

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
        <Breadcrumb
          path={match.url}
          itemRender={({ name, path }) => (
            <Breadcrumb.Item path={path}>
              {name}
            </Breadcrumb.Item>
          )}
          itemRenderCollapse={({ name, path }) => (
            <Breadcrumb.ItemCollapsed path={path}>
              {name}
            </Breadcrumb.ItemCollapsed>
          )}
          collapsed
        />
        <div className="flex flex-row">
          <Button
            type="text"
            title="Empty Trash"
            onClick={onEmptyTrash}
            icon={<icons.TrashOutlined className="w-5 h-5" />}
            danger
          />
        </div>
      </div>

      <div className="flex-1">
        <FileTableView path={dirPath} itemRender={FileTableCell} />
      </div>

      <EmptyTrashDialog />
      <DeleteImmediatelyDialog />
    </div>
  );
}

export default Trash;
