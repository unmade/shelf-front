import { useMemo } from 'react';

import type { IAlbum } from 'types/photos';

import type { RootState } from 'store/store';

import VList from 'components/ui-legacy/VList';

import AlbumListItem from 'components/photos/AlbumListItem';

export interface ItemDataProps {
  ids: string[];
  onItemClick?: (id: string) => void;
  selectById: (state: RootState, id: string) => IAlbum | undefined;
}

interface Props {
  className?: string;
  ids: string[];
  loading: boolean;
  onItemClick?: (id: string) => void;
  selectById: (state: RootState, id: string) => IAlbum | undefined;
}

export default function AlbumListView({
  className,
  ids,
  loading = false,
  onItemClick,
  selectById,
}: Props) {
  const data: ItemDataProps = useMemo(
    () => ({
      ids: ids ?? [],
      onItemClick,
      selectById,
    }),
    [ids, onItemClick, selectById],
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
