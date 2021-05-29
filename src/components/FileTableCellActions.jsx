import React from 'react';
import PropTypes from 'prop-types';

import { TRASH_FOLDER_NAME, Dialogs } from '../constants';
import * as icons from '../icons';

import Button from './ui/Button';
import Menu from './ui/Menu';

function FileTableCellActions({ id, path, onDownload, openDialog }) {
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
    <Menu
      items={menu}
      itemRender={({ item }) => (
        <Button
          key={item.name}
          type="text"
          onClick={(event) => { event.stopPropagation(); item.onClick(); }}
          danger={item.danger}
        >
          <div className="whitespace-nowrap w-full flex flex-row items-center justify-between my-1">
            <div>{item.name}</div>
            <div className="ml-6">{item.icon}</div>
          </div>
        </Button>
      )}
    >
      <Button as="div" type="text" icon={<icons.More />} />
    </Menu>
  );
}

FileTableCellActions.propTypes = {
  id: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  onDownload: PropTypes.func.isRequired,
  openDialog: PropTypes.func.isRequired,
};

export default FileTableCellActions;
