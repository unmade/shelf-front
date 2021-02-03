import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { TRASH_FOLDER_NAME } from '../constants';
import * as icons from '../icons';

import EmptyTrashDialog from '../containers/EmptyTrashDialog';
import FileTableView from '../containers/FileTableView';

import Breadcrumbs from './Breadcrumbs';
import FileTableCell from '../containers/FileTableCell';

function breadcrumbsFromPath(path) {
  const breadcrumbs = [];

  const parts = path.split('/').filter((e) => e !== '' && e !== '.');
  let prefix = '/files';
  parts.forEach((part) => {
    prefix = `${prefix}/${part}`;
    breadcrumbs.push({
      path: prefix,
      name: part,
    });
  });

  return breadcrumbs;
}

function Trash({
  match, listFolder, deselectFiles, changePath, onEmptyTrash,
}) {
  let { dirPath } = match.params;
  dirPath = (dirPath) ? `${TRASH_FOLDER_NAME}/${dirPath}` : TRASH_FOLDER_NAME;
  const breadcrumbs = breadcrumbsFromPath(dirPath);

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
        <Breadcrumbs>
          {breadcrumbs.map(({ name, path }) => (
            <NavLink
              key={path}
              to={path}
              className="font-semibold text-gray-600 hover:text-blue-500"
              activeClassName="text-gray-800 pointer-events-none"
              exact
            >
              {name}
            </NavLink>
          ))}
        </Breadcrumbs>

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
