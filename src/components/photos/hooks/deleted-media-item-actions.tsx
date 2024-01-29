import React from 'react';

import { IMediaItem } from 'types/photos';

import * as icons from 'icons';

import { IAction } from 'hooks/file-actions';

import { useRestoreMediaItemsMutation } from 'store/photos';

import { useDeleteMediaItemsImmediatelyDialog } from '../DeleteMediaItemsImmediatelyDialogProvider';

export function useDeleteImmediatelyAction(mediaItems: IMediaItem[]): IAction | null {
  const { openDialog } = useDeleteMediaItemsImmediatelyDialog();

  return {
    key: 'delete_immediately',
    name: 'Delete Immediately',
    Icon: icons.TrashOutlined,
    icon: <icons.TrashOutlined className="h-4 w-4" />,
    danger: true,
    onClick: () => {
      openDialog(mediaItems);
    },
  };
}

export function useRestoreAction(mediaItems: IMediaItem[]): IAction {
  const [restore] = useRestoreMediaItemsMutation();

  const ids = mediaItems.map((item) => item.fileId);

  return {
    key: 'restore',
    name: 'Restore',
    Icon: icons.ReplyOutlined,
    icon: <icons.ReplyOutlined className="h-4 w-4" />,
    danger: false,
    onClick: () => {
      restore(ids);
    },
  };
}
