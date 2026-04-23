import { useTranslation } from 'react-i18next';

import { useCountMediaItemsQuery, useListDeletedMediaItemsQuery } from 'store/mediaItems';

import { DeletedMediaItemActionsDropdown } from '@/apps/photos/components/media-item-actions-dropdown';
import {
  MediaItemBrowser,
  MediaItemsBrowserDataProvider,
} from '@/apps/photos/components/media-item-browser';
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/ui/empty';

export default function Content() {
  const { t } = useTranslation('photos');

  const title = t('photos:pages.trash.emptyTitle', { defaultValue: 'Trash bin' });
  const description = t('photos:pages.trash.emptyDescription', {
    defaultValue: 'All your deleted photos appear here',
  });

  const { itemsCount } = useCountMediaItemsQuery(undefined, {
    selectFromResult: ({ data }) => ({ itemsCount: data?.deleted }),
  });

  const { data, isError, isLoading } = useListDeletedMediaItemsQuery(undefined, {
    selectFromResult: ({ data, isError, isLoading }) => ({
      data,
      isError,
      isLoading,
    }),
  });

  const empty = data?.ids.length === 0 && !isLoading && !isError;
  if (empty) {
    return (
      <Empty className="h-full">
        <EmptyHeader>
          <EmptyTitle>{title}</EmptyTitle>
          <EmptyDescription>{description}</EmptyDescription>
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
    >
      <MediaItemBrowser mediaItemActionsDropdown={DeletedMediaItemActionsDropdown} />
    </MediaItemsBrowserDataProvider>
  );
}
