import type { IMediaItem } from '@/types/photos';

import { ThumbnailSize } from '@/constants';

import FileIcon from '@/components/FileIcon';
import {
  Thumbnail,
  ThumbnailFallback,
  ThumbnailImage,
  guessThumbnailSize,
} from '@/components/thumbnail';

interface GallerySlideProps {
  mediaItem: IMediaItem;
  inView: boolean;
}

export function GallerySlide({ mediaItem, inView }: GallerySlideProps) {
  if (!inView) {
    return <div className="h-full w-full" />;
  }

  const thumbnailSize =
    typeof window === 'undefined' ? ThumbnailSize.xxl : guessThumbnailSize(window.screen);

  return (
    <div className="h-full flex-col overflow-auto py-4">
      <Thumbnail className="size-full">
        <ThumbnailImage src={mediaItem.thumbnailUrl} size={thumbnailSize} alt={mediaItem.name} />
        <ThumbnailFallback>
          <FileIcon className="size-14" mediatype={mediaItem.mediaType} hidden={false} />
        </ThumbnailFallback>
      </Thumbnail>
    </div>
  );
}
