import React from 'react';

import {
  selectDeletedMediaItemById as selectById,
  useListDeletedMediaItemsQuery,
} from 'store/photos';

import Spinner from 'components/ui/Spinner';

import Empty from 'components/photos/Empty';
import MediaItemGridView from 'components/photos/MediaItemGridView';

export default function Content() {
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
        <Empty title="Trash bin" description="All your deleted photos appear here" />
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
