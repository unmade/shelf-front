import { useTranslation } from 'react-i18next';

import type { IAlbum } from 'types/photos';

import { useRemoveAlbumCoverMutation } from 'store/albums';

import { CloseIcon, RenameIcon, TrashIcon } from '@/icons';

import type { IAction } from 'hooks/file-actions';

import { useDeleteAlbumDialog } from '../DeleteAlbumDialogProvider';
import { useRenameAlbumDialog } from '../RenameAlbumDialogProvider';

export function useDeleteAlbumAction(album: IAlbum): IAction {
  const { t } = useTranslation('photos');
  const { openDialog } = useDeleteAlbumDialog();

  return {
    key: 'delete',
    name: t('photos:album.actions.delete', {
      defaultValue: 'Delete',
    }),
    Icon: TrashIcon,
    icon: <TrashIcon className="h-4 w-4" />,
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
    Icon: CloseIcon,
    icon: <CloseIcon className="h-4 w-4" />,
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
    Icon: RenameIcon,
    icon: <RenameIcon className="h-4 w-4" />,
    danger: false,
    onClick: () => {
      openDialog(album);
    },
  };
}
