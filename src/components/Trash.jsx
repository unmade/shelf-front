import React, { useEffect } from 'react';

import { Dialogs, TRASH_FOLDER_NAME } from '../constants';
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

  const breadcrumbs = routes.breadcrumbs(match.url);
  let currentFolder;
  if (breadcrumbs.length === 1) {
    currentFolder = breadcrumbs[breadcrumbs.length - 1];
  } else {
    currentFolder = breadcrumbs.pop();
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-row items-center justify-between text-xl sm:text-3xl px-8 pt-4 border-gray-100">
        <h2 className="text-gray-900 truncate font-medium max-w-1.5xs sm:max-w-xs lg:max-w-md">
          {currentFolder.name}
        </h2>
        <Button
          type="primary"
          title="Empty Trash"
          size="base"
          onClick={() => { onEmptyTrash(Dialogs.emptyTrash); }}
          icon={<icons.TrashOutlined className="w-5 h-5" />}
          danger
        />
      </div>
      <Breadcrumb
        className="px-8 pt-2 pb-4"
        items={breadcrumbs}
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

      <div className="flex-1">
        <FileTableView path={dirPath} itemRender={FileTableCell} />
      </div>

      <EmptyTrashDialog uid={Dialogs.emptyTrash} />
      <DeleteImmediatelyDialog uid={Dialogs.deleteImmediately} />
    </div>
  );
}

export default Trash;
