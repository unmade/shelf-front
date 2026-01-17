import { memo } from 'react';

import { Skeleton } from '@/ui/skeleton';

interface FileBrowserSkeletonRowProps {
  style?: React.CSSProperties;
}

const FileBrowserSkeletonRow = memo(function FileBrowserSkeletonRow({
  style,
}: FileBrowserSkeletonRowProps) {
  return (
    <div
      className="flex items-center border-b border-gray-100 px-5 dark:border-zinc-800"
      style={style}
    >
      {/* Icon placeholder */}
      <Skeleton className="size-5 shrink-0 rounded sm:size-4" />

      {/* Name placeholder */}
      <div className="ml-3 flex min-w-0 flex-1 items-center py-2">
        <Skeleton className="h-4 w-48 max-w-full" />
      </div>

      {/* Modified placeholder */}
      <div className="hidden w-40 shrink-0 px-3 md:block">
        <Skeleton className="h-4 w-24" />
      </div>

      {/* Size placeholder */}
      <div className="hidden w-28 shrink-0 px-3 sm:flex sm:justify-end">
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
});

FileBrowserSkeletonRow.displayName = 'FileBrowserSkeletonRow';

interface FileBrowserSkeletonProps {
  /** Number of skeleton rows to display */
  count?: number;
}

export const FileBrowserSkeleton = memo(function FileBrowserSkeleton({
  count = 8,
}: FileBrowserSkeletonProps) {
  return (
    <div className="flex h-full flex-col" role="status" aria-label="Loading files">
      {/* Header skeleton */}
      <div className="flex items-center border-b border-gray-200 bg-gray-50/50 px-5 py-2 dark:border-zinc-700 dark:bg-zinc-800/50">
        <div className="flex-1">
          <Skeleton className="h-3 w-12" />
        </div>
        <div className="hidden w-40 shrink-0 px-3 md:block">
          <Skeleton className="h-3 w-16" />
        </div>
        <div className="hidden w-28 shrink-0 px-3 sm:flex sm:justify-end">
          <Skeleton className="h-3 w-10" />
        </div>
      </div>

      {/* Rows skeleton */}
      <div className="flex-1">
        {Array.from({ length: count }, (_, index) => (
          <FileBrowserSkeletonRow key={index} />
        ))}
      </div>
    </div>
  );
});

FileBrowserSkeleton.displayName = 'FileBrowserSkeleton';
