import * as icons from 'icons';
import type { IAlbum } from 'types/photos';

import Menu from 'components/ui-legacy/Menu';
import MenuItem from 'components/ui-legacy/MenuItem';

import {
  useDeleteAlbumAction,
  useRenameAlbumAction,
  useRemoveAlbumCoverAction,
} from '../hooks/album-actions';

interface Props {
  album: IAlbum;
  onOpen?: () => void;
}

function useAlbumActionGroups(album: IAlbum) {
  const renameAction = useRenameAlbumAction(album);
  const removeCoverAction = useRemoveAlbumCoverAction(album);
  const deleteAction = useDeleteAlbumAction(album);
  const groups = [
    {
      key: 'main',
      items: [renameAction, removeCoverAction],
    },
    {
      key: 'deleting',
      items: [deleteAction],
    },
  ];
  return groups;
}

function AlbumMenu({ album, onOpen }: Props) {
  const groups = useAlbumActionGroups(album);
  return (
    <Menu groups={groups} itemRenderer={MenuItem} placement="bottom-start" onOpen={onOpen}>
      <div className="rounded-full bg-gray-50 p-0.5 text-gray-700 dark:bg-zinc-200 dark:text-zinc-600 dark:hover:bg-zinc-100">
        <icons.More className="h-3 w-3 shrink-0" />
      </div>
    </Menu>
  );
}

export default AlbumMenu;
