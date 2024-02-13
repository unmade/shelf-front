import React from 'react';

import { selectMediaItemById, useListMediaItemsQuery } from 'store/photos';
import { RootState } from 'store/store';

import Spinner from 'components/ui/Spinner';

import Empty from 'components/photos/Empty';
import MediaItemGridView from 'components/photos/MediaItemGridView';

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
        <Empty
          title="No favorites yet!"
          description={
            <>
              <p className="hidden md:block">
                Start curating your special moments by marking photos as favorites.
              </p>
              <p>Tap the heart icon on any photo you want to appear here</p>
            </>
          }
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
