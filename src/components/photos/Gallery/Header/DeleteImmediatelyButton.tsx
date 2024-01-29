import React from 'react';

import { IMediaItem } from 'types/photos';

import Button from 'components/ui/Button';

import { useDeleteMediaItemsImmediatelyDialog } from 'components/photos/DeleteMediaItemsImmediatelyDialogProvider';

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
      variant="text"
      size="sm"
      color="danger"
      onClick={() => openDialog([mediaItem])}
    >
      <span className="font-medium">Delete</span>
    </Button>
  );
}
