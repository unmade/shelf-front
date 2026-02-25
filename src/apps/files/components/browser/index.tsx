import { SelectionProvider } from '@/apps/files/components/selection-context';

import { FileBrowserContent } from './content';
import { FileBrowserProvider } from './contexts/ui';
import { ScrollProvider } from './contexts/scroll';
import { Gallery } from './gallery';
import { FileBrowserHeader } from './header';
import { FileBrowserSidePreview } from './side-preview';
import { FileBrowserStatusBar } from './status-bar';

export { FileBrowserDataProvider } from './contexts/data';

interface FileBrowserProps {
  scrollKey: string;
}

export function FileBrowser({ scrollKey }: FileBrowserProps) {
  return (
    <>
      <ScrollProvider>
        <FileBrowserProvider scrollKey={scrollKey}>
          <SelectionProvider key={scrollKey}>
            <div className="flex h-full flex-col">
              <div className="flex min-h-0 flex-1">
                <div className="flex min-w-0 flex-1 flex-col">
                  <FileBrowserHeader />
                  <FileBrowserContent />
                </div>
                <FileBrowserSidePreview />
              </div>
              <FileBrowserStatusBar />
            </div>
          </SelectionProvider>
        </FileBrowserProvider>
      </ScrollProvider>
      <Gallery />
    </>
  );
}
