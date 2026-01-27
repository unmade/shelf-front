import { LayoutGridIcon, LayoutListIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

import { ToggleGroup, ToggleGroupItem } from '@/ui/toggle-group';

import { useFileBrowserContext } from './context';

function ViewModeToggle() {
  const { viewMode, setViewMode } = useFileBrowserContext();

  const handleValueChange = (value: string) => {
    setViewMode(value as 'table' | 'grid');
  };

  return (
    <ToggleGroup type="single" variant="outline" value={viewMode} onValueChange={handleValueChange}>
      <ToggleGroupItem value="table">
        <LayoutListIcon className="size-5 sm:size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="grid">
        <LayoutGridIcon className="size-5 sm:size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

interface HeaderProps {
  className?: string;
}

export function FileBrowserHeader({ className }: HeaderProps) {
  return (
    <div className={cn('flex items-center justify-end px-5 py-2', className)}>
      <ViewModeToggle />
    </div>
  );
}
