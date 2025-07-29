import * as icons from 'icons';

import type { IFile } from 'types/files';

import Preview from '../Previews';

import useCarousel from './hooks/useCarousel';

export type CarouselFiles = [IFile | null, IFile, IFile | null];

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
                    <icons.ChevronLeftOutlined className="h-10 w-10 shrink-0 rounded-full bg-white/90 p-2 text-gray-900 drop-shadow-md dark:bg-white/75 dark:text-zinc-900" />
                  </div>
                </div>
              )}
              <Preview file={f} />
              {onSwipeRight && (
                <div
                  className="group/rightarrow absolute top-0 right-0 hidden h-full w-1/4 cursor-pointer pointer-fine:block"
                  onClick={onSwipeRight ?? undefined}
                  aria-hidden
                >
                  <div className="hidden h-full items-center justify-end p-6 group-hover/rightarrow:flex">
                    <icons.ChevronRightOutlined className="h-10 w-10 shrink-0 rounded-full bg-white/90 p-2 text-gray-900 drop-shadow-md dark:bg-white/75 dark:text-zinc-900" />
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
