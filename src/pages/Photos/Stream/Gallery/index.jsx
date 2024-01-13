import React, { useState } from 'react';
import { createPortal } from 'react-dom';

import { useSelector, shallowEqual } from 'react-redux';

import useKeyUp from '../../../../hooks/key-up';

import Carousel from '../../../../components/FilePreview/Carousel';

import Header from './Header';
import Sidebar from './Sidebar';
import InformationDialogProvider from './InformationDialogProvider';

function Gallery({ ids, selectById, initialIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const total = ids.length;
  const prevIndex = currentIndex - 1 < 0 ? ids.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex + 1 > ids.length - 1 ? 0 : currentIndex + 1;

  const files = useSelector(
    (state) =>
      [ids[prevIndex], ids[currentIndex], ids[nextIndex]].map((id) => selectById(state, id)),
    shallowEqual
  );
  const file = files[1];

  const onInfo = () => (sidebarOpen ? setSidebarOpen(false) : setSidebarOpen(true));

  const prev = () => setCurrentIndex(prevIndex);
  const next = () => setCurrentIndex(nextIndex);

  const goBack = () => onClose({ currentIndex });

  useKeyUp({
    handlers: {
      ArrowLeft: prev,
      ArrowRight: next,
      Escape: goBack,
    },
  });

  return createPortal(
    <InformationDialogProvider>
      <div className="fixed inset-0 bottom-0 dark:bg-zinc-900 dark:text-zinc-200">
        <div className="flex h-full flex-col bg-white dark:bg-zinc-800">
          <Header file={file} idx={currentIndex} total={total} onGoBack={goBack} onInfo={onInfo} />
          <div className="h-full overflow-scroll bg-gray-200 dark:bg-zinc-900/50">
            <div className="flex">
              <Carousel files={files} onSwipeLeft={prev} onSwipeRight={next} />
              {sidebarOpen && (
                <div className="hidden sm:block">
                  <Sidebar
                    className="hidden sm:block sm:w-80 xl:w-96 h-full border-t bg-white px-6 py-6 shadow dark:border-zinc-700 dark:bg-zinc-800 dark:shadow-zinc-900/70"
                    fileId={file.id}
                    selectById={selectById}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </InformationDialogProvider>,
    document.body
  );
}

export default Gallery;
