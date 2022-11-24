import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { download } from '../store/files';
import { fileDialogOpened } from '../store/actions/ui';

import { TRASH_FOLDER_NAME, Dialogs } from '../constants';
import * as icons from '../icons';

import Button from './ui/Button';
import Menu from './ui/Menu';

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

function FileTableCellActions({ id, path }) {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  let menu;
  if (path.toLowerCase().startsWith(TRASH_FOLDER_NAME.toLowerCase())) {
    menu = [
      {
        name: t('Move'),
        icon: <icons.Move className="h-4 w-4" />,
        danger: false,
        onClick: () => {
          dispatch(fileDialogOpened(Dialogs.move, { fileIds: [id] }));
        },
      },
      {
        name: t('Delete Immediately'),
        icon: <icons.TrashOutlined className="h-4 w-4" />,
        danger: true,
        onClick: () => {
          dispatch(fileDialogOpened(Dialogs.deleteImmediately, { fileIds: [id] }));
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
          dispatch(fileDialogOpened(Dialogs.rename, { fileId: id }));
        },
      },
      {
        name: t('Move'),
        icon: <icons.Move className="h-4 w-4" />,
        danger: false,
        onClick: () => {
          dispatch(fileDialogOpened(Dialogs.move, { fileIds: [id] }));
        },
      },
      {
        name: t('Delete'),
        icon: <icons.TrashOutlined className="h-4 w-4" />,
        danger: true,
        onClick: () => {
          dispatch(fileDialogOpened(Dialogs.delete, { fileIds: [id] }));
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
  id: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default FileTableCellActions;
