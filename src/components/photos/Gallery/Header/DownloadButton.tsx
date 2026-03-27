import type { IMediaItem } from '@/types/photos';

import { downloadMediaItemsBatch } from '@/store/mediaItems';

import { DownloadIcon } from '@/icons';
import { useAppDispatch } from '@/hooks';

import { Button } from '@/ui/button';

interface Props {
  className: string;
  mediaItem: IMediaItem;
}

export default function DownloadButton({ className = '', mediaItem }: Props) {
  const dispatch = useAppDispatch();

  return (
    <Button
      className={className}
      title="Download"
      variant="ghost"
      size="icon"
      onClick={() => dispatch(downloadMediaItemsBatch([mediaItem.fileId]))}
    >
      <DownloadIcon />
    </Button>
  );
}
