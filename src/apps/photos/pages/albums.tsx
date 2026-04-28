import { useCallback, useState } from 'react';

import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@/hooks';

import { selectListAlbumsData, useListAlbumsQuery } from '@/store/albums';

import { PlusIcon } from '@/icons';

import { Button } from '@/ui/button';
import { Heading } from '@/ui/heading';

import { AlbumDialogsProvider, useCreateAlbumDialog } from '@/apps/photos/components/dialogs';
import { AlbumsBrowser, AlbumsBrowserDataProvider } from '@/apps/photos/components/album-browser';
import { Page, PageContent, PageHeader, PageHeaderActions } from '@/apps/photos/components/page';

const PAGE_SIZE = 100;

function CreateAlbumButton() {
  const { openDialog } = useCreateAlbumDialog();

  return (
    <Button size="icon" onClick={openDialog}>
      <PlusIcon />
    </Button>
  );
}

function AlbumsBrowserContainer() {
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
