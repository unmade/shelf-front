import React from 'react';

import * as icons from 'icons';

import { useAppSelector } from 'hooks';

import { IMediaItem } from 'types/photos';

import Menu from 'components/ui/Menu';
import MenuItem from 'components/ui/MenuItem';

import { useSelection } from 'components/SelectionProvider';

import { useDeleteImmediatelyAction, useRestoreAction } from '../hooks/deleted-media-item-actions';

import { useMediaItemsData } from '../MediaItemsProvider';

const EMPTY: IMediaItem[] = [];

function useMediaItemActionGroups(item: IMediaItem) {
  const { selectById } = useMediaItemsData();
  const { ids, isSelected } = useSelection();

  const mediaItems = useAppSelector((state) => {
    if (!isSelected(item.fileId)) {
      return EMPTY;
    }
    return ids.map((id) => selectById(state, id)!);
  });

  const restore = useRestoreAction(mediaItems);
  const deleteImmediately = useDeleteImmediatelyAction(mediaItems);

  const groups = [
    {
      key: 'deleting',
      items: [restore, deleteImmediately].filter((action) => action != null),
    },
  ];

  return groups.filter((group) => group.items.length > 0);
}

interface Props {
  mediaItem: IMediaItem;
  onOpen?: () => void;
}

export default function DeletedMediaItemMenu({ mediaItem, onOpen }: Props) {
  const groups = useMediaItemActionGroups(mediaItem);
  return (
    <Menu groups={groups} itemRenderer={MenuItem} placement="bottom-start" onOpen={onOpen}>
      <div className="rounded-full bg-gray-50 p-0.5 text-gray-700 dark:bg-zinc-200 dark:text-zinc-600 dark:hover:bg-zinc-100">
        <icons.More className="h-3 w-3 shrink-0" />
      </div>
    </Menu>
  );
}
