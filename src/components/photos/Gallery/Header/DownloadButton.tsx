import type { IMediaItem } from 'types/photos';

import * as icons from 'icons';
import { useAppDispatch } from 'hooks';

import { downloadMediaItemsBatch } from 'store/mediaItems';

import Button from 'components/ui-legacy/Button';

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
      variant="text"
      size="base"
      icon={<icons.Download className="h-5 w-5" />}
      onClick={() => dispatch(downloadMediaItemsBatch([mediaItem.fileId]))}
    />
  );
}
