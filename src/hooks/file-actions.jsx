import React from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { download } from '../store/files';

import { TRASH_FOLDER_NAME } from '../constants';
import * as icons from '../icons';

import { useCopyLinkDialog } from '../components/CopyLinkDialogProvider';
import { useDeleteDialog } from '../components/DeleteDialogProvider';
import { useDeleteImmediatelyDialog } from '../components/DeleteImmediatelyDialogProvider';
import { useMoveDialog } from '../components/MoveDialogProvider';
import { useRenameFileDialog } from '../components/RenameFileDialogProvider';

function isTrashed(path) {
  return path.toLowerCase().startsWith(`${TRASH_FOLDER_NAME.toLowerCase()}/`);
}

export function useCopyLinkAction(files) {
  const { t } = useTranslation();
  const openCopyLinkDialog = useCopyLinkDialog();

  if (files.length === 1 && !isTrashed(files[0].path)) {
    return {
      key: 'copy-link',
      name: t('Copy Link'),
      icon: <icons.LinkOutlined className="h-4 w-4" />,
      danger: false,
      onClick: () => {
        openCopyLinkDialog(files[0]);
      },
    };
  }
  return null;
}

export function useDeleteAction(files) {
  const { t } = useTranslation();
  const openDeleteDialog = useDeleteDialog();
  const openDeleteImmediatelyDialog = useDeleteImmediatelyDialog();

  const trashedFiles = files.filter((file) => isTrashed(file.path));
  if (trashedFiles.length > 0 && files.length !== trashedFiles.length) {
    return null;
  }
  if (trashedFiles.length > 0) {
    return {
      key: 'delete-immediately',
      name: t('Delete Immediately'),
      icon: <icons.TrashOutlined className="h-4 w-4" />,
      danger: true,
      onClick: () => {
        openDeleteImmediatelyDialog(files);
      },
    };
  }
  return {
    key: 'delete',
    name: t('Delete'),
    icon: <icons.TrashOutlined className="h-4 w-4" />,
    danger: true,
    onClick: () => {
      openDeleteDialog(files);
    },
  };
}

export function useDownloadAction(files) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  if (files.length === 1 && !isTrashed(files[0].path)) {
    return {
      key: 'download',
      name: t('Download'),
      icon: <icons.Download className="h-4 w-4" />,
      danger: false,
      onClick: () => {
        dispatch(download(files[0].path));
      },
    };
  }
  return null;
}

export function useMoveAction(files) {
  const { t } = useTranslation();

  const openMoveDialog = useMoveDialog();

  return {
    key: 'move',
    name: t('Move'),
    icon: <icons.Move className="h-4 w-4" />,
    danger: false,
    onClick: () => {
      openMoveDialog(files);
    },
  };
}

export function useRenameAction(files) {
  const { t } = useTranslation();
  const openRenameDialog = useRenameFileDialog();
  if (files.length === 1 && !isTrashed(files[0].path)) {
    return {
      key: 'rename',
      name: t('Rename'),
      icon: <icons.ICursor className="h-4 w-4" />,
      danger: false,
      onClick: () => {
        openRenameDialog(files[0]);
      },
    };
  }
  return null;
}

function useFileActions(files) {
  const copyLinkAction = useCopyLinkAction(files);
  const deleteAction = useDeleteAction(files);
  const downloadAction = useDownloadAction(files);
  const moveAction = useMoveAction(files);
  const renameAction = useRenameAction(files);

  const actions = [downloadAction, copyLinkAction, renameAction, moveAction, deleteAction];
  return actions.filter((action) => action != null);
}

export default useFileActions;
