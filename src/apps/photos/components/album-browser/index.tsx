import { SelectionProvider } from '@/components/SelectionProvider';

import { AlbumsBrowserContent } from './content';
export { AlbumsBrowserDataProvider } from './contexts/data';
import { AlbumsBrowserHeader } from './header';

export function AlbumsBrowser() {
  return (
    <SelectionProvider>
      <div className="flex h-full min-h-0 flex-col">
        <AlbumsBrowserHeader />
        <AlbumsBrowserContent />
      </div>
    </SelectionProvider>
  );
}
