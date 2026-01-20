import { memo, useMemo } from 'react';

import type { EntityState } from '@reduxjs/toolkit';

import { MediaType } from '@/constants';
import { useListFolderQuery } from '@/store/files';

import { FileBrowserProvider, type SortOption, useFileBrowserContext } from './context';
import { FileBrowserEmpty } from './FileBrowserEmpty';
import { FileBrowserGridView } from './FileBrowserGridView';
import { FileBrowserHeader } from './FileBrowserHeader';
import { FileBrowserPreview } from './FileBrowserPreview';
import { FileBrowserSkeleton } from './FileBrowserSkeleton';
import { FileBrowserStatusBar } from './FileBrowserStatusBar';
import { FileBrowserTableView } from './FileBrowserTableView';
import { PreviewProvider } from './PreviewContext';
import { SelectionProvider } from './SelectionContext';

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

/**
 * Sort files by the given sort option.
 * Folders are always sorted first, then files.
 */
function sortFiles(
  data: EntityState<FileData, string>,
  sortOption: SortOption,
): EntityState<FileData, string> {
  const ids = [...data.ids] as string[];

  ids.sort((a, b) => {
    const fileA = data.entities[a];
    const fileB = data.entities[b];

    if (!fileA || !fileB) return 0;

    // Folders always come first
    const isAFolder = fileA.mediatype === MediaType.FOLDER;
    const isBFolder = fileB.mediatype === MediaType.FOLDER;

    if (isAFolder && !isBFolder) return -1;
    if (!isAFolder && isBFolder) return 1;

    // Sort by the selected field
    let comparison = 0;

    switch (sortOption.field) {
      case 'name':
        comparison = fileA.name.toLowerCase().localeCompare(fileB.name.toLowerCase());
        break;
      case 'modified_at':
        comparison = new Date(fileA.modified_at).getTime() - new Date(fileB.modified_at).getTime();
        break;
      case 'size':
        comparison = fileA.size - fileB.size;
        break;
    }

    // Apply direction
    return sortOption.direction === 'asc' ? comparison : -comparison;
  });

  return {
    ids,
    entities: data.entities,
  };
}

interface FileBrowserContentProps {
  /** Path of the folder to display */
  path: string;
  /** Optional scroll key for persisting scroll position */
  scrollKey?: string;
  /** Callback when scroll position changes */
  onScrollOffsetChange?: (args: { key: string; offset: number }) => void;
  /** Initial scroll offset */
  initialScrollOffset?: number;
}

/**
 * Internal component that renders the appropriate view based on context.
 * This component is wrapped by FileBrowser which provides the context.
 */
const FileBrowserContent = memo(function FileBrowserContent({
  path,
  scrollKey,
  onScrollOffsetChange,
  initialScrollOffset,
}: FileBrowserContentProps) {
  const { viewMode, sortOption } = useFileBrowserContext();
  const { data, isLoading, isError } = useListFolderQuery(path);

  // Sort data when sortOption changes
  const sortedData = useMemo(() => {
    if (!data) return null;
    return sortFiles(data, sortOption);
  }, [data, sortOption]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-full flex-col">
        <FileBrowserHeader />
        <div className="flex-1">
          <FileBrowserSkeleton />
        </div>
        <FileBrowserStatusBar path={path} itemCount={0} />
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex h-full flex-col">
        <FileBrowserHeader />
        <div className="flex-1">
          <FileBrowserEmpty
            title="Unable to load folder"
            description="There was an error loading this folder. Please try again."
          />
        </div>
        <FileBrowserStatusBar path={path} itemCount={0} />
      </div>
    );
  }

  // Empty state
  if (!sortedData || sortedData.ids.length === 0) {
    return (
      <div className="flex h-full flex-col">
        <FileBrowserHeader />
        <div className="flex-1">
          <FileBrowserEmpty />
        </div>
        <FileBrowserStatusBar path={path} itemCount={0} />
      </div>
    );
  }

  const itemCount = sortedData.ids.length;

  // Render based on view mode
  return (
    <div className="flex h-full flex-col">
      <FileBrowserHeader />
      <div className="flex min-h-0 flex-1">
        {/* Main content area */}
        <div className="min-w-0 flex-1">
          {viewMode === 'grid' ? (
            <FileBrowserGridView data={sortedData} />
          ) : (
            <FileBrowserTableView
              data={sortedData}
              scrollKey={scrollKey}
              onScrollOffsetChange={onScrollOffsetChange}
              initialScrollOffset={initialScrollOffset}
            />
          )}
        </div>
        {/* Preview panel */}
        <FileBrowserPreview />
      </div>
      <FileBrowserStatusBar path={path} itemCount={itemCount} />
    </div>
  );
});

FileBrowserContent.displayName = 'FileBrowserContent';

interface FileBrowserProps extends FileBrowserContentProps {
  /** Default view mode, defaults to 'table' */
  defaultViewMode?: 'table' | 'grid';
}

/**
 * FileBrowser component that displays files and folders with virtualization.
 *
 * Features:
 * - Virtualized list for performance with large folders
 * - Table view (default) with sortable columns
 * - Easily extensible to support grid view
 * - Loading and empty states
 * - Navigation to folders on click
 *
 * @example
 * ```tsx
 * <FileBrowser path="." defaultViewMode="table" />
 * ```
 */
export const FileBrowser = memo(function FileBrowser({
  path,
  defaultViewMode = 'table',
  scrollKey,
  onScrollOffsetChange,
  initialScrollOffset,
}: FileBrowserProps) {
  return (
    <FileBrowserProvider defaultViewMode={defaultViewMode}>
      <SelectionProvider>
        <PreviewProvider>
          <FileBrowserContent
            path={path}
            scrollKey={scrollKey}
            onScrollOffsetChange={onScrollOffsetChange}
            initialScrollOffset={initialScrollOffset}
          />
        </PreviewProvider>
      </SelectionProvider>
    </FileBrowserProvider>
  );
});

FileBrowser.displayName = 'FileBrowser';
