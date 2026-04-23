import type { IMediaItem } from '@/types/photos';

import { MediaType, ThumbnailSize } from '@/constants';

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

  if (!MediaType.isImage(mediaItem.mediaType)) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-8">
        <FileIcon className="size-20" mediatype={mediaItem.mediaType} hidden={false} />
        <p className="text-muted-foreground text-sm">{mediaItem.name}</p>
      </div>
    );
  }

  const thumbnailSize =
    typeof window === 'undefined' ? ThumbnailSize.xxl : guessThumbnailSize(window.screen);

  return (
    <div className="flex h-full items-center justify-center p-6 lg:p-10">
      <Thumbnail className="max-h-full max-w-full">
        <ThumbnailImage
          src={mediaItem.thumbnailUrl}
          size={thumbnailSize}
          objectFit="contain"
          className="max-h-full max-w-full"
          alt={mediaItem.name}
        />
        <ThumbnailFallback className="bg-muted rounded-lg p-8">
          <FileIcon className="size-20" mediatype={mediaItem.mediaType} hidden={false} />
        </ThumbnailFallback>
      </Thumbnail>
    </div>
  );
}
