import { MoreOutlined } from 'icons';
import type { IMediaItem } from 'types/photos';

import { useCopyLinkAction, useDownloadAction } from 'hooks/file-actions';

import { Dropdown, DropdownButton } from 'components/ui/DropdownMenu';

import SimpleMenu from 'components/SimpleMenu';

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

const stopPropagation = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.stopPropagation();
};

export default function SharedLinkListItemMenu({ mediaItem }: Props) {
  const sections = useMediaItemActionSections(mediaItem);
  return (
    <Dropdown>
      <DropdownButton
        className="focus:outline-none"
        variant="plain"
        color="gray"
        onClick={stopPropagation}
      >
        <MoreOutlined data-slot="icon" />
      </DropdownButton>
      <SimpleMenu sections={sections} />
    </Dropdown>
  );
}
