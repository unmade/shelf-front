import React, { useEffect } from 'react';

import { useMediaQuery } from 'react-responsive';

import { MediaQuery, TRASH_FOLDER_NAME } from '../constants';
import * as icons from '../icons';
import * as routes from '../routes';

import DeleteImmediatelyDialog from '../containers/DeleteImmediatelyDialog';
import EmptyTrashDialog from '../containers/EmptyTrashDialog';
import FileTableCell from '../containers/FileTableCell';
import FileTableView from '../containers/FileTableView';

import Breadcrumb from './ui/Breadcrumb';
import Button from './ui/Button';

import AppMenuModal from './AppMenuModal';

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

  const isTablet = useMediaQuery({ query: MediaQuery.sm });
  const isLaptop = useMediaQuery({ query: MediaQuery.lg });
  let fold = Breadcrumb.Fold.collapse;
  if (!isTablet) {
    fold = Breadcrumb.Fold.single;
  } else if (isLaptop) {
    fold = Breadcrumb.Fold.collapseWide;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-row items-center justify-between space-x-4 text-lg p-4 border-b-2 border-gray-100">
        <div className="min-w-0 flex-1 inline-flex items-center space-x-4">
          {(!isLaptop) && (
            <AppMenuModal />
          )}
          <span className="min-w-0 w-full">
            <Breadcrumb
              items={routes.breadcrumbs(match.url)}
              fold={fold}
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
          </span>
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
