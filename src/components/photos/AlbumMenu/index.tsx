import type { IAlbum } from 'types/photos';

import GridItemMenu from 'components/photos/GridItemMenu';

import {
  useDeleteAlbumAction,
  useRenameAlbumAction,
  useRemoveAlbumCoverAction,
} from '../hooks/album-actions';

interface Props {
  album: IAlbum;
  onOpen?: () => void;
}

function useAlbumActionSections(album: IAlbum) {
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

export default function AlbumMenu({ album, onOpen }: Props) {
  const sections = useAlbumActionSections(album);
  return <GridItemMenu sections={sections} onOpen={onOpen} />;
}
