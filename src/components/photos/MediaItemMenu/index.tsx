import type { IMediaItem } from 'types/photos';

import { useAppSelector } from 'hooks';

import { useSelection } from 'components/SelectionProvider';

import GridItemMenu from 'components/photos/GridItemMenu';

import {
  useAddToAlbumAction,
  useDeleteAction,
  useDownloadBatchAction,
  useFavouriteAction,
} from '../hooks/media-item-actions';

import { useMediaItemsData } from '../MediaItemsProvider';

const EMPTY: IMediaItem[] = [];

function useMediaItemActionGroups(item: IMediaItem) {
  const { selectById } = useMediaItemsData();
  const { selectedIds, isSelected } = useSelection();
  const mediaItems = useAppSelector((state) => {
    if (!isSelected(item.id)) {
      return EMPTY;
    }
    return [...selectedIds].map((id) => selectById(state, id)!);
  });

  const addToAlbumAction = useAddToAlbumAction(mediaItems);
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
      items: [addToAlbumAction].filter((action) => action != null),
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
  return <GridItemMenu groups={groups} onOpen={onOpen} />;
}

export default MediaItemMenu;
