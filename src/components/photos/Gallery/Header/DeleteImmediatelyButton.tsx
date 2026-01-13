import type { IMediaItem } from '@/types/photos';

import { Button } from '@/ui/button';

import { useDeleteMediaItemsImmediatelyDialog } from '@/components/photos/DeleteMediaItemsImmediatelyDialogProvider';

interface Props {
  className?: string;
  mediaItem: IMediaItem;
}

export default function DeleteImmediatelyButton({ className = '', mediaItem }: Props) {
  const { openDialog } = useDeleteMediaItemsImmediatelyDialog();

  return (
    <Button
      className={className}
      title="Delete immediately"
      variant="destructive"
      onClick={() => {
        openDialog([mediaItem]);
      }}
    >
      Delete
    </Button>
  );
}
