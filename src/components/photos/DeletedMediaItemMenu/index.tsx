import { useAppSelector } from 'hooks';

import type { IMediaItem } from 'types/photos';

import { useSelection } from 'components/SelectionProvider';

import GridItemMenu from 'components/photos/GridItemMenu';

import { useDeleteImmediatelyAction, useRestoreAction } from '../hooks/deleted-media-item-actions';

import { useMediaItemsData } from '../MediaItemsProvider';

const EMPTY: IMediaItem[] = [];

function useMediaItemActionSections(item: IMediaItem) {
  const { selectById } = useMediaItemsData();
  const { ids, isSelected } = useSelection();

  const mediaItems = useAppSelector((state) => {
    if (!isSelected(item.fileId)) {
      return EMPTY;
    }
    return ids.map((id) => selectById(state, id)!);
  });

  const restore = useRestoreAction(mediaItems);
  const deleteImmediately = useDeleteImmediatelyAction(mediaItems);

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
  const sections = useMediaItemActionSections(mediaItem);
  return <GridItemMenu sections={sections} onOpen={onOpen} />;
}
