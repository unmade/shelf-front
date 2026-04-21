import { useTranslation } from 'react-i18next';

import { MoreHorizontalOutlineIcon, InfoCircleIcon } from '@/icons';

import type { IMediaItem } from 'types/photos';

import { cn } from '@/lib/utils';

import { Button } from '@/ui/button';
import { DropdownMenu, DropdownMenuTrigger } from '@/ui/dropdown-menu';

import SimpleMenuContent from '@/components/SimpleMenuContent';

import {
  useAddToAlbumAction,
  useDeleteAction,
  useDownloadBatchAction,
} from 'components/photos/hooks/media-item-actions';

import { useInformationDialogContext } from '../InformationDialogProvider';

function useInformationAction(mediaItem: IMediaItem) {
  const { t } = useTranslation('photos');
  const { openDialog } = useInformationDialogContext();
  return {
    key: 'info',
    name: t('photos:mediaItem.actions.showInfo', { defaultValue: 'Info' }),
    Icon: InfoCircleIcon,
    danger: false,
    onClick: () => {
      openDialog(mediaItem);
    },
  };
}

interface Props {
  className: string;
  mediaItem: IMediaItem;
}

function MoreButton({ className = '', mediaItem }: Props) {
  const addToAlbumAction = useAddToAlbumAction([mediaItem]);
  const deleteAction = useDeleteAction([mediaItem]);
  const downloadAction = useDownloadBatchAction([mediaItem]);
  const infoAction = useInformationAction(mediaItem);

  const groups = [
    {
      key: 'common',
      items: [infoAction],
    },
    {
      key: 'sharing',
      items: [downloadAction].filter((action) => action != null),
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={cn('focus:outline-none', className)} variant="ghost">
          <MoreHorizontalOutlineIcon data-slot="icon" />
        </Button>
      </DropdownMenuTrigger>
      <SimpleMenuContent groups={groups} side="bottom" align="end" />
    </DropdownMenu>
  );
}

export default MoreButton;
