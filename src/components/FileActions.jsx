import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';

function FileActions({ closePopover, fileId, onRename, onDelete }) {
  const onClickFactory = (callback) => (event) => {
    event.stopPropagation();
    if (callback) {
      callback(fileId);
    }
    closePopover();
  };

  const menu = [
    {
      name: 'Download',
      icon: <icons.Download />,
      onClick: onClickFactory(),
    },
    {
      name: 'Rename',
      icon: <icons.ICursor />,
      onClick: onClickFactory(onRename),
    },
    {
      name: 'Move',
      icon: <icons.FolderMove />,
      onClick: onClickFactory(),
    },
    {
      name: <span className="text-red-600">Delete</span>,
      icon: <icons.TrashOutlined className="text-red-600" />,
      onClick: onClickFactory(onDelete),
    },
  ];

  return (
    <div className="w-40 text-sm text-gray-700 p-2 bg-white py-2 rounded-md shadow-lg mt-1">
      {menu.map((item) => (
        <button
          key={item.name}
          type="button"
          className="w-full rounded px-4 py-2 hover:bg-gray-100"
          onClick={item.onClick}
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
  closePopover: PropTypes.func.isRequired,
  fileId: PropTypes.number.isRequired,
  onRename: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default FileActions;
