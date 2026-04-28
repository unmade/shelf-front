import { useCallback, useState } from 'react';

import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import type { UploadEntries } from '@/types/uploads';

import { useAppDispatch, useAppSelector } from '@/hooks';

import {
  selectListMediaItemsData,
  useCountMediaItemsQuery,
  useListMediaItemsQuery,
} from '@/store/mediaItems';
import { mediaItemEntriesAdded } from '@/store/uploads/slice';

import { CloudUploadIcon, UploadIcon } from '@/icons';

import { Button } from '@/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from '@/ui/empty';
import { Heading } from '@/ui/heading';

import FileDrop from '@/components/FileDrop';
import Uploader from '@/components/Uploader';
import { UploadButton } from '@/components/Uploader/UploadButton';
import VerifyAccountDialogProvider from '@/components/VerifyAccountDialogProvider';

import { MediaItemDialogsProvider } from '@/apps/photos/components/dialogs';
import {
  MediaItemBrowser,
  MediaItemsBrowserDataProvider,
} from '@/apps/photos/components/media-item-browser';
import { Page, PageContent, PageHeader, PageHeaderActions } from '@/apps/photos/components/page';

const PAGE_SIZE = 1000;

interface MediaItemBrowserContainerProps {
  onFilesAdded: (files: UploadEntries) => void;
}

function EmptyContainer({ onFilesAdded }: MediaItemBrowserContainerProps) {
  const { t } = useTranslation('photos');

  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>
          {t('photos:pages.library.welcomeTitle', {
            defaultValue: 'Blank Canvas Awaits Your Moments',
          })}
        </EmptyTitle>
        <EmptyDescription>
          {t('photos:pages.library.welcomeDescription', {
            defaultValue: 'To get started upload your favorite photos',
          })}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <UploadButton onFilesAdded={onFilesAdded}>
          <UploadIcon />
          {t('photos:actions.upload', { defaultValue: 'Upload' })}
        </UploadButton>
      </EmptyContent>
    </Empty>
  );
}

function MediaItemBrowserContainer({ onFilesAdded }: MediaItemBrowserContainerProps) {
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
        <EmptyContainer onFilesAdded={onFilesAdded} />
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

export default function Library() {
  const { t } = useTranslation('photos');

  const dispatch = useAppDispatch();
  const title = t('photos:pages.library.title', { defaultValue: 'Library' });

  const handleFilesAdded = useCallback(
    (files: UploadEntries) => {
      dispatch(mediaItemEntriesAdded({ files }));
    },
    [dispatch],
  );

  return (
    <VerifyAccountDialogProvider>
      <MediaItemDialogsProvider>
        <Helmet>
          <title>Shelf Photos</title>
        </Helmet>
        <Page>
          <FileDrop className="relative flex h-full flex-col" onFilesAdded={handleFilesAdded}>
            {({ dragging }) => (
              <>
                {dragging ? (
                  <div className="absolute z-10 -mt-3 h-full w-full px-2">
                    <div className="h-full w-full rounded-2xl border-3 border-dashed border-teal-200 dark:border-teal-600" />
                  </div>
                ) : null}

                <PageHeader>
                  <Heading className="py-0.5">{title}</Heading>
                  <PageHeaderActions>
                    <Uploader onFilesAdded={handleFilesAdded} uploadScope="mediaItems">
                      <Button size="icon">
                        <CloudUploadIcon />
                      </Button>
                    </Uploader>
                  </PageHeaderActions>
                </PageHeader>

                <PageContent>
                  <MediaItemBrowserContainer onFilesAdded={handleFilesAdded} />
                </PageContent>
              </>
            )}
          </FileDrop>
        </Page>
      </MediaItemDialogsProvider>
    </VerifyAccountDialogProvider>
  );
}
