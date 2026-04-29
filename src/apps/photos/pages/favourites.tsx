import { useMemo } from 'react';

import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { mediaItemsAdapter, useListMediaItemsInfiniteQuery } from '@/store/mediaItems';

import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/ui/empty';
import { Heading } from '@/ui/heading';

import { MediaItemDialogsProvider } from '@/apps/photos/components/dialogs';
import {
  MediaItemBrowser,
  MediaItemsBrowserDataProvider,
} from '@/apps/photos/components/media-item-browser';
import { Page, PageContent, PageHeader } from '@/apps/photos/components/page';

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
  const {
    data: result,
    isLoading,
    isError,
    isSuccess,
    fetchNextPage,
  } = useListMediaItemsInfiniteQuery({ favourites: true });

  const data = useMemo(
    () => mediaItemsAdapter.setAll(mediaItemsAdapter.getInitialState(), result?.pages.flat() ?? []),
    [result],
  );

  const empty = isSuccess && data.ids.length === 0;
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
      loadMore={fetchNextPage}
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
