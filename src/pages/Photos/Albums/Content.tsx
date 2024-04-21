import React from 'react';

import Spinner from 'components/ui/Spinner';

import AlbumGridView from 'components/photos/AlbumGridView';
import usePaginatedAlbumsQuery from 'components/photos/hooks/list-albums';

import Empty from './Empty';

export default function Content() {
  const [{ ids, loadMore, selectById }, loading] = usePaginatedAlbumsQuery({ pageSize: 100 });

  const empty = ids?.length != null && ids?.length === 0 && !loading;
  if (empty) {
    return (
      <div className="flex h-full">
        <Empty />
      </div>
    );
  }

  if (!ids?.length) {
    return (
      <div className="flex h-full justify-center">
        <Spinner />
      </div>
    );
  }
  return <AlbumGridView ids={ids} loadMore={loadMore} selectById={selectById} />;
}
