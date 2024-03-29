import React from 'react';

import Button from 'components/ui/Button';

import { useRestoreAction } from 'components/photos/hooks/deleted-media-item-actions';
import { IMediaItem } from 'types/photos';

interface Props {
  className?: string;
  mediaItem: IMediaItem;
}

export default function RestoreButton({ className = '', mediaItem }: Props) {
  const restore = useRestoreAction([mediaItem]);

  return (
    <Button
      className={className}
      title={restore.name}
      variant="text"
      size="sm"
      onClick={restore.onClick}
    >
      <span className="font-medium">{restore.name}</span>
    </Button>
  );
}
