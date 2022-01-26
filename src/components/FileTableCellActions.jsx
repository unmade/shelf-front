import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import { TRASH_FOLDER_NAME, Dialogs } from '../constants';
import * as icons from '../icons';

import Button from './ui/Button';
import Menu from './ui/Menu';

function FileTableCellActions({ id, path, onDownload, openDialog }) {
  const { t } = useTranslation();

  let menu;
  if (path.toLowerCase().startsWith(TRASH_FOLDER_NAME.toLowerCase())) {
    menu = [
      {
        name: t('Move'),
        icon: <icons.Move className="h-4 w-4" />,
        danger: false,
        onClick: () => {
          openDialog(Dialogs.move, { fileIds: [id] });
        },
      },
      {
        name: t('Delete Immediately'),
        icon: <icons.TrashOutlined className="h-4 w-4" />,
        danger: true,
        onClick: () => {
          openDialog(Dialogs.deleteImmediately, { fileIds: [id] });
        },
      },
    ];
  } else {
    menu = [
      {
        name: t('Download'),
        icon: <icons.Download className="h-4 w-4" />,
        danger: false,
        onClick: () => {
          onDownload(path);
        },
      },
      {
        name: t('Rename'),
        icon: <icons.ICursor className="h-4 w-4" />,
        danger: false,
        onClick: () => {
          openDialog(Dialogs.rename, { fileId: id });
        },
      },
      {
        name: t('Move'),
        icon: <icons.Move className="h-4 w-4" />,
        danger: false,
        onClick: () => {
          openDialog(Dialogs.move, { fileIds: [id] });
        },
      },
      {
        name: t('Delete'),
        icon: <icons.TrashOutlined className="h-4 w-4" />,
        danger: true,
        onClick: () => {
          openDialog(Dialogs.delete, { fileIds: [id] });
        },
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
          onClick={(event) => {
            event.stopPropagation();
            item.onClick();
          }}
          danger={item.danger}
        >
          <div className="my-1 flex w-full flex-row items-center justify-between whitespace-nowrap">
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
