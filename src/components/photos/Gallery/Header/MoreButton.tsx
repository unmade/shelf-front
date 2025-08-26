import { useTranslation } from 'react-i18next';

import { MoreOutlined, InformationCircleOutlined } from 'icons';

import type { IFile } from 'types/files';
import type { IMediaItem } from 'types/photos';

import { useCopyLinkAction, useDownloadAction } from 'hooks/file-actions';

import { Dropdown, DropdownButton } from 'components/ui/DropdownMenu';

import SimpleMenu from 'components/SimpleMenu';

import { useAddToAlbumAction, useDeleteAction } from 'components/photos/hooks/media-item-actions';
import useFileFromMediaItem from 'components/photos/hooks/file-from-media-item';

import { useInformationDialogContext } from '../InformationDialogProvider';

const stopPropagation = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.stopPropagation();
};

function useInformationAction(file: IFile) {
  const { t } = useTranslation('photos');
  const { openDialog } = useInformationDialogContext();
  return {
    key: 'info',
    name: t('photos:mediaItem.actions.showInfo', { defaultValue: 'Info' }),
    Icon: InformationCircleOutlined,
    danger: false,
    onClick: () => {
      openDialog(file);
    },
  };
}

interface Props {
  className: string;
  mediaItem: IMediaItem;
}

function MoreButton({ className = '', mediaItem }: Props) {
  const file = useFileFromMediaItem(mediaItem);

  const addToAlbumAction = useAddToAlbumAction([mediaItem]);
  const copyLinkAction = useCopyLinkAction([file]);
  const deleteAction = useDeleteAction([mediaItem]);
  const downloadAction = useDownloadAction([file]);
  const infoAction = useInformationAction(file);

  const groups = [
    {
      key: 'common',
      items: [infoAction],
    },
    {
      key: 'sharing',
      items: [downloadAction, copyLinkAction].filter((action) => action != null),
    },
    {
      key: 'album',
      items: [addToAlbumAction].filter((action) => action != null),
    },
    {
      key: 'deleting',
      items: [deleteAction].filter((action) => action != null),
    },
  ].filter((group) => group.items.length > 0);

  return (
    <Dropdown>
      <DropdownButton
        className={`${className} focus:outline-none`}
        variant="plain"
        color="gray"
        onClick={stopPropagation}
      >
        <MoreOutlined data-slot="icon" />
      </DropdownButton>
      <SimpleMenu sections={groups} />
    </Dropdown>
  );
}

export default MoreButton;
