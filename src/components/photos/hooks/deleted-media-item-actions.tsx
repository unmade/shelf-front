import React from 'react';

import { useTranslation } from 'react-i18next';

import { IMediaItem } from 'types/photos';

import * as icons from 'icons';

import { IAction } from 'hooks/file-actions';

import { useRestoreMediaItemsMutation } from 'store/mediaItems';

import { useDeleteMediaItemsImmediatelyDialog } from '../DeleteMediaItemsImmediatelyDialogProvider';

export function useDeleteImmediatelyAction(mediaItems: IMediaItem[]): IAction | null {
  const { t } = useTranslation('photos');

  const { openDialog } = useDeleteMediaItemsImmediatelyDialog();

  return {
    key: 'delete_immediately',
    name: t('photos:mediaItem.actions.deleteImmediately', {
      defaultValue: 'Delete immediately',
      count: mediaItems.length,
    }),
    Icon: icons.TrashOutlined,
    icon: <icons.TrashOutlined className="h-4 w-4" />,
    danger: true,
    onClick: () => {
      openDialog(mediaItems);
    },
  };
}

export function useRestoreAction(mediaItems: IMediaItem[]): IAction {
  const { t } = useTranslation('photos');

  const [restore] = useRestoreMediaItemsMutation();

  const ids = mediaItems.map((item) => item.fileId);

  return {
    key: 'restore',
    name: t('photos:mediaItem.actions.restore', {
      defaultValue: 'Restore',
      count: mediaItems.length,
    }),
    Icon: icons.ReplyOutlined,
    icon: <icons.ReplyOutlined className="h-4 w-4" />,
    danger: false,
    onClick: () => {
      restore(ids);
    },
  };
}
