import { useCallback, useMemo, useState } from 'react';

import { useAppSelector } from 'hooks';
import { IMediaItem } from 'types/photos';

import { mediaItemsAdapter, selectListMediaItemsData, useListMediaItemsQuery } from 'store/photos';

const initialState = mediaItemsAdapter.getInitialState();
const { selectIds, selectById: selectMediaItemById } = mediaItemsAdapter.getSelectors();

interface Result {
  ids: string[] | null;
  selectById: (state: unknown, id: string) => IMediaItem | undefined;
  loadMore: () => void;
}

interface Args {
  favourites?: boolean;
  pageSize?: number;
}

export default function usePaginatedMediaItemsQuery({
  favourites = false,
  pageSize = 1000,
}: Args): [Result, boolean] {
  // check if anything exists in cache to calculate initial page
  const currentData = useAppSelector((state) =>
    selectListMediaItemsData(state, { pageSize, favourites }),
  );
  const initialPage = Math.floor(currentData.ids.length / pageSize) + 1;
  const [page, setPage] = useState(initialPage);

  const { data, isLoading: loading } = useListMediaItemsQuery(
    { page, pageSize, favourites },
    {
      selectFromResult: ({ data: result, isLoading }) => ({
        data: result,
        isLoading,
      }),
    },
  );

  const selectById = useCallback(
    (_state: unknown, id: string) => selectMediaItemById(data ?? initialState, id),
    [data],
  );
  const loadMore = useCallback(() => setPage((state) => state + 1), [setPage]);

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
