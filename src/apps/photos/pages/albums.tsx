import { useMemo } from 'react';

import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { albumsAdapter, useListAlbumsInfiniteQuery } from '@/store/albums';

import { PlusIcon } from '@/icons';

import { Button } from '@/ui/button';
import { Heading } from '@/ui/heading';

import { AlbumDialogsProvider, useCreateAlbumDialog } from '@/apps/photos/components/dialogs';
import { AlbumsBrowser, AlbumsBrowserDataProvider } from '@/apps/photos/components/album-browser';
import { Page, PageContent, PageHeader, PageHeaderActions } from '@/apps/photos/components/page';

function CreateAlbumButton() {
  const { openDialog } = useCreateAlbumDialog();

  return (
    <Button size="icon" onClick={openDialog}>
      <PlusIcon />
    </Button>
  );
}

function AlbumsBrowserContainer() {
  const { data: result, isLoading, isError, fetchNextPage } = useListAlbumsInfiniteQuery(undefined);

  const data = useMemo(
    () => albumsAdapter.setAll(albumsAdapter.getInitialState(), result?.pages.flat() ?? []),
    [result],
  );

  return (
    <AlbumsBrowserDataProvider
      data={data}
      isLoading={isLoading}
      isError={isError}
      loadMore={fetchNextPage}
    >
      <AlbumsBrowser />
    </AlbumsBrowserDataProvider>
  );
}

export default function Albums() {
  const { t } = useTranslation('photos');

  const title = t('photos:pages.albums.title', { defaultValue: 'Albums' });

  return (
    <AlbumDialogsProvider>
      <Helmet>
        <title>Shelf Photos</title>
      </Helmet>
      <Page>
        <PageHeader>
          <Heading className="py-0.5">{title}</Heading>
          <PageHeaderActions>
            <CreateAlbumButton />
          </PageHeaderActions>
        </PageHeader>
        <PageContent>
          <AlbumsBrowserContainer />
        </PageContent>
      </Page>
    </AlbumDialogsProvider>
  );
}
