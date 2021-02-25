import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';

function FilePreviewActions({
  fileId, filePath, onDelete, onDownload, onMove, onRename,
}) {
  const menu = [
    {
      name: 'Download',
      icon: <icons.Download className="w-4 h-4" />,
      onClick: () => { onDownload(filePath); },
    },
    {
      name: 'Rename',
      icon: <icons.ICursor className="w-4 h-4" />,
      onClick: () => { onRename(fileId); },
    },
    {
      name: 'Move',
      icon: <icons.Move className="w-4 h-4" />,
      onClick: () => { onMove(fileId); },
    },
    {
      name: <span className="text-red-600">Delete</span>,
      icon: <icons.TrashOutlined className="w-4 h-4 text-red-600" />,
      onClick: () => { onDelete(fileId); },
    },
  ];

  return (
    <>
      {menu.map((item) => (
        <button
          key={item.name}
          type="button"
          className="p-1 rounded-md hover:bg-gray-100"
          title={item.name}
          onClick={item.onClick}
        >
          {item.icon}
        </button>
      ))}
    </>
  );
}

FilePreviewActions.propTypes = {
  fileId: PropTypes.string.isRequired,
  filePath: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onRename: PropTypes.func.isRequired,
};

export default FilePreviewActions;
