import type { IMediaItem } from 'types/photos';

import { useAppSelector } from 'hooks';
import { useCopyLinkAction } from 'hooks/file-actions';

import { useSelection } from 'components/SelectionProvider';

import GridItemMenu from 'components/photos/GridItemMenu';

import {
  useAddToAlbumAction,
  useDeleteAction,
  useDownloadBatchAction,
  useFavouriteAction,
} from '../hooks/media-item-actions';
import { makeFileFromMediaItem } from '../hooks/file-from-media-item';

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

  const files = mediaItems.map((mediaItem) => makeFileFromMediaItem(mediaItem, ''));

  const addToAlbumAction = useAddToAlbumAction(mediaItems);
  const toggleFavourite = useFavouriteAction(mediaItems);
  const copyLinkAction = useCopyLinkAction(files);
  const deleteAction = useDeleteAction(mediaItems);
  const downloadBatchAction = useDownloadBatchAction(mediaItems);

  const groups = [
    {
      key: 'favourite',
      items: [toggleFavourite].filter((action) => action != null),
    },
    {
      key: 'sharing',
      items: [downloadBatchAction, copyLinkAction].filter((action) => action != null),
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
  const sections = useMediaItemActionGroups(mediaItem);
  return <GridItemMenu sections={sections} onOpen={onOpen} />;
}

export default MediaItemMenu;
