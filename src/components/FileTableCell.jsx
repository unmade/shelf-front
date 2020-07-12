import React from 'react';
import { Link } from 'react-router-dom';

import * as icons from '../icons';

import Dropdown from './Dropdown';
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

function FileActions() {
  const menu = [
    {
      name: 'Download',
      icon: <icons.Download />,
    },
    {
      name: 'Rename',
      icon: <icons.ICursor />,
    },
    {
      name: 'Move',
      icon: <icons.FolderOutlined />,
    },
    {
      name: <span className="text-red-600">Delete</span>,
      icon: <icons.TrashOutlined className="text-red-600" />,
    },
  ];

  return (
    <div className="w-40 text-sm text-gray-700 p-2 bg-white py-2 rounded-md shadow-lg mt-1">
      {menu.map((item) => (
        <button
          key={item.name}
          type="button"
          className="w-full rounded px-4 py-2 hover:bg-gray-200 hover:shadow-sm"
        >
          <div className="flex flex-row items-center space-x-4">
            <p className="text-left flex-1">
              {item.name}
            </p>
            {item.icon}
          </div>
        </button>
      ))}
    </div>
  );
}

function FileTableCell({ item }) {
  const { type, name, size, mtime } = item;

  return (
    <div className="h-full flex flex-row items-center text-sm mx-4 border-gray-200">
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

      <Dropdown overlay={<FileActions />}>
        <button type="button" className="p-2 rounded-full text-gray-600 hover:text-blue-700">
          <icons.More />
        </button>
      </Dropdown>
      <div className="w-24 pr-4 text-right text-gray-600">
        <FileSize size={size} />
      </div>
      <div className="w-40 px-4 text-left text-gray-600">
        <TimeAgo mtime={mtime * 1000} />
      </div>
    </div>
  );
}

export default FileTableCell;
