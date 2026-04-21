import { ChevronLeftIcon, ChevronRightIcon } from '@/icons';

import type { IMediaItem } from '@/types/photos';

import { MediaType } from '@/constants';

import { NoPreview } from '@/apps/files/components/previews';

import FileIcon from '@/components/FileIcon';
import {
  Thumbnail,
  ThumbnailFallback,
  ThumbnailImage,
  guessThumbnailSize,
} from '@/components/thumbnail';

import useCarousel from './hooks/useCarousel';

export type CarouselMediaItems = [IMediaItem | null, IMediaItem, IMediaItem | null];

function MediaItemSlide({ mediaItem }: { mediaItem: IMediaItem }) {
  if (!MediaType.isImage(mediaItem.mediaType)) {
    return (
      <div className="h-full flex-col overflow-auto py-4">
        <NoPreview
          file={{
            name: mediaItem.name,
            mediatype: mediaItem.mediaType,
            hidden: false,
          }}
        />
      </div>
    );
  }

  return (
    <div className="h-full flex-col overflow-auto py-4">
      <Thumbnail className="size-full">
        <ThumbnailImage
          src={mediaItem.thumbnailUrl}
          size={guessThumbnailSize(window.screen)}
          alt={mediaItem.name}
        />
        <ThumbnailFallback>
          <FileIcon className="size-14" mediatype={mediaItem.mediaType} hidden={false} />
        </ThumbnailFallback>
      </Thumbnail>
    </div>
  );
}

interface Props {
  mediaItems: CarouselMediaItems;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

export default function Carousel({ mediaItems, onSwipeLeft, onSwipeRight }: Props) {
  const [handlers, style] = useCarousel(mediaItems.length, onSwipeLeft, onSwipeRight);

  return (
    <div {...handlers} className="w-full overflow-hidden">
      <div style={style} className="relative flex h-[calc(100svh-60px)] overflow-x-scroll">
        {mediaItems.map((mediaItem, idx) =>
          mediaItem != null ? (
            <div key={idx} className="relative w-1/3 shrink-0 p-4 select-none">
              {onSwipeLeft && (
                <div
                  className="group/leftarrow absolute top-0 left-0 hidden h-full w-1/4 cursor-pointer pointer-fine:block"
                  onClick={onSwipeLeft ?? undefined}
                  aria-hidden
                >
                  <div className="hidden h-full items-center justify-start p-6 group-hover/leftarrow:flex">
                    <ChevronLeftIcon className="h-10 w-10 shrink-0 rounded-full bg-white/90 p-2 text-gray-900 drop-shadow-md dark:bg-white/75 dark:text-zinc-900" />
                  </div>
                </div>
              )}
              <MediaItemSlide mediaItem={mediaItem} />
              {onSwipeRight && (
                <div
                  className="group/rightarrow absolute top-0 right-0 hidden h-full w-1/4 cursor-pointer pointer-fine:block"
                  onClick={onSwipeRight ?? undefined}
                  aria-hidden
                >
                  <div className="hidden h-full items-center justify-end p-6 group-hover/rightarrow:flex">
                    <ChevronRightIcon className="h-10 w-10 shrink-0 rounded-full bg-white/90 p-2 text-gray-900 drop-shadow-md dark:bg-white/75 dark:text-zinc-900" />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div key={idx} className="w-1/3" />
          ),
        )}
      </div>
    </div>
  );
}
