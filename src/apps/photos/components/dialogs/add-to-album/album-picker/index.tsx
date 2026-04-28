import { cn } from '@/lib/utils';

import usePaginatedAlbumsQuery from '@/apps/photos/hooks/list-albums';

import { Spinner } from '@/ui/spinner';

import { AddToAlbumEmpty } from './empty';
import { AlbumPickerList } from './list';

interface Props {
  className?: string;
  pendingAlbumSlug?: string;
  onItemClick?: (albumSlug: string) => void;
}

export function AlbumPicker({ className, pendingAlbumSlug, onItemClick }: Props) {
  const [{ entities, ids, loadMore }, albumsLoading] = usePaginatedAlbumsQuery({ pageSize: 100 });

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="flex flex-1 flex-col rounded-xl border border-gray-200 bg-gray-900/5 p-2 dark:border-zinc-700 dark:bg-zinc-900/25">
        {albumsLoading ? (
          <Spinner className="flex-1" />
        ) : ids.length === 0 ? (
          <AddToAlbumEmpty />
        ) : (
          <AlbumPickerList
            entities={entities}
            ids={ids}
            loadMore={loadMore}
            onItemClick={onItemClick}
            pendingAlbumSlug={pendingAlbumSlug}
          />
        )}
      </div>
    </div>
  );
}
