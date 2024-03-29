import React from 'react';

import { useTranslation } from 'react-i18next';

import { IMediaItem } from 'types/photos';

import * as icons from 'icons';

import { useAppDispatch, useAppSelector } from 'hooks';
import { IAction } from 'hooks/file-actions';

import { downloadMediaItemsBatch } from 'store/mediaItems';
import {
  selectIsBookmarked,
  useAddBookmarkBatchMutation,
  useRemoveBookmarkBatchMutation,
} from 'store/users';

import { useDeleteMediaItemsDialog } from '../DeleteMediaItemsDialogProvider';

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
