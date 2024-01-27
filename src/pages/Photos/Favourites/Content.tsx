import React from 'react';

import { selectMediaItemById, useListMediaItemsQuery } from 'store/photos';
import { RootState } from 'store/store';

import Spinner from 'components/ui/Spinner';

import MediaItemGridView from 'components/photos/MediaItemGridView';

import Empty from './Empty';

function selectById(state: RootState, id: string) {
  return selectMediaItemById(state, { id, filters: { favourites: true } });
}

export default function Content() {
  const { ids, isFetching: loading } = useListMediaItemsQuery(
    { favourites: true },
    {
      selectFromResult: ({ data, isFetching }) => ({
        ids: data?.ids as string[] | undefined,
        isFetching,
      }),
    },
  );

  const empty = ids?.length != null && ids?.length === 0 && !loading;
  if (empty) {
    return (
      <div className="flex h-full">
        <Empty />
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
