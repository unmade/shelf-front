import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ArrowDownAZIcon,
  ArrowDownWideNarrowIcon,
  ArrowUpAZIcon,
  ArrowUpNarrowWideIcon,
  CalendarIcon,
  ChevronDownIcon,
  LayoutGridIcon,
  LayoutListIcon,
} from 'lucide-react';

import { Button } from '@/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import { Toggle } from '@/ui/toggle';

import {
  type SortDirection,
  type SortField,
  type SortOption,
  useFileBrowserContext,
} from './context';

interface SortOptionConfig {
  field: SortField;
  direction: SortDirection;
  labelKey: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const SORT_OPTIONS: SortOptionConfig[] = [
  { field: 'name', direction: 'asc', labelKey: 'Name (A-Z)', Icon: ArrowDownAZIcon },
  { field: 'name', direction: 'desc', labelKey: 'Name (Z-A)', Icon: ArrowUpAZIcon },
  { field: 'modified_at', direction: 'desc', labelKey: 'Modified (newest)', Icon: CalendarIcon },
  { field: 'modified_at', direction: 'asc', labelKey: 'Modified (oldest)', Icon: CalendarIcon },
  { field: 'size', direction: 'desc', labelKey: 'Size (largest)', Icon: ArrowDownWideNarrowIcon },
  { field: 'size', direction: 'asc', labelKey: 'Size (smallest)', Icon: ArrowUpNarrowWideIcon },
];

function getSortOptionKey(option: SortOption): string {
  return `${option.field}:${option.direction}`;
}

function parseSortOptionKey(key: string): SortOption {
  const [field, direction] = key.split(':') as [SortField, SortDirection];
  return { field, direction };
}

function getCurrentSortLabel(sortOption: SortOption, t: (key: string) => string): string {
  const option = SORT_OPTIONS.find(
    (opt) => opt.field === sortOption.field && opt.direction === sortOption.direction,
  );
  return option ? t(option.labelKey) : t('Sort');
}

const SortDropdown = memo(function SortDropdown() {
  const { t } = useTranslation();
  const { sortOption, setSortOption } = useFileBrowserContext();

  const currentKey = getSortOptionKey(sortOption);
  const currentLabel = getCurrentSortLabel(sortOption, t);

  const handleValueChange = (value: string) => {
    setSortOption(parseSortOptionKey(value));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1.5">
          {currentLabel}
          <ChevronDownIcon className="size-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuLabel>{t('Sort by')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={currentKey} onValueChange={handleValueChange}>
          {SORT_OPTIONS.map((option) => {
            const key = getSortOptionKey(option);
            const Icon = option.Icon;
            return (
              <DropdownMenuRadioItem key={key} value={key}>
                <Icon className="mr-2 size-4" />
                {t(option.labelKey)}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

SortDropdown.displayName = 'SortDropdown';

const ViewModeToggle = memo(function ViewModeToggle() {
  const { t } = useTranslation();
  const { viewMode, setViewMode } = useFileBrowserContext();

  const handleTableClick = () => setViewMode('table');
  const handleGridClick = () => setViewMode('grid');

  return (
    <div className="border-input dark:border-input dark:bg-input/30 flex items-center gap-0.5 rounded-md border bg-transparent p-0.5 shadow-xs">
      <Toggle
        size="sm"
        pressed={viewMode === 'table'}
        onPressedChange={handleTableClick}
        aria-label={t('Table view')}
        className="data-[state=on]:bg-accent rounded-sm"
      >
        <LayoutListIcon className="size-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={viewMode === 'grid'}
        onPressedChange={handleGridClick}
        aria-label={t('Grid view')}
        className="data-[state=on]:bg-accent rounded-sm"
      >
        <LayoutGridIcon className="size-4" />
      </Toggle>
    </div>
  );
});

ViewModeToggle.displayName = 'ViewModeToggle';

interface FileBrowserHeaderProps {
  /** Optional additional class name */
  className?: string;
}

export const FileBrowserHeader = memo(function FileBrowserHeader({
  className = '',
}: FileBrowserHeaderProps) {
  return (
    <div
      className={`flex items-center justify-between border-gray-200 px-8 py-2 dark:border-zinc-700 ${className}`}
    >
      <SortDropdown />
      <ViewModeToggle />
    </div>
  );
});

FileBrowserHeader.displayName = 'FileBrowserHeader';
