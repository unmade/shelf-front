import React from 'react';

import * as icons from 'icons';

import { useListMediaItemSharedLinksQuery } from 'store/photos';

import Empty from 'components/ui/Empty';
import Spinner from 'components/ui/Spinner';

import SharedLinkList from './SharedLinkList';

export default function Content() {
  const { ids, isFetching: loading } = useListMediaItemSharedLinksQuery(undefined, {
    selectFromResult: ({ data, isFetching }) => ({
      ids: data?.ids as string[] | undefined,
      isFetching,
    }),
  });

  const empty = ids?.length === 0 && !loading;
  if (empty) {
    return (
      <Empty
        icon={<icons.LinkOutlined className="h-12 w-12 text-gray-400 dark:text-zinc-500" />}
        title="Files shared via link will appear here"
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
