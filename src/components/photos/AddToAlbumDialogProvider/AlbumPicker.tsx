import React from 'react';

import usePaginatedAlbumsQuery from 'components/photos/hooks/list-albums';

import AlbumListView from '../AlbumListView';

interface Props {
  className?: string;
  onItemClick: (albumSlug: string) => void;
}

export default function AlbumPicker({ className, onItemClick }: Props) {
  const [{ ids, selectById }, loading] = usePaginatedAlbumsQuery({ pageSize: 100 });

  return (
    <AlbumListView
      className={className}
      loading={loading}
      ids={ids!}
      selectById={selectById}
      onItemClick={onItemClick}
    />
  );
}
