import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentPath } from '../../store/browser';
import { download } from '../../store/files';

import { TRASH_FOLDER_NAME } from '../../constants';
import * as icons from '../../icons';

import Button from '../ui/Button';

import { useDeleteDialog } from '../DeleteDialogProvider';
import { useDeleteImmediatelyDialog } from '../DeleteImmediatelyDialogProvider';
import { useMoveDialog } from '../MoveDialogProvider';
import { useRenameFileDialog } from '../RenameFileDialogProvider';
import { FileShape } from '../../types';

function singleFileActions({ file, trashed, dispatch }) {
  const { t } = useTranslation();

  const openDeleteDialog = useDeleteDialog();
  const openDeleteImmediatelyDialog = useDeleteImmediatelyDialog();
  const openMoveDialog = useMoveDialog();
  const openRenameDialog = useRenameFileDialog();

  if (trashed) {
    return [
      {
        name: t('Move'),
        icon: <icons.Move className="h-4 w-4" />,
        danger: false,
        onClick: () => {
          openMoveDialog([file]);
        },
      },
      {
        name: t('Delete Immediately'),
        icon: <icons.TrashOutlined className="h-4 w-4" />,
        danger: true,
        onClick: () => {
          openDeleteImmediatelyDialog([file]);
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
        dispatch(download(file.path));
      },
    },
    {
      name: t('Rename'),
      icon: <icons.ICursor className="h-4 w-4" />,
      danger: false,
      onClick: () => {
        openRenameDialog(file);
      },
    },
    {
      name: t('Move'),
      icon: <icons.Move className="h-4 w-4" />,
      danger: false,
      onClick: () => {
        openMoveDialog([file]);
      },
    },
    {
      name: t('Delete'),
      icon: <icons.TrashOutlined className="h-4 w-4" />,
      danger: true,
      onClick: () => {
        openDeleteDialog([file]);
      },
    },
  ];
}

function multiFileActions({ files, trashed }) {
  const { t } = useTranslation();

  const openDeleteDialog = useDeleteDialog();
  const openDeleteImmediatelyDialog = useDeleteImmediatelyDialog();
  const openMoveDialog = useMoveDialog();

  if (trashed) {
    return [
      {
        name: t('Move'),
        icon: <icons.Move className="h-4 w-4" />,
        danger: false,
        onClick: () => {
          openMoveDialog(files);
        },
      },
      {
        name: t('Delete Immediately'),
        icon: <icons.TrashOutlined className="h-4 w-4" />,
        danger: true,
        onClick: () => {
          openDeleteImmediatelyDialog(files);
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
        openMoveDialog(files);
      },
    },
    {
      name: t('Delete'),
      icon: <icons.TrashOutlined className="h-4 w-4" />,
      danger: true,
      onClick: () => {
        openDeleteDialog(files);
      },
    },
  ];
}

function SidePreviewActions({ files }) {
  const dispatch = useDispatch();
  const currentPath = useSelector(selectCurrentPath);
  const trashed = currentPath.toLowerCase().startsWith(TRASH_FOLDER_NAME.toLowerCase());

  let menu;
  if (files.length === 1) {
    const [file] = files;
    menu = singleFileActions({
      file,
      trashed,
      dispatch,
    });
  } else {
    menu = multiFileActions({
      files,
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
  files: PropTypes.arrayOf(FileShape).isRequired,
};

export default SidePreviewActions;
