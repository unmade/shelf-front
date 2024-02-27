import React from 'react';

import { useTranslation } from 'react-i18next';

import { IMediaItem } from 'types/photos';

import * as icons from 'icons';

import { IAction } from 'hooks/file-actions';

import { useDeleteMediaItemsDialog } from '../DeleteMediaItemsDialogProvider';

// eslint-disable-next-line import/prefer-default-export
export function useDeleteAction(mediaItems: IMediaItem[]): IAction | null {
  const { t } = useTranslation('photos');

  const { openDialog: openDeleteDialog } = useDeleteMediaItemsDialog();

  return {
    key: 'delete',
    name: t('photos:mediaItemMenu.actions.delete', {
      defaultValue: 'Delete',
      count: mediaItems.length,
    }),
    Icon: icons.TrashOutlined,
    icon: <icons.TrashOutlined className="h-4 w-4" />,
    danger: true,
    onClick: () => {
      openDeleteDialog(mediaItems);
    },
  };
}
