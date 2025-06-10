import React from 'react';

import { IAlbum } from 'types/photos';

import Spinner from 'components/ui/Spinner';

import MediaItemGridView from 'components/photos/MediaItemGridView';
import usePaginatedAlbumItemsQuery from 'components/photos/hooks/list-album-items';

import Empty from './Empty';

interface Props {
  album: IAlbum;
}

export default function Content({ album }: Props) {
  const [{ ids, loadMore, selectById }, loading] = usePaginatedAlbumItemsQuery({
    albumSlug: album.slug,
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

  return (
    <MediaItemGridView
      ids={ids}
      itemsCount={album.itemsCount}
      selectById={selectById}
      loadMore={loadMore}
    />
  );
}
