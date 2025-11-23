import { useTranslation } from 'react-i18next';

import {
  selectDeletedMediaItemById as selectById,
  useCountMediaItemsQuery,
  useListDeletedMediaItemsQuery,
} from 'store/mediaItems';

import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/ui/empty';
import { Spinner } from '@/ui/spinner';

import MediaItemGridView from 'components/photos/MediaItemGridView';
import DeletedMediaItemMenu from 'components/photos/DeletedMediaItemMenu';

export default function Content() {
  const { t } = useTranslation('photos');

  const title = t('photos:pages.trash.emptyTitle', { defaultValue: 'Trash bin' });
  const description = t('photos:pages.trash.emptyDescription', {
    defaultValue: 'All your deleted photos appear here',
  });

  const { itemsCount } = useCountMediaItemsQuery(undefined, {
    selectFromResult: ({ data }) => ({ itemsCount: data?.deleted }),
  });

  const { ids, isFetching: loading } = useListDeletedMediaItemsQuery(undefined, {
    selectFromResult: ({ data, isFetching }) => ({
      ids: data?.ids,
      isFetching,
    }),
  });

  const empty = ids?.length != null && ids?.length === 0 && !loading;
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

  if (!ids) {
    return <Spinner className="h-full" />;
  }

  return (
    <MediaItemGridView
      ids={ids}
      itemsCount={itemsCount}
      selectById={selectById}
      menuItemRenderer={DeletedMediaItemMenu}
    />
  );
}
