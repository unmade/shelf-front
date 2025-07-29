import { useTranslation } from 'react-i18next';

import * as icons from 'icons';
import type { IFile } from 'types/files';
import type { IMediaItem } from 'types/photos';

import { useCopyLinkAction, useDownloadAction } from 'hooks/file-actions';
import { useAddToAlbumAction, useDeleteAction } from 'components/photos/hooks/media-item-actions';

import Button from 'components/ui/Button';
import Menu from 'components/ui/Menu';
import MenuItem from 'components/ui/MenuItem';

import useFileFromMediaItem from '../../hooks/file-from-media-item';

import { useInformationDialogContext } from '../InformationDialogProvider';

function useInformationAction(file: IFile) {
  const { t } = useTranslation('photos');
  const { openDialog } = useInformationDialogContext();
  return {
    key: 'info',
    name: t('photos:mediaItem.actions.showInfo', { defaultValue: 'Info' }),
    icon: <icons.InformationCircleOutlined className="h-4 w-4" />,
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

function MoreButton({ className, mediaItem }: Props) {
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
    <Menu
      buttonClassName={className}
      panelClassName="min-w-[160px]"
      groups={groups}
      itemRenderer={MenuItem}
    >
      <Button
        as="div"
        variant="text"
        size="base"
        icon={<icons.MoreOutlined className="h-5 w-5" />}
        onClick={() => {}}
      />
    </Menu>
  );
}

export default MoreButton;
