import React from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { useAppDispatch } from 'hooks';
import * as icons from 'icons';
import * as routes from 'routes';
import { IFile } from 'types/files';

import { selectIsBookmarked, useAddBookmarkMutation, useRemoveBookmarkMutation } from 'store/users';
import { download } from 'store/files';
import { RootState } from 'store/store';

import { useCopyLinkDialog } from 'components/CopyLinkDialogProvider';
import { useDeleteDialog } from 'components/DeleteDialogProvider';
import { useDeleteImmediatelyDialog } from 'components/DeleteImmediatelyDialogProvider';
import { useMoveDialog } from 'components/MoveDialogProvider';
import { useRenameFileDialog } from 'components/RenameFileDialogProvider';

export interface IAction {
  key: string;
  name: string;
  Icon: React.ElementType;
  icon: React.ReactElement;
  danger: boolean;
  onClick: () => void;
}

export function useFavouriteAction(files: IFile[]): IAction {
  const { t } = useTranslation();

  const bookmarked = useSelector((state: RootState) => selectIsBookmarked(state, files[0]?.id));

  const [addBookmark] = useAddBookmarkMutation();
  const [removeBookmark] = useRemoveBookmarkMutation();

  if (bookmarked) {
    return {
      key: 'unfavourite',
      name: t('Unfavourite'),
      Icon: icons.Heart,
      icon: <icons.Heart className="h-4 w-4" />,
      danger: false,
      onClick: () => {
        removeBookmark(files[0].id);
      },
    };
  }
  return {
    key: 'favourite',
    name: t('Favourite'),
    Icon: icons.HeartOutlined,
    icon: <icons.HeartOutlined className="h-4 w-4" />,
    danger: false,
    onClick: () => {
      addBookmark(files[0].id);
    },
  };
}

export function useCopyLinkAction(files: IFile[]): IAction | null {
  const { t } = useTranslation();
  const { openDialog } = useCopyLinkDialog();

  if (files.length === 1 && !routes.isTrashed(files[0].path)) {
    return {
      key: 'copy-link',
      name: t('Share Link'),
      Icon: icons.LinkOutlined,
      icon: <icons.LinkOutlined className="h-4 w-4" />,
      danger: false,
      onClick: () => {
        openDialog(files[0]);
      },
    };
  }
  return null;
}

export function useDeleteAction(files: IFile[]): IAction | null {
  const { t } = useTranslation();
  const { openDialog: openDeleteDialog } = useDeleteDialog();

  return {
    key: 'delete',
    name: t('Delete'),
    Icon: icons.TrashOutlined,
    icon: <icons.TrashOutlined className="h-4 w-4" />,
    danger: true,
    onClick: () => {
      openDeleteDialog(files);
    },
  };
}

export function useDeleteImmediatelyAction(files: IFile[]): IAction | null {
  const { t } = useTranslation();
  const { openDialog: openDeleteImmediatelyDialog } = useDeleteImmediatelyDialog();

  const trashedFiles = files.filter(
    (file) => routes.isTrashed(file.path) || file.deleted_at != null,
  );
  if (trashedFiles.length > 0 && files.length !== trashedFiles.length) {
    return null;
  }
  if (trashedFiles.length > 0) {
    return {
      key: 'delete-immediately',
      name: t('Delete Immediately'),
      Icon: icons.TrashOutlined,
      icon: <icons.TrashOutlined className="h-4 w-4" />,
      danger: true,
      onClick: () => {
        openDeleteImmediatelyDialog(files);
      },
    };
  }
  return null;
}

export function useDownloadAction(files: IFile[]): IAction | null {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  if (files.length === 1 && !routes.isTrashed(files[0].path)) {
    return {
      key: 'download',
      name: t('Download'),
      Icon: icons.Download,
      icon: <icons.Download className="h-4 w-4" />,
      danger: false,
      onClick: () => {
        dispatch(download(files[0].path));
      },
    };
  }
  return null;
}

export function useMoveAction(files: IFile[]): IAction | null {
  const { t } = useTranslation();

  const { openDialog: openMoveDialog } = useMoveDialog();

  return {
    key: 'move',
    name: t('Move'),
    Icon: icons.Move,
    icon: <icons.Move className="h-4 w-4" />,
    danger: false,
    onClick: () => {
      openMoveDialog(files);
    },
  };
}

export function useRenameAction(files: IFile[]): IAction | null {
  const { t } = useTranslation();
  const { openDialog: openRenameDialog } = useRenameFileDialog();
  if (files.length === 1 && !routes.isTrashed(files[0].path)) {
    return {
      key: 'rename',
      name: t('Rename'),
      Icon: icons.ICursor,
      icon: <icons.ICursor className="h-4 w-4" />,
      danger: false,
      onClick: () => {
        openRenameDialog(files[0]);
      },
    };
  }
  return null;
}
