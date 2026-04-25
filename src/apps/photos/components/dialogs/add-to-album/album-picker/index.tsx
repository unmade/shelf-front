import { cn } from '@/lib/utils';

import usePaginatedAlbumsQuery from '@/apps/photos/hooks/list-albums';

import { AlbumPickerList } from './list';

interface Props {
  className?: string;
  onItemClick: (albumSlug: string) => void;
}

export function AlbumPicker({ className, onItemClick }: Props) {
  const [{ ids, selectById }, loading] = usePaginatedAlbumsQuery({ pageSize: 100 });

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="flex flex-1 flex-col rounded-xl border border-gray-200 bg-gray-900/5 px-2 py-1 dark:border-zinc-700 dark:bg-zinc-900/25">
        <AlbumPickerList
          loading={loading}
          ids={ids ?? []}
          selectById={selectById}
          onItemClick={onItemClick}
        />
      </div>
    </div>
  );
}
