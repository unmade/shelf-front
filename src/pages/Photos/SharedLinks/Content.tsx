import React from 'react';

import { useListMediaItemSharedLinksQuery } from 'store/photos';

import Spinner from 'components/ui/Spinner';

import Empty from 'components/photos/Empty';

import SharedLinkList from './SharedLinkList';

export default function Content() {
  const { ids, isFetching: loading } = useListMediaItemSharedLinksQuery(undefined, {
    selectFromResult: ({ data, isFetching }) => ({
      ids: data?.ids,
      isFetching,
    }),
  });

  const empty = ids?.length === 0 && !loading;
  if (empty) {
    return (
      <Empty
        title="No shared photos yet!"
        description="All the photos you've shared will appear on that page"
      />
    );
  }

  if (!ids) {
    return (
      <div className="flex h-full justify-center">
        <Spinner />
      </div>
    );
  }

  return <SharedLinkList ids={ids} />;
}
