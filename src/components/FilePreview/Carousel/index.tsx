import React from 'react';

import * as icons from 'icons';

import { IFile } from 'types/files';

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
    <div
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...handlers}
      className="w-full overflow-hidden"
    >
      <div style={style} className="relative flex h-[calc(100svh-60px)] overflow-x-scroll">
        {files.map((f, idx) =>
          f != null ? (
            // eslint-disable-next-line react/no-array-index-key
            <div key={idx} className="relative w-1/3 shrink-0 select-none p-4">
              {onSwipeLeft && (
                <div
                  className="group/leftarrow absolute left-0 top-0 hidden h-full w-1/4 cursor-pointer pointer-fine:block"
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
                  className="group/rightarrow absolute right-0 top-0 hidden h-full w-1/4 cursor-pointer pointer-fine:block"
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
            // eslint-disable-next-line react/no-array-index-key
            <div key={idx} className="w-1/3" />
          ),
        )}
      </div>
    </div>
  );
}
