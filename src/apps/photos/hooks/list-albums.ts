import { useCallback, useMemo, useState } from 'react';

import { useAppSelector } from 'hooks';
import type { IAlbum } from 'types/photos';

import { albumsAdapter, selectListAlbumsData, useListAlbumsQuery } from 'store/albums';

const { selectIds } = albumsAdapter.getSelectors();

interface Result {
  entities: Record<string, IAlbum>;
  ids: string[];
  loadMore: () => void;
}

interface Args {
  pageSize?: number;
}

export default function usePaginatedAlbumsQuery({ pageSize = 1000 }: Args): [Result, boolean] {
  // check if anything exists in cache to calculate initial page
  const currentData = useAppSelector((state) => selectListAlbumsData(state, { pageSize }));
  const initialPage = Math.floor(currentData.ids.length / pageSize) + 1;
  const [page, setPage] = useState(initialPage);

  const {
    data,
    isFetching,
    isLoading: loading,
  } = useListAlbumsQuery(
    { page, pageSize },
    {
      selectFromResult: ({ data: result, isFetching, isLoading }) => ({
        data: result,
        isFetching,
        isLoading,
      }),
    },
  );

  const albums = data ?? currentData;
  const hasMore = albums.ids.length >= page * pageSize;

  const loadMore = useCallback(() => {
    if (isFetching || !hasMore) {
      return;
    }

    setPage((state) => state + 1);
  }, [hasMore, isFetching]);

  const result = useMemo(
    () => ({
      entities: albums.entities as Record<string, IAlbum>,
      ids: selectIds(albums) as string[],
      loadMore,
    }),
    [albums, loadMore],
  );

  return [result, loading];
}
