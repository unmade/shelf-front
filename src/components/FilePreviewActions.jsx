import React from 'react';
import PropTypes from 'prop-types';

import { Dialogs } from '../constants';
import * as icons from '../icons';

import Button from './ui/Button';

function FilePreviewActions({ fileId, filePath, onDownload, openDialog }) {
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
      onClick: () => { openDialog(Dialogs.rename, { fileId }); },
    },
    {
      name: 'Move',
      icon: <icons.Move className="w-4 h-4" />,
      danger: false,
      onClick: () => { openDialog(Dialogs.move, { fileId }); },
    },
    {
      name: 'Delete',
      icon: <icons.TrashOutlined className="w-4 h-4" />,
      danger: true,
      onClick: () => { openDialog(Dialogs.delete, { fileId }); },
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
  onDownload: PropTypes.func.isRequired,
  openDialog: PropTypes.func.isRequired,
};

export default FilePreviewActions;
