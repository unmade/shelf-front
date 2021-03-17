import React, { useEffect } from 'react';

import { useMediaQuery } from 'react-responsive';

import { TRASH_FOLDER_NAME } from '../constants';
import * as icons from '../icons';
import * as routes from '../routes';

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
  const isMobile = !useMediaQuery({ query: '(min-width: 768px)' });
  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-row items-center justify-between space-x-4 text-lg p-4 border-b-2 border-gray-100">
        <span className="md:hidden">
          <Button
            type="text"
            size="lg"
            icon={<icons.Menu />}
          />
        </span>
        <div className="min-w-0 flex-1">
          <Breadcrumb
            items={routes.breadcrumbs(match.url)}
            single={isMobile}
            collapsed
            itemRender={({ name, path }) => (
              <Breadcrumb.Item path={path}>
                <span className="block truncate">
                  {name}
                </span>
              </Breadcrumb.Item>
            )}
            itemRenderCollapsed={({ name, path }) => (
              <Breadcrumb.ItemCollapsed path={path}>
                <span className="block truncate">
                  {name}
                </span>
              </Breadcrumb.ItemCollapsed>
            )}
          />
        </div>
        <Button
          type="text"
          title="Empty Trash"
          size="base"
          onClick={onEmptyTrash}
          icon={<icons.TrashOutlined className="w-5 h-5" />}
          danger
        />
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
