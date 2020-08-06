import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';

function FileActions({ fileId, onRename }) {
  const defaultCallback = (event) => event.stopPropagation();
  const menu = [
    {
      name: 'Download',
      icon: <icons.Download />,
      callback: defaultCallback,
    },
    {
      name: 'Rename',
      icon: <icons.ICursor />,
      callback: (event) => { event.stopPropagation(); onRename(fileId); },
    },
    {
      name: 'Move',
      icon: <icons.FolderMove />,
      callback: defaultCallback,
    },
    {
      name: <span className="text-red-600">Delete</span>,
      icon: <icons.TrashOutlined className="text-red-600" />,
      callback: defaultCallback,
    },
  ];

  return (
    <div className="w-40 text-sm text-gray-700 p-2 bg-white py-2 rounded-md shadow-lg mt-1">
      {menu.map((item) => (
        <button
          key={item.name}
          type="button"
          className="w-full rounded px-4 py-2 hover:bg-gray-100"
          onClick={item.callback}
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

FileActions.propTypes = {
  fileId: PropTypes.number.isRequired,
  onRename: PropTypes.func.isRequired,
};

export default FileActions;
