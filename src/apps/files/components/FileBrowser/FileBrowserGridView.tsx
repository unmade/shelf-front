import { memo, useMemo } from 'react';
import { useNavigate } from 'react-router';

import type { EntityState } from '@reduxjs/toolkit';

import { MediaType, ThumbnailSize } from '@/constants';
import * as routes from '@/routes';

import FileIcon from '@/components/FileIcon';
import Thumbnail from '@/components/Thumbnail';

import { Checkbox } from '@/ui/checkbox';
import { type ItemRendererProps, VGrid } from '@/ui/vgrid';

import { Breakpoint, useBreakpoint } from '@/hooks/media-query';

import { usePreviewContext } from './PreviewContext';
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
  thumbnail_url?: string;
}

interface ItemData {
  ids: string[];
  entities: Record<string, FileData>;
  columnCount: number;
}

const ROW_HEIGHT_OFFSET = 24; // Extra height for file name

/**
 * Calculate grid layout based on screen size.
 */
function useGridLayout(itemCount: number): { columnCount: number; rowCount: number } {
  const breakpoint = useBreakpoint();

  const columnCount = useMemo(() => {
    switch (breakpoint) {
      case Breakpoint.base:
        return 3;
      case Breakpoint.sm:
        return 4;
      case Breakpoint.md:
        return 6;
      case Breakpoint.lg:
        return 8;
      case Breakpoint.xl:
      case Breakpoint.xxl:
      default:
        return 10;
    }
  }, [breakpoint]);

  const rowCount = Math.ceil(itemCount / columnCount);

  return { columnCount, rowCount };
}

/**
 * Individual grid item component for a file or folder.
 */
interface GridItemProps {
  file: FileData;
}

const GridItem = memo(
  function GridItem({ file }: GridItemProps) {
    const navigate = useNavigate();
    const { selectedIds, toggleSelection } = useSelectionContext();
    const { openPreview } = usePreviewContext();

    const isFolder = file.mediatype === MediaType.FOLDER;
    const selected = selectedIds.has(file.id);
    const hasThumbnail = file.thumbnail_url && !isFolder;

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      // If clicking on checkbox area, don't navigate or preview
      const target = event.target as HTMLElement;
      if (target.closest('[data-slot="checkbox"]') || target.closest('[data-checkbox-cell]')) {
        return;
      }

      // Cmd/Ctrl click for multi-select
      if (event.metaKey || event.ctrlKey) {
        toggleSelection(file.id);
        return;
      }

      if (isFolder) {
        const encodedPath = routes.encodePath(file.path);
        navigate(`${routes.FILES.prefix}/${encodedPath}`);
      } else {
        // Open preview for files
        openPreview(file.id);
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (isFolder) {
          const encodedPath = routes.encodePath(file.path);
          navigate(`${routes.FILES.prefix}/${encodedPath}`);
        }
      }
    };

    const handleCheckboxChange = (checked: boolean | 'indeterminate') => {
      if (checked !== 'indeterminate') {
        toggleSelection(file.id);
      }
    };

    return (
      <div
        role="gridcell"
        tabIndex={0}
        data-selected={selected}
        className="group relative flex h-full flex-col items-center justify-start p-1.5 focus:outline-none"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {/* Selection checkbox - visible on hover or when selected */}
        <div
          data-checkbox-cell
          className={`absolute top-2 left-2 z-10 ${
            selected
              ? 'opacity-100'
              : 'opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100'
          }`}
        >
          <Checkbox
            checked={selected}
            onCheckedChange={handleCheckboxChange}
            aria-label={`Select ${file.name}`}
            className="size-4 bg-white shadow-sm dark:bg-zinc-800"
          />
        </div>

        {/* Thumbnail/Icon container */}
        <div
          className={`flex aspect-square w-full items-center justify-center overflow-hidden rounded-md transition-all ${
            selected
              ? 'ring-2 ring-blue-600 ring-offset-1 dark:ring-indigo-500 dark:ring-offset-zinc-900'
              : 'group-hover:bg-gray-100 dark:group-hover:bg-zinc-800'
          } ${hasThumbnail ? 'bg-gray-100 dark:bg-zinc-800' : ''}`}
        >
          {hasThumbnail ? (
            <Thumbnail
              className="h-full w-full rounded-md object-cover"
              file={file}
              size={ThumbnailSize.xs}
            />
          ) : (
            <FileIcon
              className="size-12"
              hidden={file.hidden}
              mediatype={file.mediatype}
              shared={file.shared}
            />
          )}
        </div>

        {/* File name */}
        <div className="mt-1 w-full px-0.5 text-center">
          <span
            className={`line-clamp-2 text-[11px] leading-tight font-normal ${
              file.hidden ? 'text-gray-400 dark:text-zinc-500' : 'text-gray-700 dark:text-zinc-300'
            }`}
            title={file.name}
          >
            {file.name}
          </span>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.file === nextProps.file;
  },
);

