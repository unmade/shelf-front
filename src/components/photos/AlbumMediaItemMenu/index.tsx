import * as icons from 'icons';
import type { IMediaItem } from 'types/photos';

import { useAppSelector } from 'hooks';
import { useCopyLinkAction } from 'hooks/file-actions';

import SimpleMenu from 'components/SimpleMenu';
import { useSelection } from 'components/SelectionProvider';

import {
  useAddToAlbumAction,
  useDeleteAction,
  useDownloadBatchAction,
  useFavouriteAction,
  useRemoveFromAlbumAction,
  useSetAlbumCoverAction,
} from '../hooks/media-item-actions';
import { makeFileFromMediaItem } from '../hooks/file-from-media-item';

import { useMediaItemsData } from '../MediaItemsProvider';

const EMPTY: IMediaItem[] = [];

function useMediaItemActionSections(item: IMediaItem, albumSlug: string) {
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
  const removeFromAlbumAction = useRemoveFromAlbumAction(albumSlug, mediaItems);
  const setAlbumCoverAction = useSetAlbumCoverAction(albumSlug, mediaItems);
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
  const sections = useMediaItemActionSections(mediaItem, albumSlug);
  return (
    <SimpleMenu sections={sections} placement="bottom start" onOpen={onOpen}>
      <icons.More className="h-3 w-3 shrink-0" />
    </SimpleMenu>
  );
}

export default AlbumMediaItemMenu;
