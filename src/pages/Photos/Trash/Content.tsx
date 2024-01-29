import React from 'react';

import * as icons from 'icons';

import {
  selectDeletedMediaItemById as selectById,
  useListDeletedMediaItemsQuery,
} from 'store/photos';

import Empty from 'components/ui/Empty';
import Spinner from 'components/ui/Spinner';

import MediaItemGridView from 'components/photos/MediaItemGridView';

export default function Content() {
  const { ids, isFetching: loading } = useListDeletedMediaItemsQuery(undefined, {
    selectFromResult: ({ data, isFetching }) => ({
      ids: data?.ids as string[] | undefined,
      isFetching,
    }),
  });

  const empty = ids?.length != null && ids?.length === 0 && !loading;
  if (empty) {
    return (
      <div className="flex h-full justify-center">
        <Empty
          icon={<icons.TrashOutlined className="h-12 w-12 text-gray-400 dark:text-zinc-500" />}
          title="Deleted media items will appear here"
        />
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
