import { FileBrowserContent } from './content';
import { FileBrowserProvider } from './context';
import { FileBrowserHeader } from './header';
import { FileBrowserStatusBar } from './status-bar';

interface FileBrowserProps {
  path: string;
}

export function FileBrowser({ path }: FileBrowserProps) {
  return (
    <FileBrowserProvider>
      <div className="flex h-full flex-col">
        <FileBrowserHeader />
        <FileBrowserContent path={path} />
        <FileBrowserStatusBar path={path} itemCount={12} />
      </div>
    </FileBrowserProvider>
  );
}
