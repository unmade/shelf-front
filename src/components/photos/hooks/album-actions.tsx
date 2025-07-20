import React from 'react';
import { useTranslation } from 'react-i18next';

import { IAlbum } from 'types/photos';

import { useRemoveAlbumCoverMutation } from 'store/albums';

import * as icons from 'icons';

import { IAction } from 'hooks/file-actions';

import { useDeleteAlbumDialog } from '../DeleteAlbumDialogProvider';
import { useRenameAlbumDialog } from '../RenameAlbumDialogProvider';

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

export function useRemoveAlbumCoverAction(album: IAlbum): IAction {
  const { t } = useTranslation('photos');
  const [removeAlbumCover] = useRemoveAlbumCoverMutation();

  return {
    key: 'remove-cover',
    name: t('photos:album.actions.removeCover', {
      defaultValue: 'Remove Cover',
    }),
    Icon: icons.Close,
    icon: <icons.Close className="h-4 w-4" />,
    danger: false,
    onClick: () => {
      removeAlbumCover({ albumSlug: album.slug });
    },
  };
}

export function useRenameAlbumAction(album: IAlbum): IAction {
  const { t } = useTranslation('photos');
  const { openDialog } = useRenameAlbumDialog();

  return {
    key: 'rename',
    name: t('photos:album.actions.rename', {
      defaultValue: 'Rename',
    }),
    Icon: icons.Edit,
    icon: <icons.Edit className="h-4 w-4" />,
    danger: false,
    onClick: () => {
      openDialog(album);
    },
  };
}
