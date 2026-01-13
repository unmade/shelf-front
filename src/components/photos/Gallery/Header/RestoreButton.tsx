import type { IMediaItem } from '@/types/photos';

import { Button } from '@/ui/button';

import { useRestoreAction } from '@/components/photos/hooks/deleted-media-item-actions';

interface Props {
  className?: string;
  mediaItem: IMediaItem;
}

export default function RestoreButton({ className = '', mediaItem }: Props) {
  const restore = useRestoreAction([mediaItem]);

  return (
    <Button className={className} title={restore.name} variant="ghost" onClick={restore.onClick}>
      {restore.name}
    </Button>
  );
}
