import { useCallback, useState } from 'react';

import { useAppSelector } from '@/hooks';

import {
  selectListMediaItemsData,
  useCountMediaItemsQuery,
  useListMediaItemsQuery,
} from '@/store/mediaItems';

import {
  MediaItemBrowser,
  MediaItemsBrowserDataProvider,
} from '@/apps/photos/components/media-item-browser';

import Welcome from './Welcome';

const PAGE_SIZE = 1000;

export default function Content() {
  const { itemsCount } = useCountMediaItemsQuery(undefined, {
    selectFromResult: ({ data }) => ({ itemsCount: data?.total }),
  });

  const cachedData = useAppSelector((state) =>
    selectListMediaItemsData(state, { favourites: false, pageSize: PAGE_SIZE }),
  );
  const [page, setPage] = useState(() => Math.floor(cachedData.ids.length / PAGE_SIZE) + 1);

  const { data, isLoading, isError } = useListMediaItemsQuery(
    { favourites: false, page, pageSize: PAGE_SIZE },
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
        <Welcome />
      </div>
    );
  }

  return (
    <MediaItemsBrowserDataProvider
      data={data}
      isLoading={isLoading}
      isError={isError}
      itemsCount={itemsCount}
      loadMore={loadMore}
    >
      <MediaItemBrowser />
    </MediaItemsBrowserDataProvider>
  );
}
