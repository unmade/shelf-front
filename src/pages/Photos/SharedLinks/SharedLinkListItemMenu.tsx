import { MoreHorizontalOutlineIcon } from '@/icons';
import type { IMediaItem } from 'types/photos';

import { useCopyLinkAction, useDownloadAction } from 'hooks/file-actions';

import { Button } from '@/ui/button';
import { DropdownMenu, DropdownMenuTrigger } from '@/ui/dropdown-menu';

import SimpleMenuContent from '@/components/SimpleMenuContent';

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="focus:outline-none" variant="ghost" size="icon">
          <MoreHorizontalOutlineIcon data-slot="icon" />
        </Button>
      </DropdownMenuTrigger>
      <SimpleMenuContent groups={groups} side="bottom" align="end" />
    </DropdownMenu>
  );
}
