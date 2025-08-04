import * as icons from 'icons';
import type { IMediaItem } from 'types/photos';

import { useCopyLinkAction, useDownloadAction } from 'hooks/file-actions';

import Button from 'components/ui/Button';
import Menu from 'components/ui/Menu';

import useFileFromMediaItem from 'components/photos/hooks/file-from-media-item';
import { useDeleteAction } from 'components/photos/hooks/media-item-actions';

function useMediaItemActionSections(item: IMediaItem) {
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
  const sections = useMediaItemActionSections(mediaItem);
  return (
    <Menu sections={sections} placement="bottom start">
      <Button as="div" variant="plain" color="gray">
        <icons.More data-slot="icon" />
      </Button>
    </Menu>
  );
}
