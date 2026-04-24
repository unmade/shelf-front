import { GridIcon, ListIcon } from '@/icons';

import { cn } from '@/lib/utils';

import { ToggleGroup, ToggleGroupItem } from '@/ui/toggle-group';

import { useMediaItemBrowser, type ViewMode } from './contexts/ui';

function ViewModeToggle() {
  const { viewMode, setViewMode } = useMediaItemBrowser();

  const handleValueChange = (value: string) => {
    if (value) {
      setViewMode(value as ViewMode);
    }
  };

  return (
    <ToggleGroup type="single" variant="outline" value={viewMode} onValueChange={handleValueChange}>
      <ToggleGroupItem value="table" disabled>
        <ListIcon className="size-5 sm:size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="grid">
        <GridIcon className="size-5 sm:size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

interface MediaItemBrowserHeaderProps {
  className?: string;
}

export function MediaItemBrowserHeader({ className }: MediaItemBrowserHeaderProps) {
  return (
    <div className={cn('flex items-center justify-end px-5 py-2', className)}>
      <ViewModeToggle />
    </div>
  );
}
