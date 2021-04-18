import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';
import { TRASH_FOLDER_NAME } from '../constants';

import Button from './ui/Button';
import Menu from './ui/Menu';

function FileTableCellActions({
  id,
  path,
  onDelete,
  onDeleteImmediately,
  onDownload,
  onMove,
  onRename,
}) {
  let menu;
  if (path.toLowerCase().startsWith(TRASH_FOLDER_NAME.toLowerCase())) {
    menu = [
      {
        name: 'Delete Immediately',
        icon: <icons.TrashOutlined className="w-4 h-4" />,
        danger: true,
        onClick: () => { onDeleteImmediately(id); },
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
        onClick: () => { onRename(id); },
      },
      {
        name: 'Move',
        icon: <icons.Move className="w-4 h-4" />,
        danger: false,
        onClick: () => { onMove(id); },
      },
      {
        name: 'Delete',
        icon: <icons.TrashOutlined className="w-4 h-4" />,
        danger: true,
        onClick: () => { onDelete(id); },
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
          <div className="w-full flex flex-row items-center justify-between my-1">
            <span>{item.name}</span>
            <span className="ml-6">{item.icon}</span>
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
};

export default FileTableCellActions;
