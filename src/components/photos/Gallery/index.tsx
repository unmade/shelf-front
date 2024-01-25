import React, { useState } from 'react';
import { createPortal } from 'react-dom';

import { useSelector, shallowEqual } from 'react-redux';

import { IMediaItem } from 'types/photos';

import useKeyUp from 'hooks/key-up';

import { RootState } from 'store/store';
import { selectPhotosLibraryPath } from 'store/features';

import Carousel from 'components/FilePreview/Carousel';

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

  const total = ids.length;
  const prevIndex = currentIndex - 1 < 0 ? ids.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex + 1 > ids.length - 1 ? 0 : currentIndex + 1;

  const { libraryPath, mediaItems }: { libraryPath: string; mediaItems: IMediaItem[] } =
    useSelector(
      (state: RootState) => ({
        libraryPath: selectPhotosLibraryPath(state),
        mediaItems: [ids[prevIndex], ids[currentIndex], ids[nextIndex]].map(
          (id) => selectById(state, id) as IMediaItem,
        ),
      }),
      shallowEqual,
    );
  const mediaItem = mediaItems[1];

  const files = mediaItems.map((item) => makeFileFromMediaItem(item, libraryPath));

  const onInfo = () => (sidebarOpen ? setSidebarOpen(false) : setSidebarOpen(true));

  const prev = () => setCurrentIndex(prevIndex);
  const next = () => setCurrentIndex(nextIndex);

  const goBack = () => onClose && onClose(currentIndex);

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
            <Header
              mediaItem={mediaItem}
              idx={currentIndex}
              total={total}
              onGoBack={goBack}
              onInfo={onInfo}
            />
            <div className="h-full overflow-scroll bg-gray-200 dark:bg-zinc-900/50">
              <div className="flex">
                <Carousel files={files} onSwipeLeft={prev} onSwipeRight={next} />
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
