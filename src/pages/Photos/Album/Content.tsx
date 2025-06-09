import React from 'react';

import Spinner from 'components/ui/Spinner';

import MediaItemGridView from 'components/photos/MediaItemGridView';
import usePaginatedAlbumItemsQuery from 'components/photos/hooks/list-album-items';

import Empty from './Empty';

export default function Content({ albumSlug }: { albumSlug: string }) {
  const [{ ids, loadMore, selectById }, loading] = usePaginatedAlbumItemsQuery({
    albumSlug,
    pageSize: 100,
  });

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

  return <MediaItemGridView ids={ids} selectById={selectById} loadMore={loadMore} />;
}
