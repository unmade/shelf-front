import React from 'react';

import * as icons from 'icons';

import { IMediaItem } from 'types/photos';

import Menu from 'components/ui/Menu';
import MenuItem from 'components/ui/MenuItem';

import { useDeleteImmediatelyAction, useRestoreAction } from '../hooks/deleted-media-item-actions';

function useMediaItemActionGroups(item: IMediaItem) {
  const items = [item];

  const restore = useRestoreAction(items);
  const deleteImmediately = useDeleteImmediatelyAction(items);

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
