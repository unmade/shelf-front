import { useMemo } from 'react';

import type { IMediaItem } from '@/types/photos';

import type { IAction } from '@/hooks/file-actions';

import { DropdownMenu, DropdownMenuTrigger } from '@/ui/dropdown-menu';

import SimpleMenuContent from '@/components/SimpleMenuContent';

import {
  useAddToAlbumAction,
  useDeleteAction,
  useDownloadBatchAction,
  useFavouriteAction,
  useInformationAction,
  useRemoveFromAlbumAction,
  useSetAlbumCoverAction,
} from '@/components/photos/hooks/media-item-actions';

import {
  type MediaItemActionsDropdownProps,
  useSelectedMediaItems,
} from '@/apps/photos/components/media-item-actions-dropdown';

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

function useAlbumActionGroups(mediaItems: IMediaItem[], albumSlug: string) {
  const addToAlbumAction = useAddToAlbumAction(mediaItems);
  const deleteAction = useDeleteAction(mediaItems);
  const downloadBatchAction = useDownloadBatchAction(mediaItems);
  const favouriteAction = useFavouriteAction(mediaItems);
  const informationAction = useInformationAction(mediaItems);
  const removeFromAlbumAction = useRemoveFromAlbumAction(albumSlug, mediaItems);
  const setAlbumCoverAction = useSetAlbumCoverAction(albumSlug, mediaItems);

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
        items: [setAlbumCoverAction, addToAlbumAction, removeFromAlbumAction],
      },
      {
        key: 'deleting',
        items: [deleteAction],
      },
    ]);
  }, [
    addToAlbumAction,
    deleteAction,
    downloadBatchAction,
    favouriteAction,
    informationAction,
    removeFromAlbumAction,
    setAlbumCoverAction,
  ]);
}

interface AlbumMediaItemActionsDropdownProps extends MediaItemActionsDropdownProps {
  albumSlug: string;
}

export function AlbumMediaItemActionsDropdown({
  children,
  albumSlug,
  mediaItem,
  ...props
}: AlbumMediaItemActionsDropdownProps) {
  const mediaItems = useSelectedMediaItems(mediaItem);
  const groups = useAlbumActionGroups(mediaItems, albumSlug);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <SimpleMenuContent groups={groups} {...props} />
    </DropdownMenu>
  );
}

export type { MediaItemActionsDropdownProps };
