import { useTranslation } from 'react-i18next';

import type { IMediaItem } from '@/types/photos';

import {
  AddToAlbumIcon,
  DownloadIcon,
  HeartIcon,
  HeartOutlineIcon,
  ImageIcon,
  InfoCircleIcon,
  RemoveFromAlbumIcon,
  TrashIcon,
} from '@/icons';

import { useAppDispatch } from '@/hooks';
import type { IAction } from '@/hooks/file-actions';
import { useIsLaptop } from '@/hooks/media-query';

import { useRemoveAlbumItemsMutation, useSetAlbumCoverMutation } from '@/store/albums';
import { downloadMediaItemsBatch } from '@/store/mediaItems';

import { useDeleteMediaItemsDialog } from '@/components/photos/DeleteMediaItemsDialogProvider';
import { useAddToAlbumDialog } from '@/components/photos/AddToAlbumDialogProvider';

import { useToggleFavourite } from '@/apps/photos/hooks/toggle-favourite';

import { useMediaItemInfoSheet } from '@/apps/photos/components/media-item-info-sheet';

export function useAddToAlbumAction(mediaItems: IMediaItem[]): IAction | null {
  const { t } = useTranslation('photos');

  const { openDialog } = useAddToAlbumDialog();

  return {
    key: 'add-to-album',
    name: t('photos:mediaItem.actions.addToAlbum', {
      defaultValue: 'Add to Album',
      count: mediaItems.length,
    }),
    Icon: AddToAlbumIcon,
    icon: <AddToAlbumIcon className="h-4 w-4" />,
    danger: false,
    onClick: () => {
      openDialog(mediaItems);
    },
  };
}

export function useDeleteAction(mediaItems: IMediaItem[]): IAction | null {
  const { t } = useTranslation('photos');

  const { openDialog: openDeleteDialog } = useDeleteMediaItemsDialog();

  return {
    key: 'delete',
    name: t('photos:mediaItem.actions.delete', {
      defaultValue: 'Delete',
      count: mediaItems.length,
    }),
    Icon: TrashIcon,
    icon: <TrashIcon className="h-4 w-4" />,
    danger: true,
    onClick: () => {
      openDeleteDialog(mediaItems);
    },
  };
}

export function useDownloadBatchAction(mediaItems: IMediaItem[]): IAction | null {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const mediaItemIds = mediaItems.map((item) => item.id);

  return {
    key: 'download',
    name: t('photos:mediaItem.actions.downloadBatch', {
      defaultValue: 'Download',
      count: mediaItems.length,
    }),
    Icon: DownloadIcon,
    icon: <DownloadIcon className="h-4 w-4" />,
    danger: false,
    onClick: () => {
      dispatch(downloadMediaItemsBatch(mediaItemIds));
    },
  };
}

export function useFavouriteAction(mediaItems: IMediaItem[]): IAction {
  const { t } = useTranslation('photos');
  const mediaItemIds = mediaItems.map(({ id }) => id);
  const { favourite, toggleFavourite } = useToggleFavourite(mediaItemIds);

  const name = favourite
    ? t('photos:mediaItem.actions.unfavourite', {
        defaultValue: 'Unfavourite',
        count: mediaItemIds.length,
      })
    : t('photos:mediaItem.actions.favourite', {
        defaultValue: 'Favourite',
        count: mediaItemIds.length,
      });

  const Icon = favourite ? HeartIcon : HeartOutlineIcon;

  return {
    key: 'favourite',
    name,
    Icon: Icon,
    icon: <Icon className="h-4 w-4" />,
    danger: false,
    onClick: toggleFavourite,
  };
}

export function useInformationAction(mediaItems: IMediaItem[]): IAction | null {
  const { t } = useTranslation('photos');
  const { openMediaItemInfoSheet } = useMediaItemInfoSheet();
  const isLaptop = useIsLaptop();

  if (isLaptop || mediaItems.length !== 1) {
    return null;
  }

  return {
    key: 'information',
    name: t('photos:mediaItem.actions.showInfo', { defaultValue: 'Information' }),
    Icon: InfoCircleIcon,
    icon: <InfoCircleIcon className="h-4 w-4" />,
    danger: false,
    onClick: () => {
      openMediaItemInfoSheet(mediaItems[0]);
    },
  };
}

export function useRemoveFromAlbumAction(albumSlug: string, mediaItems: IMediaItem[]): IAction {
  const { t } = useTranslation('photos');
  const [removeAlbumItems] = useRemoveAlbumItemsMutation();
  const mediaItemIds = mediaItems.map((item) => item.id);

  return {
    key: 'remove-from-album',
    name: t('photos:mediaItem.actions.removeFromAlbum', {
      defaultValue: 'Remove from Album',
      count: mediaItems.length,
    }),
    Icon: RemoveFromAlbumIcon,
    icon: <RemoveFromAlbumIcon className="h-4 w-4" />,
    danger: false,
    onClick: () => {
      removeAlbumItems({ albumSlug, mediaItemIds });
    },
  };
}

export function useSetAlbumCoverAction(
  albumSlug: string,
  mediaItems: IMediaItem[],
): IAction | null {
  const { t } = useTranslation('photos');
  const [setAlbumCover] = useSetAlbumCoverMutation();

  if (mediaItems.length !== 1) {
    return null;
  }

  const mediaItem = mediaItems[0];

  return {
    key: 'set-cover',
    name: t('photos:mediaItem.actions.setCover', {
      defaultValue: 'Set as Album Cover',
    }),
    Icon: ImageIcon,
    icon: <ImageIcon className="h-4 w-4" />,
    danger: false,
    onClick: () => {
      setAlbumCover({ albumSlug, mediaItemId: mediaItem.id });
    },
  };
}
