import { useCallback, useState } from 'react';

import { useAppSelector } from '@/hooks';
import { selectListMediaItemsData, useListMediaItemsQuery } from '@/store/mediaItems';

import {
  MediaItemBrowser,
  MediaItemsBrowserDataProvider,
} from '@/apps/photos/components/media-item-browser';

import Empty from './Empty';

const PAGE_SIZE = 1000;

export default function Content() {
  const cachedData = useAppSelector((state) =>
    selectListMediaItemsData(state, { favourites: true, pageSize: PAGE_SIZE }),
  );
  const [page, setPage] = useState(() => Math.floor(cachedData.ids.length / PAGE_SIZE) + 1);

  const { data, isLoading, isError } = useListMediaItemsQuery(
    { favourites: true, page, pageSize: PAGE_SIZE },
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

  const empty = data?.ids.length === 0 && !isLoading && !isError;
  if (empty) {
    return (
      <div className="flex h-full">
        <Empty />
      </div>
    );
  }

  return (
    <MediaItemsBrowserDataProvider
      data={data}
      isLoading={isLoading}
      isError={isError}
      loadMore={loadMore}
    >
      <MediaItemBrowser />
    </MediaItemsBrowserDataProvider>
  );
}
