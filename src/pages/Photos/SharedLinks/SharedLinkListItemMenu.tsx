import * as icons from 'icons';
import type { IMediaItem } from 'types/photos';

import { useCopyLinkAction, useDownloadAction } from 'hooks/file-actions';

import Button from 'components/ui-legacy/Button';
import Menu from 'components/ui-legacy/Menu';
import MenuItem from 'components/ui-legacy/MenuItem';

import useFileFromMediaItem from 'components/photos/hooks/file-from-media-item';
import { useDeleteAction } from 'components/photos/hooks/media-item-actions';

function useMediaItemActionGroups(item: IMediaItem) {
  const files = [useFileFromMediaItem(item)];

  const copyLinkAction = useCopyLinkAction(files);
  const deleteAction = useDeleteAction([item]);
  const downloadAction = useDownloadAction(files);

  const groups = [
    {
      key: 'sharing',
      items: [downloadAction, copyLinkAction].filter((action) => action != null),
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
}

export default function SharedLinkListItemMenu({ mediaItem }: Props) {
  const groups = useMediaItemActionGroups(mediaItem);
  return (
    <Menu groups={groups} itemRenderer={MenuItem} placement="bottom-start">
      <Button
        as="div"
        icon={<icons.More className="h-4 w-4 shrink-0 dark:text-zinc-400" />}
        variant="text"
      />
    </Menu>
  );
}
