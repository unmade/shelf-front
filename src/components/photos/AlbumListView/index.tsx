import { useMemo } from 'react';

import type { IAlbum } from 'types/photos';

import type { RootState } from 'store/store';

import { Spinner } from '@/ui/spinner';
import { VList } from '@/ui/vlist';

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

  if (loading) {
    return <Spinner className="flex-1" />;
  }

  return (
    <div className={className}>
      <VList
        itemData={data}
        itemCount={ids?.length ?? 0}
        itemRenderer={AlbumListItem}
        itemHeight={84}
      />
    </div>
  );
}
