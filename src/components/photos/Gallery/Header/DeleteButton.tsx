import type { IMediaItem } from 'types/photos';

import { TrashIcon } from '@/icons';

import { Button } from '@/ui/button';

import { useDeleteMediaItemsDialog } from 'components/photos/DeleteMediaItemsDialogProvider';

interface Props {
  className?: string;
  mediaItem: IMediaItem;
}

export default function DeleteButton({ className, mediaItem }: Props) {
  const { openDialog: openDeleteDialog } = useDeleteMediaItemsDialog();

  return (
    <Button
      className={className}
      title="Move to Trash"
      variant="ghost"
      size="icon"
      color="danger"
      onClick={() => {
        openDeleteDialog([mediaItem]);
      }}
    >
      <TrashIcon />
    </Button>
  );
}
