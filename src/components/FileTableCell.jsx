import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import * as icons from '../icons';

const TYPE_FOLDER = "folder";


function FileIcon({ item }) {
  const { type, name } = item;

  if (type === TYPE_FOLDER) {
      return (
        <icons.Folder className="text-blue-400 w-6 h-6" />
      );
  }

  const ext = `.${name.split('.').pop()}`;
  const Icon = icons.getIconByExt(ext);
  return (
    <Icon className="w-6 h-6" />
  );
}


function FileTableCell({ item }) {
  const match = useRouteMatch();
  const { type, name, size, mtime } = item;

  return (
    <div className="h-full flex flex-row items-center space-x-4 text-sm mx-4 border-b border-gray-200">
      <div>
        <input type="checkbox" />
      </div>
      <div className="w-3/4">
        <div className="flex flex-row items-center space-x-2">
          <FileIcon item={item} />
          {(type === TYPE_FOLDER) ? (
            <Link to={`/files/${item.path}`}>
              {name}
            </Link>
          ) : (
            <Link to={`${match.url}?preview=${item.name}`}>
              {name}
            </Link>
          )}
        </div>
      </div>
      <div className="text-right text-gray-600">
          {size}
      </div>
      <div className="w-1/4 text-center text-gray-600">
        {mtime}
      </div>
    </div>
  )
}

export default FileTableCell;
