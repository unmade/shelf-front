import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { EntityState } from '@reduxjs/toolkit';

import { Checkbox } from '@/ui/checkbox';
import { type ItemRendererProps, VList } from '@/ui/vlist';

import { FileBrowserRow } from './FileBrowserRow';
import { useSelectionContext } from './SelectionContext';

interface FileData {
  id: string;
  name: string;
  path: string;
  size: number;
  mediatype: string;
  hidden: boolean;
  shared: boolean;
  modified_at: string;
}

interface ItemData {
  ids: string[];
  entities: Record<string, FileData>;
}

const ROW_HEIGHT = 64;

/**
 * Virtualized row renderer for the table view.
 * Selection is handled via context, not props.
 */
const RowRenderer = memo(
  function RowRenderer({ index, data, style }: ItemRendererProps<ItemData>) {
    const fileId = data.ids[index];
    const file = data.entities[fileId];

    if (!file) {
      return null;
    }

    return <FileBrowserRow file={file} style={style} />;
  },
  // Custom comparison: only re-render if the specific file at this index changes
  (prevProps, nextProps) => {
    if (prevProps.index !== nextProps.index) return false;
    if (prevProps.style !== nextProps.style) return false;

    const prevFileId = prevProps.data.ids[prevProps.index];
    const nextFileId = nextProps.data.ids[nextProps.index];
    if (prevFileId !== nextFileId) return false;

    // Compare the actual file object reference
    const prevFile = prevProps.data.entities[prevFileId];
    const nextFile = nextProps.data.entities[nextFileId];
    return prevFile === nextFile;
  },
);

RowRenderer.displayName = 'RowRenderer';

interface FileBrowserTableHeaderProps {
  className?: string;
  totalCount: number;
  onSelectAll: () => void;
}

/**
 * Table header with select all functionality.
 * Receives onSelectAll from parent (which has access to all IDs).
 */
const FileBrowserTableHeader = memo(function FileBrowserTableHeader({
  className = '',
  totalCount,
  onSelectAll,
}: FileBrowserTableHeaderProps) {
  const { t } = useTranslation();
  const { selectedIds, clearSelection } = useSelectionContext();

  const selectedCount = selectedIds.size;
  const isAllSelected = totalCount > 0 && selectedCount === totalCount;
  const isIndeterminate = selectedCount > 0 && selectedCount < totalCount;

  const handleCheckedChange = (checked: boolean | 'indeterminate') => {
    if (checked === true) {
      onSelectAll();
    } else {
      clearSelection();
    }
  };

  return (
    <div
      role="row"
      className={`flex items-center border-b border-gray-200 bg-gray-50/50 px-5 py-2 dark:border-zinc-700 dark:bg-zinc-800/50 ${className}`}
    >
      {/* Select all checkbox */}
      <div role="columnheader" className="mr-3 flex shrink-0 items-center">
        <Checkbox
          checked={isIndeterminate ? 'indeterminate' : isAllSelected}
          onCheckedChange={handleCheckedChange}
          aria-label={t('Select all files')}
        />
      </div>
      <div
        role="columnheader"
        className="flex-1 text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-zinc-400"
      >
        {selectedCount > 0 ? t('{{count}} selected', { count: selectedCount }) : t('Name')}
      </div>
      <div
        role="columnheader"
        className="hidden w-40 shrink-0 px-3 text-xs font-medium tracking-wide text-gray-500 uppercase md:block dark:text-zinc-400"
      >
        {t('Modified')}
      </div>
      <div
        role="columnheader"
        className="hidden w-28 shrink-0 px-3 text-right text-xs font-medium tracking-wide text-gray-500 uppercase sm:block dark:text-zinc-400"
      >
        {t('Size')}
      </div>
    </div>
  );
});

FileBrowserTableHeader.displayName = 'FileBrowserTableHeader';

interface FileBrowserTableViewProps {
  /** EntityState from RTK Query containing files */
  data: EntityState<FileData, string>;
  /** Optional scroll key for persisting scroll position */
  scrollKey?: string;
  /** Callback when scroll position changes */
  onScrollOffsetChange?: (args: { key: string; offset: number }) => void;
  /** Initial scroll offset (in items, not pixels) */
  initialScrollOffset?: number;
}

const HEADER_HEIGHT = 37;

export const FileBrowserTableView = memo(function FileBrowserTableView({
  data,
  scrollKey,
  onScrollOffsetChange,
  initialScrollOffset = 0,
}: FileBrowserTableViewProps) {
  const { selectAll } = useSelectionContext();

  const allIds = data.ids as string[];
  const itemCount = allIds.length;

  // Provide all IDs to header for "select all" functionality
  const handleSelectAll = useMemo(() => {
    return () => selectAll(allIds);
  }, [selectAll, allIds]);

  // Memoize item data to maintain stable reference
  // Selection is handled via context, so we only need ids and entities
  const itemData = useMemo<ItemData>(
    () => ({
      ids: allIds,
      entities: data.entities as Record<string, FileData>,
    }),
    [allIds, data.entities],
  );

  return (
    <div className="flex h-full flex-col" role="table" aria-label="Files">
      <FileBrowserTableHeader totalCount={itemCount} onSelectAll={handleSelectAll} />
      <div className="flex-1">
        <VList
          itemCount={itemCount}
          itemData={itemData}
          itemHeight={ROW_HEIGHT}
          heightOffset={HEADER_HEIGHT}
          scrollKey={scrollKey}
          initialScrollOffset={initialScrollOffset}
          onScrollOffsetChange={onScrollOffsetChange}
          itemRenderer={RowRenderer}
        />
      </div>
    </div>
  );
});

FileBrowserTableView.displayName = 'FileBrowserTableView';
