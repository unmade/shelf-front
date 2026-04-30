import { useMemo } from 'react';

import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import {
  mediaItemsAdapter,
  useCountMediaItemsQuery,
  useListDeletedMediaItemsInfiniteQuery,
} from '@/store/mediaItems';

import { TrashIcon } from '@/icons';

import { Button } from '@/ui/button';
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/ui/empty';
import { Heading } from '@/ui/heading';

import { MediaItemDialogsProvider, useEmptyTrashDialog } from '@/apps/photos/components/dialogs';
import { DeletedMediaItemActionsDropdown } from '@/apps/photos/components/media-item-actions-dropdown';
import {
  MediaItemBrowser,
  MediaItemsBrowserDataProvider,
} from '@/apps/photos/components/media-item-browser';
import { Page, PageContent, PageHeader, PageHeaderActions } from '@/apps/photos/components/page';

function EmptyTrashButton() {
  const { t } = useTranslation('photos');

  const { openDialog } = useEmptyTrashDialog();

  return (
    <Button
      variant="destructive"
      size="icon"
      title={t('photos:actions.emptyTrash', { defaultValue: 'Empty Trash' })}
      onClick={openDialog}
    >
      <TrashIcon className="h-5 w-5 shrink-0" />
    </Button>
  );
}

function MediaItemBrowserContainer() {
  const { t } = useTranslation('photos');

  const { itemsCount } = useCountMediaItemsQuery(undefined, {
    selectFromResult: ({ data }) => ({ itemsCount: data?.deleted }),
  });

  const {
    data: result,
    isError,
    isLoading,
    isSuccess,
    fetchNextPage,
  } = useListDeletedMediaItemsInfiniteQuery(undefined);

  const data = useMemo(
    () => mediaItemsAdapter.setAll(mediaItemsAdapter.getInitialState(), result?.pages.flat() ?? []),
    [result],
  );

  const empty = isSuccess && data.ids.length === 0;
  if (empty) {
    return (
      <Empty className="h-full">
        <EmptyHeader>
          <EmptyTitle>
            {t('photos:pages.trash.emptyTitle', { defaultValue: 'Trash bin' })}
          </EmptyTitle>
          <EmptyDescription>
            {t('photos:pages.trash.emptyDescription', {
              defaultValue: 'All your deleted photos appear here',
            })}
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <MediaItemsBrowserDataProvider
      data={data}
      isLoading={isLoading}
      isError={isError}
      itemsCount={itemsCount}
      loadMore={fetchNextPage}
    >
      <MediaItemBrowser mediaItemActionsDropdown={DeletedMediaItemActionsDropdown} />
    </MediaItemsBrowserDataProvider>
  );
}

export default function Trash() {
  const { t } = useTranslation('photos');

  const title = t('photos:pages.trash.title', { defaultValue: 'Trash' });

  return (
    <MediaItemDialogsProvider>
      <Helmet>
        <title>Shelf Photos</title>
      </Helmet>
      <Page>
        <PageHeader>
          <Heading className="py-0.5">{title}</Heading>
          <PageHeaderActions>
            <EmptyTrashButton />
          </PageHeaderActions>
        </PageHeader>
        <PageContent>
          <MediaItemBrowserContainer />
        </PageContent>
      </Page>
    </MediaItemDialogsProvider>
  );
}
