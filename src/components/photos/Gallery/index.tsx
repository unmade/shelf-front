import React, { useCallback, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import { IMediaItem } from 'types/photos';

import { useAppSelector } from 'hooks';
import useKeyUp from 'hooks/key-up';

import { RootState } from 'store/store';
import { selectPhotosLibraryPath } from 'store/features';

import Carousel, { CarouselFiles } from 'components/FilePreview/Carousel';

import { makeFileFromMediaItem } from '../hooks/file-from-media-item';

import AdjustCategoriesDialogProvider from './AdjustCategoriesDialogProvider';
import Header from './Header';
import InformationDialogProvider from './InformationDialogProvider';
import Sidebar from './Sidebar';

interface Props {
  ids: string[];
  initialFileId: string;
  selectById: (state: RootState, id: string) => IMediaItem | undefined;
  onClose?: (currentIndex: number) => void;
}

function Gallery({ ids, initialFileId, selectById, onClose }: Props) {
  const idx = ids.findIndex((id) => id === initialFileId);

  const [currentIndex, setCurrentIndex] = useState(idx);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const prevIndex = currentIndex - 1 < 0 ? null : currentIndex - 1;
  const nextIndex = currentIndex + 1 > ids.length - 1 ? null : currentIndex + 1;

  const fileIds = [
    prevIndex != null ? ids[prevIndex] : null,
    ids[currentIndex],
    nextIndex != null ? ids[nextIndex] : null,
  ];

  const libraryPath = useAppSelector(selectPhotosLibraryPath);
  const prevMediaItem = useAppSelector((state) =>
    fileIds[0] != null ? selectById(state, fileIds[0])! : null,
  );
  const mediaItem = useAppSelector((state) => selectById(state, fileIds[1]!)!);
  const nextMediaItem = useAppSelector((state) =>
    fileIds[2] != null ? selectById(state, fileIds[2])! : null,
  );

  const files = useMemo<CarouselFiles>(
    () => [
      prevMediaItem ? makeFileFromMediaItem(prevMediaItem, libraryPath) : null,
      makeFileFromMediaItem(mediaItem, libraryPath),
      nextMediaItem ? makeFileFromMediaItem(nextMediaItem, libraryPath) : null,
    ],
    [prevMediaItem, mediaItem, nextMediaItem],
  );

  const onInfo = () => (sidebarOpen ? setSidebarOpen(false) : setSidebarOpen(true));

  const prev = useCallback(() => {
    if (prevIndex != null) {
      setCurrentIndex(prevIndex);
    }
  }, [prevIndex]);
  const next = useCallback(() => {
    if (nextIndex != null) {
      setCurrentIndex(nextIndex);
    }
  }, [nextIndex]);

  const goBack = useCallback(() => onClose && onClose(currentIndex), [currentIndex]);

  useKeyUp({
    handlers: {
      ArrowLeft: prev,
      ArrowRight: next,
      Escape: goBack,
    },
  });

  return createPortal(
    <AdjustCategoriesDialogProvider>
      <InformationDialogProvider>
        <div className="fixed inset-0 bottom-0 dark:bg-zinc-900 dark:text-zinc-200">
          <div className="flex h-full flex-col bg-white dark:bg-zinc-800">
            <Header mediaItem={mediaItem} idx={currentIndex} onGoBack={goBack} onInfo={onInfo} />
            <div className="h-full overflow-scroll bg-gray-200 dark:bg-zinc-900/50">
              <div className="flex">
                <Carousel
                  files={files}
                  onSwipeLeft={prevIndex != null ? prev : undefined}
                  onSwipeRight={nextIndex != null ? next : undefined}
                />
                {sidebarOpen && (
                  <div className="hidden sm:block">
                    <Sidebar
                      className="hidden h-full border-t bg-white px-6 py-6 shadow dark:border-zinc-700 dark:bg-zinc-800 dark:shadow-zinc-900/70 sm:block sm:w-80 xl:w-96"
                      mediaItem={mediaItem}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </InformationDialogProvider>
    </AdjustCategoriesDialogProvider>,
    document.body,
  );
}

export default Gallery;
