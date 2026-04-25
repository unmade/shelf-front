import { useCallback, useState } from 'react';

import { useAppSelector } from '@/hooks';

import { selectListAlbumsData, useListAlbumsQuery } from '@/store/albums';

import { AlbumsBrowser, AlbumsBrowserDataProvider } from '@/apps/photos/components/album-browser';

const PAGE_SIZE = 100;

export default function Content() {
  const cachedData = useAppSelector((state) =>
    selectListAlbumsData(state, { pageSize: PAGE_SIZE }),
  );
  const [page, setPage] = useState(() => Math.floor(cachedData.ids.length / PAGE_SIZE) + 1);

  const { data, isLoading, isError } = useListAlbumsQuery(
    { page, pageSize: PAGE_SIZE },
    {
      selectFromResult: ({ data, isLoading, isError }) => ({
        data,
        isLoading,
        isError,
      }),
    },
  );

  const loadMore = useCallback(() => {
    setPage((currentPage) => currentPage + 1);
  }, []);

  return (
    <AlbumsBrowserDataProvider
      data={data}
      isLoading={isLoading}
      isError={isError}
      loadMore={loadMore}
    >
      <AlbumsBrowser />
    </AlbumsBrowserDataProvider>
  );
}
