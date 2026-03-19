import { useAppSelector } from 'hooks';

import type { IMediaItem } from 'types/photos';

import { useSelection } from 'components/SelectionProvider';

import GridItemMenu from 'components/photos/GridItemMenu';

import { useDeleteImmediatelyAction, useRestoreAction } from '../hooks/deleted-media-item-actions';

import { useMediaItemsData } from '../MediaItemsProvider';

const EMPTY: IMediaItem[] = [];

function useMediaItemActionGroups(item: IMediaItem) {
  const { selectById } = useMediaItemsData();
  const { selectedIds, isSelected } = useSelection();

  const mediaItems = useAppSelector((state) => {
    if (!isSelected(item.fileId)) {
      return EMPTY;
    }
    return [...selectedIds].map((id) => selectById(state, id)!);
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
  const groups = useMediaItemActionGroups(mediaItem);
  return <GridItemMenu groups={groups} onOpen={onOpen} />;
}
