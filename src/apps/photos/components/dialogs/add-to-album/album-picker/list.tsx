import { useMemo } from 'react';

import type { IAlbum } from '@/types/photos';

import type { RootState } from '@/store/store';

import { Spinner } from '@/ui/spinner';
import { VList } from '@/ui/vlist';

import AlbumPickerItem from './item';

export interface ItemData {
  ids: string[];
  onItemClick?: (id: string) => void;
  selectById: (state: RootState, id: string) => IAlbum | undefined;
}

interface Props {
  ids: string[];
  loading: boolean;
  onItemClick?: (id: string) => void;
  selectById: (state: RootState, id: string) => IAlbum | undefined;
}

export function AlbumPickerList({ ids, loading = false, onItemClick, selectById }: Props) {
  const itemData: ItemData = useMemo(
    () => ({
      ids,
      onItemClick,
      selectById,
    }),
    [ids, onItemClick, selectById],
  );

  if (loading) {
    return <Spinner className="flex-1" />;
  }

  return (
    <VList
      itemData={itemData}
      itemCount={ids.length}
      itemRenderer={AlbumPickerItem}
      itemHeight={84}
    />
  );
}
