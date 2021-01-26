import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';

const onClickFactory = (onClick, action, fileId) => (event) => {
  event.stopPropagation();
  if (action) {
    action(fileId);
  }
  onClick();
};

function FileActions({
  closeOverlay, fileId, filePath, onRename, onMove, onDelete, onDownload,
}) {
  const menu = [
    {
      name: 'Download',
      icon: <icons.Download />,
      onClick: onClickFactory(closeOverlay, onDownload, filePath),
    },
    {
      name: 'Rename',
      icon: <icons.ICursor />,
      onClick: onClickFactory(closeOverlay, onRename, fileId),
    },
    {
      name: 'Move',
      icon: <icons.FolderMove />,
      onClick: onClickFactory(closeOverlay, onMove, fileId),
    },
    {
      name: <span className="text-red-600">Delete</span>,
      icon: <icons.TrashOutlined className="text-red-600" />,
      onClick: onClickFactory(closeOverlay, onDelete, fileId),
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
  closeOverlay: PropTypes.func.isRequired,
  fileId: PropTypes.number.isRequired,
  filePath: PropTypes.string.isRequired,
  onRename: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
};

export default FileActions;
