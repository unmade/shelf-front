import { useCallback, useState } from 'react';

import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@/hooks';

import { selectListMediaItemsData, useListMediaItemsQuery } from '@/store/mediaItems';

import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/ui/empty';
import { Heading } from '@/ui/heading';

import { MediaItemDialogsProvider } from '@/apps/photos/components/dialogs';
import {
  MediaItemBrowser,
  MediaItemsBrowserDataProvider,
} from '@/apps/photos/components/media-item-browser';
import { Page, PageContent, PageHeader } from '@/apps/photos/components/page';

const PAGE_SIZE = 1000;

function EmptyContainer() {
  const { t } = useTranslation('photos');

  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>
          {t('photos:pages.favourites.emptyTitle', { defaultValue: 'No favorites yet!' })}
        </EmptyTitle>
        <EmptyDescription>
          {t('photos:pages.favourites.emptyDescription', {
            defaultValue: 'Start curating your special moments by marking photos as favorites',
          })}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

function MediaItemBrowserContainer() {
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
        <EmptyContainer />
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

export default function Favourites() {
  const { t } = useTranslation('photos');

  const title = t('photos:pages.favourite.title', { defaultValue: 'Favourites' });

  return (
    <MediaItemDialogsProvider>
      <Helmet>
        <title>Shelf Photos</title>
      </Helmet>
      <Page>
        <PageHeader>
          <Heading className="py-0.5">{title}</Heading>
        </PageHeader>
        <PageContent>
          <MediaItemBrowserContainer />
        </PageContent>
      </Page>
    </MediaItemDialogsProvider>
  );
}
