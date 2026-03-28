import type React from 'react';

import { useTranslation } from 'react-i18next';

import type { IFile } from '@/types/files';

import { download, type FileSchema } from '@/store/files';
import { useAppDispatch } from '@/hooks';

import {
  BookmarkAddIcon,
  BookmarkRemoveIcon,
  DownloadIcon,
  HeartOutlineIcon,
  InfoCircleIcon,
  LinkIcon,
  MoveIcon,
  RenameIcon,
  TrashIcon,
} from '@/icons';
import * as routes from '@/routes';

import { useIsLaptop } from '@/hooks/media-query';

import { useToggleBookmark } from '@/apps/files/hooks/toggle-bookmark';

import {
  useCopyLinkDialog,
  useDeleteDialog,
  useDeleteImmediatelyDialog,
  useMoveDialog,
  useRenameFileDialog,
} from '@/apps/files/components/dialogs';
import { useFileInfoSheet } from '@/apps/files/components/file-info-sheet';

export interface IAction {
  key: string;
  name: string;
  Icon: React.ElementType;
  icon: React.ReactElement;
  danger: boolean;
  onClick: () => void;
}

export function useBookmarkAction(files: IFile[]): IAction {
  const { t } = useTranslation('files');

  const fileIds = files.map(({ id }) => id);
  const { bookmarked, toggleBookmark } = useToggleBookmark(fileIds);

  const name = bookmarked
    ? t('actions.removeBookmark', {
        defaultValue: 'Remove {{count}} item(s) from bookmarks',
        count: fileIds.length,
      })
    : t('actions.addBookmark', {
        defaultValue: 'Bookmark {{count}} item(s)',
        count: fileIds.length,
      });

  const Icon = bookmarked ? BookmarkRemoveIcon : BookmarkAddIcon;

  return {
    key: 'bookmark',
    name,
    Icon,
    icon: <HeartOutlineIcon className="h-4 w-4" />,
    danger: false,
    onClick: () => {
      toggleBookmark();
    },
  };
}

export function useCopyLinkAction(files: IFile[]): IAction | null {
  const { t } = useTranslation('files');
  const { openDialog } = useCopyLinkDialog();

  if (files.length === 1 && !routes.isTrashed(files[0].path)) {
    return {
      key: 'copy-link',
      name: t('actions.shareLink', { defaultValue: 'Share Link' }),
      Icon: LinkIcon,
      icon: <LinkIcon className="h-4 w-4" />,
      danger: false,
      onClick: () => {
        openDialog(files[0]);
      },
    };
  }
  return null;
}

export function useDeleteAction(files: IFile[]): IAction | null {
  const { t } = useTranslation('files');
  const { openDialog: openDeleteDialog } = useDeleteDialog();

  return {
    key: 'delete',
    name: t('actions.delete', { defaultValue: 'Delete' }),
    Icon: TrashIcon,
    icon: <TrashIcon className="h-4 w-4" />,
    danger: true,
    onClick: () => {
      openDeleteDialog(files);
    },
  };
}

export function useDeleteImmediatelyAction(files: IFile[]): IAction | null {
  const { t } = useTranslation('files');
  const { openDialog: openDeleteImmediatelyDialog } = useDeleteImmediatelyDialog();

  const trashedFiles = files.filter(
    (file) => routes.isTrashed(file.path) ?? file.deleted_at != null,
  );
  if (trashedFiles.length > 0 && files.length !== trashedFiles.length) {
    return null;
  }
  if (trashedFiles.length > 0) {
    return {
      key: 'delete-immediately',
      name: t('actions.deleteImmediately', { defaultValue: 'Delete Immediately' }),
      Icon: TrashIcon,
      icon: <TrashIcon className="h-4 w-4" />,
      danger: true,
      onClick: () => {
        openDeleteImmediatelyDialog(files);
      },
    };
  }
  return null;
}

export function useDownloadAction(files: IFile[]): IAction | null {
  const { t } = useTranslation('files');
  const dispatch = useAppDispatch();

  if (files.length === 1 && !routes.isTrashed(files[0].path)) {
    return {
      key: 'download',
      name: t('actions.download', { defaultValue: 'Download' }),
      Icon: DownloadIcon,
      icon: <DownloadIcon className="h-4 w-4" />,
      danger: false,
      onClick: () => {
        dispatch(download(files[0].id));
      },
    };
  }
  return null;
}

export function useInformationAction(files: FileSchema[]): IAction | null {
  const { t } = useTranslation('files');
  const { openFileInfoSheet } = useFileInfoSheet();
  const isLaptop = useIsLaptop();

  if (isLaptop) {
    return null;
  }

  if (files.length === 1 && !routes.isTrashed(files[0].path)) {
    return {
      key: 'information',
      name: t('actions.information', { defaultValue: 'Information' }),
      Icon: InfoCircleIcon,
      icon: <InfoCircleIcon className="h-4 w-4" />,
      danger: false,
      onClick: () => {
        openFileInfoSheet(files[0]);
      },
    };
  }
  return null;
}

export function useMoveAction(files: IFile[]): IAction | null {
  const { t } = useTranslation('files');

  const { openDialog: openMoveDialog } = useMoveDialog();

  return {
    key: 'move',
    name: t('actions.move', { defaultValue: 'Move' }),
    Icon: MoveIcon,
    icon: <MoveIcon className="h-4 w-4" />,
    danger: false,
    onClick: () => {
      openMoveDialog(files);
    },
  };
}

export function useRenameAction(files: IFile[]): IAction | null {
  const { t } = useTranslation('files');
  const { openDialog: openRenameDialog } = useRenameFileDialog();
  if (files.length === 1 && !routes.isTrashed(files[0].path)) {
    return {
      key: 'rename',
      name: t('actions.rename', { defaultValue: 'Rename' }),
      Icon: RenameIcon,
      icon: <RenameIcon className="h-4 w-4" />,
      danger: false,
      onClick: () => {
        openRenameDialog(files[0]);
      },
    };
  }
  return null;
}
