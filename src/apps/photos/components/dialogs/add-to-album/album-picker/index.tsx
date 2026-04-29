import { useMemo } from 'react';

import type { IAlbum } from '@/types/photos';

import { cn } from '@/lib/utils';

import { albumsAdapter, useListAlbumsInfiniteQuery } from '@/store/albums';

import { Spinner } from '@/ui/spinner';

import { AddToAlbumEmpty } from './empty';
import { AlbumPickerList } from './list';

const { selectIds } = albumsAdapter.getSelectors();

interface Props {
  className?: string;
  pendingAlbumSlug?: string;
  onItemClick?: (albumSlug: string) => void;
}

export function AlbumPicker({ className, pendingAlbumSlug, onItemClick }: Props) {
  const { data: result, isLoading, fetchNextPage } = useListAlbumsInfiniteQuery(undefined);

  const albums = useMemo(
    () => albumsAdapter.setAll(albumsAdapter.getInitialState(), result?.pages.flat() ?? []),
    [result],
  );

  const ids = selectIds(albums) as string[];

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="flex flex-1 flex-col rounded-xl border border-gray-200 bg-gray-900/5 p-2 dark:border-zinc-700 dark:bg-zinc-900/25">
        {isLoading ? (
          <Spinner className="flex-1" />
        ) : ids.length === 0 ? (
          <AddToAlbumEmpty />
        ) : (
          <AlbumPickerList
            entities={albums.entities as Record<string, IAlbum>}
            ids={ids}
            pendingAlbumSlug={pendingAlbumSlug}
            loadMore={fetchNextPage}
            onItemClick={onItemClick}
          />
        )}
      </div>
    </div>
  );
}
