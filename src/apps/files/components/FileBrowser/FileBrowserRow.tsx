import { memo } from 'react';
import { useNavigate } from 'react-router';

import { MediaType } from '@/constants';
import * as routes from '@/routes';

import FileIcon from '@/components/FileIcon';

import { Checkbox } from '@/ui/checkbox';
import { FileSize } from '@/ui/filesize';
import { TimeAgo } from '@/ui/timeago';

import { FileBrowserRowActions } from './FileBrowserRowActions';
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
}

interface FileBrowserRowProps {
  file: FileData;
  index?: number;
  style?: React.CSSProperties;
}

/**
 * Memoized row component for the file browser.
 * Uses selection context directly instead of props for better performance.
 */
export const FileBrowserRow = memo(
  function FileBrowserRow({ file, index = 0, style }: FileBrowserRowProps) {
    const navigate = useNavigate();
    const { selectedIds, toggleSelection } = useSelectionContext();
    const { openPreview } = usePreviewContext();

    const isFolder = file.mediatype === MediaType.FOLDER;
    const selected = selectedIds.has(file.id);
    const isEven = index % 2 === 0;

    const handleRowClick = (event: React.MouseEvent<HTMLDivElement>) => {
      // If clicking on checkbox, actions menu, or other interactive elements, don't navigate
      const target = event.target as HTMLElement;
      if (
        target.closest('[data-slot="checkbox"]') ||
        target.closest('[data-checkbox-cell]') ||
        target.closest('[data-actions-cell]')
      ) {
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

    // Outer container handles absolute positioning from virtualization
    // Inner container handles styling (rounded, colors, padding)
    return (
      <div style={style} className="px-4 py-0.5">
        <div
          role="row"
          tabIndex={0}
          data-selected={selected}
          className={`group flex h-full cursor-default items-center rounded-lg px-4 focus:outline-none ${
            selected
              ? 'bg-blue-100 dark:bg-indigo-600/30'
              : isEven
                ? 'bg-gray-50/80 dark:bg-zinc-700/30'
                : 'bg-transparent'
          }`}
          onClick={handleRowClick}
          onKeyDown={handleKeyDown}
        >
          {/* Checkbox column */}
          <div role="cell" data-checkbox-cell className="mr-4 flex shrink-0 items-center">
            <Checkbox
              checked={selected}
              onCheckedChange={handleCheckboxChange}
              aria-label={`Select ${file.name}`}
            />
          </div>

          {/* Name column */}
          <div role="cell" className="flex min-w-0 flex-1 items-center gap-3 py-3">
            <FileIcon
              className="size-8 shrink-0"
              hidden={file.hidden}
              mediatype={file.mediatype}
              shared={file.shared}
            />
            <span
              className={`truncate text-sm font-medium ${
                file.hidden
                  ? 'text-gray-400 dark:text-zinc-500'
                  : 'text-gray-900 dark:text-zinc-100'
              }`}
            >
              {file.name}
            </span>
          </div>

          {/* Actions column */}
          <div
            role="cell"
            data-actions-cell
            className="ml-2 flex w-10 shrink-0 items-center justify-end opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 data-[state=open]:opacity-100"
          >
            <FileBrowserRowActions file={file} isFolder={isFolder} />
          </div>

          {/* Modified column */}
          <div
            role="cell"
            className="hidden w-40 shrink-0 px-3 text-sm text-gray-500 md:block dark:text-zinc-400"
          >
            <TimeAgo value={file.modified_at} />
          </div>

          {/* Size column */}
          <div
            role="cell"
            className="hidden w-28 shrink-0 px-3 text-right text-sm text-gray-500 sm:block dark:text-zinc-400"
          >
            {isFolder ? '—' : <FileSize bytes={file.size} />}
          </div>
        </div>
      </div>
    );
  },
  // Custom comparison: only re-render if file data changes
  // Selection state is handled via context, not props
  (prevProps, nextProps) => {
    return (
      prevProps.file === nextProps.file &&
      prevProps.index === nextProps.index &&
      prevProps.style === nextProps.style
    );
  },
);

FileBrowserRow.displayName = 'FileBrowserRow';
