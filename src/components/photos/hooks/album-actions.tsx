import React from 'react';
import { useTranslation } from 'react-i18next';

import { IAlbum } from 'types/photos';

import * as icons from 'icons';

import { IAction } from 'hooks/file-actions';

import { useDeleteAlbumDialog } from '../DeleteAlbumDialogProvider';

// eslint-disable-next-line import/prefer-default-export
export function useDeleteAlbumAction(album: IAlbum): IAction {
  const { t } = useTranslation('photos');
  const { openDialog } = useDeleteAlbumDialog();

  return {
    key: 'delete',
    name: t('photos:album.actions.delete', {
      defaultValue: 'Delete',
    }),
    Icon: icons.TrashOutlined,
    icon: <icons.TrashOutlined className="h-4 w-4" />,
    danger: true,
    onClick: () => {
      openDialog(album);
    },
  };
}
