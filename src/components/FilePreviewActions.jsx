import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';

import Button from './ui/Button';

function FilePreviewActions({
  fileId, filePath, onDelete, onDownload, onMove, onRename,
}) {
  const menu = [
    {
      name: 'Download',
      icon: <icons.Download className="w-4 h-4" />,
      danger: false,
      onClick: () => { onDownload(filePath); },
    },
    {
      name: 'Rename',
      icon: <icons.ICursor className="w-4 h-4" />,
      danger: false,
      onClick: () => { onRename(fileId); },
    },
    {
      name: 'Move',
      icon: <icons.Move className="w-4 h-4" />,
      danger: false,
      onClick: () => { onMove(fileId); },
    },
    {
      name: 'Delete',
      icon: <icons.TrashOutlined className="w-4 h-4" />,
      danger: true,
      onClick: () => { onDelete(fileId); },
    },
  ];

  return (
    <>
      {menu.map((item) => (
        <Button
          key={item.name}
          type="text"
          icon={item.icon}
          title={item.name}
          danger={item.danger}
          onClick={item.onClick}
        />
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
