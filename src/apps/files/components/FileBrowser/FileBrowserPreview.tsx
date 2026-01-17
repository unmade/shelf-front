import { memo } from 'react';

import { XIcon } from 'lucide-react';

import { Button } from '@/ui/button';

import { usePreviewContext } from './PreviewContext';

interface FileBrowserPreviewProps {
  /** Optional className for additional styling */
  className?: string;
}

/**
 * Side panel for previewing file information.
 * This is a placeholder component - the actual content will be implemented later.
 */
export const FileBrowserPreview = memo(function FileBrowserPreview({
  className = '',
}: FileBrowserPreviewProps) {
  const { previewFileId, closePreview } = usePreviewContext();

  if (!previewFileId) {
    return null;
  }

  return (
    <div
      className={`flex h-full w-80 shrink-0 flex-col border-l border-gray-200 bg-white dark:border-zinc-700 dark:bg-zinc-900 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-zinc-700">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-zinc-100">File Preview</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={closePreview}
          aria-label="Close preview"
          className="size-8"
        >
          <XIcon className="size-4" />
        </Button>
      </div>

      {/* Content placeholder */}
      <div className="flex flex-1 flex-col items-center justify-center p-4">
        <p className="text-center text-sm text-gray-500 dark:text-zinc-400">
          Preview content will be implemented here.
        </p>
        <p className="mt-2 text-center text-xs text-gray-400 dark:text-zinc-500">
          File ID: {previewFileId}
        </p>
      </div>
    </div>
  );
});

FileBrowserPreview.displayName = 'FileBrowserPreview';
