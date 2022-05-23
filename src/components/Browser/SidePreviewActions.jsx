import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { performDownload } from '../../store/actions/files';
import { fileDialogOpened } from '../../store/actions/ui';

import { getCurrentPath } from '../../store/reducers/ui';

import { Dialogs, TRASH_FOLDER_NAME } from '../../constants';
import * as icons from '../../icons';

import Button from '../ui/Button';

function singleFileActions({ id, path, trashed, dispatch }) {
  const { t } = useTranslation();

  if (trashed) {
    return [
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
  }

  return [
    {
      name: t('Download'),
      icon: <icons.Download className="h-4 w-4" />,
      danger: false,
      onClick: () => {
        dispatch(performDownload(path));
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

function multiFileActions({ fileIds, trashed, dispatch }) {
  const { t } = useTranslation();

  if (trashed) {
    return [
      {
        name: t('Move'),
        icon: <icons.Move className="h-4 w-4" />,
        danger: false,
        onClick: () => {
          dispatch(fileDialogOpened(Dialogs.move, { fileIds }));
        },
      },
      {
        name: t('Delete Immediately'),
        icon: <icons.TrashOutlined className="h-4 w-4" />,
        danger: true,
        onClick: () => {
          dispatch(fileDialogOpened(Dialogs.deleteImmediately, { fileIds }));
        },
      },
    ];
  }

  return [
    {
      name: t('Move'),
      icon: <icons.Move className="h-4 w-4" />,
      danger: false,
      onClick: () => {
        dispatch(fileDialogOpened(Dialogs.move, { fileIds }));
      },
    },
    {
      name: t('Delete'),
      icon: <icons.TrashOutlined className="h-4 w-4" />,
      danger: true,
      onClick: () => {
        dispatch(fileDialogOpened(Dialogs.delete, { fileIds }));
      },
    },
  ];
}

function SidePreviewActions({ files }) {
  const dispatch = useDispatch();
  const currentPath = useSelector(getCurrentPath);
  const trashed = currentPath.toLowerCase().startsWith(TRASH_FOLDER_NAME.toLowerCase());

  let menu;
  if (files.length === 1) {
    const [file] = files;
    menu = singleFileActions({
      id: file.id,
      path: file.path,
      trashed,
      dispatch,
    });
  } else {
    menu = multiFileActions({
      fileIds: files.map((file) => file.id),
      trashed,
      dispatch,
    });
  }

  return (
    <>
      {menu.map((item) => (
        <Button
          key={item.name}
          type="text"
          size="lg"
          icon={item.icon}
          title={item.name}
          danger={item.danger}
          onClick={item.onClick}
        />
      ))}
    </>
  );
}

SidePreviewActions.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default SidePreviewActions;
