import React, { useMemo } from 'react';

import { IAlbum } from 'types/photos';

import { RootState } from 'store/store';

import VList from 'components/ui/VList';

import AlbumListItem from 'components/photos/AlbumListItem';

export interface ItemDataProps {
  ids: string[];
  selectById: (state: RootState, id: string) => IAlbum | undefined;
}

interface Props {
  className?: string;
  ids: string[];
  loading: boolean;
  selectById: (state: RootState, id: string) => IAlbum | undefined;
}

export default function AlbumListView({ className, ids, loading = false, selectById }: Props) {
  const data: ItemDataProps = useMemo(
    () => ({
      ids: ids ?? [],
      selectById,
    }),
    [ids],
  );

  return (
    <div className={className}>
      <VList
        itemData={data}
        itemCount={ids?.length ?? 0}
        itemRender={AlbumListItem}
        itemHeight={84}
        loading={loading}
      />
    </div>
  );
}
