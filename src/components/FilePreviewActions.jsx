import React from 'react';
import PropTypes from 'prop-types';

import { Dialogs, TRASH_FOLDER_NAME } from '../constants';
import * as icons from '../icons';

import Button from './ui/Button';

function FilePreviewActions({ id, path, onDownload, openDialog }) {
  let menu;
  if (path.toLowerCase().startsWith(TRASH_FOLDER_NAME.toLowerCase())) {
    menu = [
      {
        name: 'Delete Immediately',
        icon: <icons.TrashOutlined className="w-4 h-4" />,
        danger: true,
        onClick: () => { openDialog(Dialogs.deleteImmediately, { fileId: id }); },
      },
    ];
  } else {
    menu = [
      {
        name: 'Download',
        icon: <icons.Download className="w-4 h-4" />,
        danger: false,
        onClick: () => { onDownload(path); },
      },
      {
        name: 'Rename',
        icon: <icons.ICursor className="w-4 h-4" />,
        danger: false,
        onClick: () => { openDialog(Dialogs.rename, { fileId: id }); },
      },
      {
        name: 'Move',
        icon: <icons.Move className="w-4 h-4" />,
        danger: false,
        onClick: () => { openDialog(Dialogs.move, { fileId: id }); },
      },
      {
        name: 'Delete',
        icon: <icons.TrashOutlined className="w-4 h-4" />,
        danger: true,
        onClick: () => { openDialog(Dialogs.delete, { fileId: id }); },
      },
    ];
  }

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
  id: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  onDownload: PropTypes.func.isRequired,
  openDialog: PropTypes.func.isRequired,
};

export default FilePreviewActions;
