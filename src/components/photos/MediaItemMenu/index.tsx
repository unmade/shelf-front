import React from 'react';

import * as icons from 'icons';
import { IMediaItem } from 'types/photos';

import { useCopyLinkAction, useDownloadAction, useFavouriteAction } from 'hooks/file-actions';

import Menu from 'components/ui/Menu';
import MenuItem from 'components/ui/MenuItem';

import { useDeleteAction } from '../hooks/media-item-actions';

import useFileFromMediaItem from '../hooks/file-from-media-item';

function useMediaItemActionGroups(item: IMediaItem) {
  const files = [useFileFromMediaItem(item)];

  const toggleFavourite = useFavouriteAction(files);
  const copyLinkAction = useCopyLinkAction(files);
  const deleteAction = useDeleteAction([item]);
  const downloadAction = useDownloadAction(files);

  const groups = [
    {
      key: 'favourite',
      items: [toggleFavourite].filter((action) => action != null),
    },
    {
      key: 'sharing',
      items: [downloadAction, copyLinkAction].filter((action) => action != null),
    },
    {
      key: 'deleting',
      items: [deleteAction].filter((action) => action != null),
    },
  ];

  return groups.filter((group) => group.items.length > 0);
}

interface Props {
  mediaItem: IMediaItem;
  onOpen?: () => void;
}

function MediaItemMenu({ mediaItem, onOpen }: Props) {
  const groups = useMediaItemActionGroups(mediaItem);
  return (
    <Menu groups={groups} itemRenderer={MenuItem} placement="bottom-start" onOpen={onOpen}>
      <div className="rounded-full bg-gray-50 p-0.5 text-gray-700 dark:bg-zinc-200 dark:text-zinc-600 dark:hover:bg-zinc-100">
        <icons.More className="h-3 w-3 shrink-0" />
      </div>
    </Menu>
  );
}

export default MediaItemMenu;
