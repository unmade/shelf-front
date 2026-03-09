import { useTranslation } from 'react-i18next';

import { ChevronLeftIcon, ChevronRightIcon, PanelRightIcon, XIcon } from 'lucide-react';

import { Button } from '@/ui/button';
import { Text } from '@/ui/text';
import { Toggle } from '@/ui/toggle';

import { useGallery, useSelectGallerySlide } from './context';

export function GalleryHeader() {
  const { t } = useTranslation('files');
  const { totalSlides, closeGallery, carouselApi, sidePanelOpen, toggleSidePanel } = useGallery();

  const { currentIndex, currentFile } = useSelectGallerySlide();
  const fileName = currentFile ? currentFile.name : '';

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b px-4 dark:bg-zinc-900">
      <div className="flex items-center gap-2 sm:w-48">
        <Button
          variant="ghost"
          size="icon"
          onClick={closeGallery}
          aria-label={t('gallery.close', { defaultValue: 'Close' })}
        >
          <XIcon />
        </Button>
      </div>

      <div className="min-w-0 px-4 sm:px-8">
        <Text className="truncate">{fileName}</Text>
      </div>

      <div className="flex items-center justify-end gap-2 sm:w-48">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => carouselApi?.scrollPrev()}
          aria-label={t('gallery.previous', { defaultValue: 'Previous' })}
        >
          <ChevronLeftIcon />
        </Button>
        <Text className="shrink-0" size="sm">
          {currentIndex + 1} / {totalSlides}
        </Text>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => carouselApi?.scrollNext()}
          aria-label={t('gallery.next', { defaultValue: 'Next' })}
        >
          <ChevronRightIcon />
        </Button>
        <Toggle
          className="max-lg:hidden"
          size="sm"
          pressed={sidePanelOpen}
          onPressedChange={toggleSidePanel}
          aria-label={t('gallery.toggleSidePanel', { defaultValue: 'Toggle side panel' })}
        >
          <PanelRightIcon />
        </Toggle>
      </div>
    </header>
  );
}
