import { useTranslation } from 'react-i18next';

import type { IMediaItem } from 'types/photos';

import * as icons from 'icons';

import { useAppDispatch, useAppSelector } from 'hooks';
import type { IAction } from 'hooks/file-actions';

import { useRemoveAlbumItemsMutation, useSetAlbumCoverMutation } from 'store/albums';
import { downloadMediaItemsBatch } from 'store/mediaItems';
import {
  selectIsBookmarked,
  useAddBookmarkBatchMutation,
  useRemoveBookmarkBatchMutation,
} from 'store/users';

import { useDeleteMediaItemsDialog } from '../DeleteMediaItemsDialogProvider';
import { useAddToAlbumDialog } from '../AddToAlbumDialogProvider';

export function useAddToAlbumAction(mediaItems: IMediaItem[]): IAction | null {
  const { t } = useTranslation('photos');

  const { openDialog } = useAddToAlbumDialog();

  return {
    key: 'add-to-album',
    name: t('photos:mediaItem.actions.addToAlbum', {
      defaultValue: 'Add to Album',
      count: mediaItems.length,
    }),
    Icon: icons.FolderAddOutlined,
    icon: <icons.FolderAddOutlined className="h-4 w-4" />,
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
    Icon: icons.TrashOutlined,
    icon: <icons.TrashOutlined className="h-4 w-4" />,
    danger: true,
    onClick: () => {
      openDeleteDialog(mediaItems);
    },
  };
}

export function useDownloadBatchAction(mediaItems: IMediaItem[]): IAction | null {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const fileIds = mediaItems.map((item) => item.fileId);

  return {
    key: 'download',
    name: t('photos:mediaItem.actions.downloadBatch', {
      defaultValue: 'Download',
      count: mediaItems.length,
    }),
    Icon: icons.Download,
    icon: <icons.Download className="h-4 w-4" />,
    danger: false,
    onClick: () => {
      dispatch(downloadMediaItemsBatch(fileIds));
    },
  };
}

export function useFavouriteAction(mediaItems: IMediaItem[]): IAction {
  const { t } = useTranslation('photos');

  const [addBookmarkBatch] = useAddBookmarkBatchMutation();
  const [removeBookmarkBatch] = useRemoveBookmarkBatchMutation();

  const fileIds = mediaItems.map(({ fileId }) => fileId);
  const nonBookmarkedIds = useAppSelector((state) =>
    fileIds.filter((fileId) => !selectIsBookmarked(state, fileId)),
  );

  if (!nonBookmarkedIds.length) {
    return {
      key: 'unfavourite',
      name: t('photos:mediaItem.actions.unfavourite', {
        defaultValue: 'Unfavourite',
        count: fileIds.length,
      }),
      Icon: icons.Heart,
      icon: <icons.Heart className="h-4 w-4" />,
      danger: false,
      onClick: () => {
        removeBookmarkBatch(fileIds);
      },
    };
  }
  return {
    key: 'favourite',
    name: t('photos:mediaItem.actions.favourite', {
      defaultValue: 'Favourite',
      count: fileIds.length,
    }),
    Icon: icons.HeartOutlined,
    icon: <icons.HeartOutlined className="h-4 w-4" />,
    danger: false,
    onClick: () => {
      addBookmarkBatch(nonBookmarkedIds);
    },
  };
}

export function useRemoveFromAlbumAction(albumSlug: string, mediaItems: IMediaItem[]): IAction {
  const { t } = useTranslation('photos');
  const [removeAlbumItems] = useRemoveAlbumItemsMutation();
  const fileIds = mediaItems.map((item) => item.fileId);

  return {
    key: 'remove-from-album',
    name: t('photos:mediaItem.actions.removeFromAlbum', {
      defaultValue: 'Remove from Album',
      count: mediaItems.length,
    }),
    Icon: icons.FolderRemoveOutlined,
    icon: <icons.FolderRemoveOutlined className="h-4 w-4" />,
    danger: false,
    onClick: () => {
      removeAlbumItems({ albumSlug, fileIds });
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
    Icon: icons.PhotographOutlined,
    icon: <icons.PhotographOutlined className="h-4 w-4" />,
    danger: false,
    onClick: () => {
      setAlbumCover({ albumSlug, fileId: mediaItem.fileId });
    },
  };
}
