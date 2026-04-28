import { SelectionProvider } from '@/components/SelectionProvider';

import type { MediaItemActionsDropdownProps } from '@/apps/photos/components/media-item-actions-dropdown';
import { MediaItemInfoSheetProvider } from '@/apps/photos/components/media-item-info-sheet';

import { MediaItemBrowserProvider } from './contexts/ui';
import { MediaItemBrowserContent } from './content';
import { Gallery } from './gallery';
import { MediaItemBrowserHeader } from './header';

export { MediaItemsBrowserDataProvider } from './contexts/data';

interface MediaItemBrowserProps {
  mediaItemActionsDropdown?: React.ComponentType<MediaItemActionsDropdownProps>;
}

export function MediaItemBrowser({ mediaItemActionsDropdown }: MediaItemBrowserProps) {
  return (
    <MediaItemInfoSheetProvider>
      <MediaItemBrowserProvider mediaItemActionsDropdown={mediaItemActionsDropdown}>
        <SelectionProvider>
          <div className="flex h-full min-h-0 flex-col">
            <MediaItemBrowserHeader />
            <MediaItemBrowserContent />
          </div>
          <Gallery />
        </SelectionProvider>
      </MediaItemBrowserProvider>
    </MediaItemInfoSheetProvider>
  );
}
