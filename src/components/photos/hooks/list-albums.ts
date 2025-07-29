import { useCallback, useMemo, useState } from 'react';

import { useAppSelector } from 'hooks';
import type { IAlbum } from 'types/photos';

import { albumsAdapter, selectListAlbumsData, useListAlbumsQuery } from 'store/albums';

const initialState = albumsAdapter.getInitialState();
const { selectIds, selectById: selectAlbumById } = albumsAdapter.getSelectors();

interface Result {
  ids: string[] | null;
  selectById: (state: unknown, id: string) => IAlbum | undefined;
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

  const { data, isLoading: loading } = useListAlbumsQuery(
    { page, pageSize },
    {
      selectFromResult: ({ data: result, isLoading }) => ({
        data: result,
        isLoading,
      }),
    },
  );

  const selectById = useCallback(
    (_state: unknown, id: string) => selectAlbumById(data ?? initialState, id),
    [data],
  );
  const loadMore = useCallback(() => {
    setPage((state) => state + 1);
  }, [setPage]);

  const result = useMemo(
    () => ({
      ids: data ? selectIds(data) : null,
      selectById,
      loadMore,
    }),
    [data, selectById, loadMore],
  );

  return [result, loading];
}
