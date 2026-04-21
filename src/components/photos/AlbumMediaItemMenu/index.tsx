import type { IMediaItem } from 'types/photos';

import { useAppSelector } from 'hooks';

import { useSelection } from 'components/SelectionProvider';

import {
  useAddToAlbumAction,
  useDeleteAction,
  useDownloadBatchAction,
  useFavouriteAction,
  useRemoveFromAlbumAction,
  useSetAlbumCoverAction,
} from '../hooks/media-item-actions';

import GridItemMenu from '../GridItemMenu';
import { useMediaItemsData } from '../MediaItemsProvider';

const EMPTY: IMediaItem[] = [];

function useMediaItemActionGroups(item: IMediaItem, albumSlug: string) {
  const { selectById } = useMediaItemsData();
  const { selectedIds, isSelected } = useSelection();
  const mediaItems = useAppSelector((state) => {
    if (!isSelected(item.id)) {
      return EMPTY;
    }
    return [...selectedIds].map((id) => selectById(state, id)!);
  });

  const addToAlbumAction = useAddToAlbumAction(mediaItems);
  const removeFromAlbumAction = useRemoveFromAlbumAction(albumSlug, mediaItems);
  const setAlbumCoverAction = useSetAlbumCoverAction(albumSlug, mediaItems);
  const toggleFavourite = useFavouriteAction(mediaItems);
  const deleteAction = useDeleteAction(mediaItems);
  const downloadBatchAction = useDownloadBatchAction(mediaItems);

  const groups = [
    {
      key: 'favourite',
      items: [toggleFavourite].filter((action) => action != null),
    },
    {
      key: 'sharing',
      items: [downloadBatchAction].filter((action) => action != null),
    },
    {
      key: 'album',
      items: [setAlbumCoverAction, addToAlbumAction, removeFromAlbumAction].filter(
        (action) => action != null,
      ),
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
  albumSlug: string;
  onOpen?: () => void;
}

function AlbumMediaItemMenu({ mediaItem, albumSlug, onOpen }: Props) {
  const groups = useMediaItemActionGroups(mediaItem, albumSlug);
  return <GridItemMenu groups={groups} onOpen={onOpen} />;
}

export default AlbumMediaItemMenu;
