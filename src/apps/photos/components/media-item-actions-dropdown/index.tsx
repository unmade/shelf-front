import type React from 'react';
import { useMemo } from 'react';

import type { IMediaItem } from '@/types/photos';

import type { IAction } from '@/hooks/file-actions';

import SimpleMenuContent from '@/components/SimpleMenuContent';
import { useSelection } from '@/components/SelectionProvider';

import {
  DropdownMenu,
  type DropdownMenuContentProps,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';

import {
  useAddToAlbumAction,
  useDeleteAction,
  useDownloadBatchAction,
  useFavouriteAction,
  useInformationAction,
} from '@/apps/photos/hooks/media-item-actions';
import {
  useDeleteImmediatelyAction,
  useRestoreAction,
} from '@/apps/photos/hooks/deleted-media-item-actions';

import { useSelectMediaItems } from '@/apps/photos/components/media-item-browser/contexts/data';

interface ActionGroup {
  key: string;
  items: IAction[];
}

function buildActionGroups(
  groups: {
    key: string;
    items: (IAction | null)[];
  }[],
): ActionGroup[] {
  return groups
    .map((group) => ({
      ...group,
      items: group.items.filter((action): action is IAction => action != null),
    }))
    .filter((group) => group.items.length > 0);
}

function useActionGroups(mediaItems: IMediaItem[]) {
  const addToAlbumAction = useAddToAlbumAction(mediaItems);
  const deleteAction = useDeleteAction(mediaItems);
  const downloadBatchAction = useDownloadBatchAction(mediaItems);
  const favouriteAction = useFavouriteAction(mediaItems);
  const informationAction = useInformationAction(mediaItems);

  return useMemo(() => {
    return buildActionGroups([
      {
        key: 'info',
        items: [informationAction],
      },
      {
        key: 'favourite',
        items: [favouriteAction],
      },
      {
        key: 'sharing',
        items: [downloadBatchAction],
      },
      {
        key: 'album',
        items: [addToAlbumAction],
      },
      {
        key: 'deleting',
        items: [deleteAction],
      },
    ]);
  }, [addToAlbumAction, deleteAction, downloadBatchAction, favouriteAction, informationAction]);
}

function useDeletedActionGroups(mediaItems: IMediaItem[]) {
  const downloadBatchAction = useDownloadBatchAction(mediaItems);
  const deleteImmediatelyAction = useDeleteImmediatelyAction(mediaItems);
  const restoreAction = useRestoreAction(mediaItems);

  return useMemo(() => {
    return buildActionGroups([
      {
        key: 'common',
        items: [downloadBatchAction, restoreAction],
      },
      {
        key: 'deleting',
        items: [deleteImmediatelyAction],
      },
    ]);
  }, [downloadBatchAction, deleteImmediatelyAction, restoreAction]);
}

export function useSelectedMediaItems(mediaItem: IMediaItem) {
  const { selectedIds, isSelected } = useSelection();

  const mediaItemIds = useMemo(
    () => (isSelected(mediaItem.id) ? selectedIds : new Set([mediaItem.id])),
    [isSelected, mediaItem.id, selectedIds],
  );

  const selectedMediaItems = useSelectMediaItems(mediaItemIds);
  return selectedMediaItems.length > 0 ? selectedMediaItems : [mediaItem];
}

interface MediaItemActionsMenuProps {
  children: React.ReactNode;
  onOpen?: () => void;
  side?: DropdownMenuContentProps['side'];
  align?: DropdownMenuContentProps['align'];
  groups: ActionGroup[];
}

function MediaItemActionsMenu({
  children,
  onOpen,
  side = 'bottom',
  align = 'start',
  groups,
}: MediaItemActionsMenuProps) {
  const handleOpenChange = (open: boolean) => {
    if (open) {
      onOpen?.();
    }
  };

  return (
    <DropdownMenu onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <SimpleMenuContent groups={groups} side={side} align={align} />
    </DropdownMenu>
  );
}

export interface MediaItemActionsDropdownProps {
  children: React.ReactNode;
  mediaItem: IMediaItem;
  onOpen?: () => void;
  side?: DropdownMenuContentProps['side'];
  align?: DropdownMenuContentProps['align'];
}

export function MediaItemActionsDropdown({ mediaItem, ...props }: MediaItemActionsDropdownProps) {
  const mediaItems = useSelectedMediaItems(mediaItem);
  const groups = useActionGroups(mediaItems);

  return <MediaItemActionsMenu {...props} groups={groups} />;
}

export function DeletedMediaItemActionsDropdown({
  mediaItem,
  ...props
}: MediaItemActionsDropdownProps) {
  const mediaItems = useSelectedMediaItems(mediaItem);
  const groups = useDeletedActionGroups(mediaItems);

  return <MediaItemActionsMenu {...props} groups={groups} />;
}
