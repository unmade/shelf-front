import React from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { download } from '../store/files';

import { FileShape } from '../types';

import { TRASH_FOLDER_NAME } from '../constants';
import * as icons from '../icons';

import Button from './ui/Button';
import Menu from './ui/Menu';

import { useDeleteDialog } from './DeleteDialogProvider';
import { useDeleteImmediatelyDialog } from './DeleteImmediatelyDialogProvider';
import { useMoveDialog } from './MoveDialogProvider';
import { useRenameFileDialog } from './RenameFileDialogProvider';

const ActionButton = React.forwardRef(({ item }, ref) => (
  <Button
    innerRef={ref}
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
));

function FileTableCellActions({ item }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const openDeleteDialog = useDeleteDialog();
  const openDeleteImmediatelyDialog = useDeleteImmediatelyDialog();
  const openMoveDialog = useMoveDialog();
  const openRenameDialog = useRenameFileDialog();

  const { path } = item;

  let menu;
  if (path.toLowerCase().startsWith(TRASH_FOLDER_NAME.toLowerCase())) {
    menu = [
      {
        name: t('Move'),
        icon: <icons.Move className="h-4 w-4" />,
        danger: false,
        onClick: () => {
          openMoveDialog([item]);
        },
      },
      {
        name: t('Delete Immediately'),
        icon: <icons.TrashOutlined className="h-4 w-4" />,
        danger: true,
        onClick: () => {
          openDeleteImmediatelyDialog([item]);
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
          dispatch(download(path));
        },
      },
      {
        name: t('Rename'),
        icon: <icons.ICursor className="h-4 w-4" />,
        danger: false,
        onClick: () => {
          openRenameDialog(item);
        },
      },
      {
        name: t('Move'),
        icon: <icons.Move className="h-4 w-4" />,
        danger: false,
        onClick: () => {
          openMoveDialog([item]);
        },
      },
      {
        name: t('Delete'),
        icon: <icons.TrashOutlined className="h-4 w-4" />,
        danger: true,
        onClick: () => {
          openDeleteDialog([item]);
        },
      },
    ];
  }

  return (
    <Menu items={menu} itemRender={ActionButton}>
      <Button
        as="div"
        type="text"
        size="lg"
        icon={<icons.MoreOutlined className="h-4 w-4 dark:text-zinc-400" />}
      />
    </Menu>
  );
}

FileTableCellActions.propTypes = {
  item: FileShape.isRequired,
};

export default FileTableCellActions;
