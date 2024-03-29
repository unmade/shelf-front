import React from 'react';

import { useTranslation } from 'react-i18next';

import {
  selectDeletedMediaItemById as selectById,
  useListDeletedMediaItemsQuery,
} from 'store/mediaItems';

import Spinner from 'components/ui/Spinner';

import Empty from 'components/photos/Empty';
import MediaItemGridView from 'components/photos/MediaItemGridView';

export default function Content() {
  const { t } = useTranslation('photos');

  const title = t('photos:pages.trash.emptyTitle', { defaultValue: 'Trash bin' });
  const description = t('photos:pages.trash.emptyDescription', {
    defaultValue: 'All your deleted photos appear here',
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
      <div className="flex h-full justify-center">
        <Empty title={title} description={description} />
      </div>
    );
  }

  if (!ids) {
    return (
      <div className="flex h-full justify-center">
        <Spinner />
      </div>
    );
  }

  return <MediaItemGridView ids={ids} selectById={selectById} />;
}