GridItem.displayName = 'GridItem';

/**
 * Virtualized grid cell renderer.
 */
const CellRenderer = memo(
  function CellRenderer({ columnIndex, rowIndex, data, style }: ItemRendererProps<ItemData>) {
    const itemIndex = rowIndex * data.columnCount + columnIndex;

    // Handle edge case where we have fewer items than grid cells in last row
    if (itemIndex >= data.ids.length) {
      return null;
    }

    const fileId = data.ids[itemIndex];
    const file = data.entities[fileId];

    if (!file) {
      return null;
    }

    return (
      <div style={style}>
        <GridItem file={file} />
      </div>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.rowIndex !== nextProps.rowIndex) return false;
    if (prevProps.columnIndex !== nextProps.columnIndex) return false;
    if (prevProps.style !== nextProps.style) return false;

    const prevIndex = prevProps.rowIndex * prevProps.data.columnCount + prevProps.columnIndex;
    const nextIndex = nextProps.rowIndex * nextProps.data.columnCount + nextProps.columnIndex;

    // Off-grid cells
    if (prevIndex >= prevProps.data.ids.length && nextIndex >= nextProps.data.ids.length) {
      return true;
    }

    if (prevIndex !== nextIndex) return false;

    const prevFileId = prevProps.data.ids[prevIndex];
    const nextFileId = nextProps.data.ids[nextIndex];
    if (prevFileId !== nextFileId) return false;

    const prevFile = prevProps.data.entities[prevFileId];
    const nextFile = nextProps.data.entities[nextFileId];
    return prevFile === nextFile;
  },
);

CellRenderer.displayName = 'CellRenderer';

interface FileBrowserGridViewProps {
  /** EntityState from RTK Query containing files */
  data: EntityState<FileData, string>;
}

/**
 * Grid view for the file browser.
 * Displays files and folders as a grid of thumbnails/icons.
 */
export const FileBrowserGridView = memo(function FileBrowserGridView({
  data,
}: FileBrowserGridViewProps) {
  const allIds = data.ids as string[];
  const itemCount = allIds.length;

  const { columnCount, rowCount } = useGridLayout(itemCount);

  // Memoize item data for virtualization
  const itemData = useMemo<ItemData>(
    () => ({
      ids: allIds,
      entities: data.entities as Record<string, FileData>,
      columnCount,
    }),
    [allIds, data.entities, columnCount],
  );

  return (
    <div className="h-full p-2" role="grid" aria-label="Files grid">
      <VGrid
        columnCount={columnCount}
        rowCount={rowCount}
        rowHeightOffset={ROW_HEIGHT_OFFSET}
        itemData={itemData}
        itemRenderer={CellRenderer}
        overscanRowCount={2}
      />
    </div>
  );
});

FileBrowserGridView.displayName = 'FileBrowserGridView';
