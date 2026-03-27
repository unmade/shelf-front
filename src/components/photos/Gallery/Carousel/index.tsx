import { ChevronLeftIcon, ChevronRightIcon } from '@/icons';

import { type FileSchema } from '@/store/files';

import { GallerySlide } from '@/apps/files/components/browser/gallery/slide';

import useCarousel from './hooks/useCarousel';

export type CarouselFiles = [FileSchema | null, FileSchema, FileSchema | null];

interface Props {
  files: CarouselFiles;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

export default function Carousel({ files, onSwipeLeft, onSwipeRight }: Props) {
  const [handlers, style] = useCarousel(files.length, onSwipeLeft, onSwipeRight);

  return (
    <div {...handlers} className="w-full overflow-hidden">
      <div style={style} className="relative flex h-[calc(100svh-60px)] overflow-x-scroll">
        {files.map((f, idx) =>
          f != null ? (
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
              <GallerySlide file={f} inView />
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
