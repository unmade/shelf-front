import React, { useMemo } from 'react';

import { IAlbum } from 'types/photos';

import useGridLayout from 'hooks/grid-layout';

import { RootState } from 'store/store';

import Spinner from 'components/ui/Spinner';
import VGrid from 'components/ui/VGrid';

import SelectionProvider from 'components/SelectionProvider';

import AlbumGridItem from 'components/photos/AlbumGridItem';

export interface ItemDataProps {
  ids: string[];
  columnCount: number;
  selectById: (state: RootState, id: string) => IAlbum | undefined;
}

interface Props {
  ids: string[];
  loadMore?: () => void;
  selectById: (state: RootState, id: string) => IAlbum | undefined;
}

export default function AlbumGridView({ ids, loadMore, selectById }: Props) {
  const { columnCount, rowCount } = useGridLayout(ids);

  const data: ItemDataProps = useMemo(
    () => ({
      ids: ids ?? [],
      columnCount,
      selectById,
    }),
    [ids, columnCount],
  );

  if (!ids) {
    return (
      <div className="flex h-full justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <SelectionProvider>
      <div className="h-full">
        <VGrid
          itemRenderer={AlbumGridItem}
          itemData={data}
          overscanRowCount={3}
          columnCount={columnCount}
          rowCount={rowCount}
          rowHeightOffset={24}
          loadMore={loadMore}
        />
      </div>
    </SelectionProvider>
  );
}
