import { useMemo } from 'react';

import type { IAlbum } from '@/types/photos';

import type { IAction } from '@/hooks/file-actions';

import SimpleMenuContent from '@/components/SimpleMenuContent';

import {
  DropdownMenu,
  type DropdownMenuContentProps,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';

import {
  useDeleteAlbumAction,
  useRemoveAlbumCoverAction,
  useRenameAlbumAction,
} from '@/components/photos/hooks/album-actions';

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

function useActionGroups(album: IAlbum) {
  const renameAction = useRenameAlbumAction(album);
  const removeCoverAction = useRemoveAlbumCoverAction(album);
  const deleteAction = useDeleteAlbumAction(album);

  return useMemo(() => {
    return buildActionGroups([
      {
        key: 'main',
        items: [renameAction, removeCoverAction],
      },
      {
        key: 'deleting',
        items: [deleteAction],
      },
    ]);
  }, [deleteAction, removeCoverAction, renameAction]);
}

export interface AlbumActionsDropdownProps {
  children: React.ReactNode;
  album: IAlbum;
  onOpen?: () => void;
  side?: DropdownMenuContentProps['side'];
  align?: DropdownMenuContentProps['align'];
}

export function AlbumActionsDropdown({
  children,
  album,
  onOpen,
  side = 'bottom',
  align = 'start',
}: AlbumActionsDropdownProps) {
  const groups = useActionGroups(album);

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
