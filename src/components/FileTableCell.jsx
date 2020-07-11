import React from 'react';
import { Link } from 'react-router-dom';

import * as icons from '../icons';

import FileSize from './FileSize';
import TimeAgo from './TimeAgo';

const TYPE_FOLDER = 'folder';

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
  const { type, name, size, mtime } = item;

  return (
    <div className="h-full flex flex-row items-center space-x-4 text-sm mx-4 border-gray-200">
      <div className="flex-1">
        <div className="flex flex-row items-center space-x-2">
          <FileIcon item={item} />
          {(type === TYPE_FOLDER) ? (
            <Link to={`/files/${item.path}`}>
              {name}
            </Link>
          ) : (
            <button type="button">
              {name}
            </button>
          )}
        </div>
      </div>
      <div className="w-32 px-4 text-right text-gray-600">
        <FileSize size={size} />
      </div>
      <div className="w-40 px-4 text-left text-gray-600">
        <TimeAgo mtime={mtime * 1000} />
      </div>
    </div>
  );
}

export default FileTableCell;
