import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  MoreHorizontalIcon,
  SidebarRightIcon,
} from '@/icons';

import { Button } from '@/ui/button';
import { Text } from '@/ui/text';
import { Toggle } from '@/ui/toggle';

import { useGallery, useSelectGallerySlide } from './context';
import { useMediaItemBrowser } from '../contexts/ui';

export function GalleryHeader() {
  const { displayTotal, closeGallery, carouselApi, sidePanelOpen, toggleSidePanel } = useGallery();
  const { mediaItemActionsDropdown: MediaItemActionsDropdown } = useMediaItemBrowser();
  const { currentIndex, currentMediaItem } = useSelectGallerySlide();

  const itemName = currentMediaItem?.name ?? '';
  const position = currentMediaItem ? currentIndex + 1 : 0;

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b px-4 dark:bg-zinc-900">
      <div className="flex items-center gap-2 sm:w-48">
        <Button variant="ghost" size="icon-sm" onClick={closeGallery} aria-label="Close gallery">
          <CloseIcon />
        </Button>
      </div>

      <div className="min-w-0 px-4 sm:px-8">
        <Text className="truncate">{itemName}</Text>
      </div>

      <div className="flex items-center justify-end gap-2 sm:w-48">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => carouselApi?.scrollPrev()}
          aria-label="Previous item"
        >
          <ChevronLeftIcon />
        </Button>
        <Text className="shrink-0" size="sm">
          {position} / {displayTotal}
        </Text>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => carouselApi?.scrollNext()}
          aria-label="Next item"
        >
          <ChevronRightIcon />
        </Button>
        <Toggle
          className="max-lg:hidden"
          size="sm"
          pressed={sidePanelOpen}
          onPressedChange={toggleSidePanel}
          aria-label="Toggle details panel"
        >
          <SidebarRightIcon />
        </Toggle>
        {currentMediaItem && (
          <MediaItemActionsDropdown mediaItem={currentMediaItem} align="end">
            <Button className="lg:hidden" variant="ghost" size="icon-sm" aria-label="More actions">
              <MoreHorizontalIcon />
            </Button>
          </MediaItemActionsDropdown>
        )}
      </div>
    </header>
  );
}
