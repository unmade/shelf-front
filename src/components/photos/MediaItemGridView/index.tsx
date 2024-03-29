import React, { useCallback, useMemo, useState } from 'react';

import { FixedSizeGrid } from 'react-window';

import useGridLayout from 'hooks/grid-layout';

import { RootState } from 'store/store';
import { IMediaItem } from 'types/photos';

import Spinner from 'components/ui/Spinner';
import VGrid from 'components/ui/VGrid';

import SelectionProvider from 'components/SelectionProvider';

import Gallery from 'components/photos/Gallery';
import MediaItemGridItem from 'components/photos/MediaItemGridItem';
import MediaItemsProvider from 'components/photos/MediaItemsProvider';

export interface ItemDataProps {
  ids: string[];
  columnCount: number;
}

interface Props {
  ids: string[];
  loadMore?: () => void;
  selectById: (state: RootState, id: string) => IMediaItem | undefined;
}

interface State {
  initialFileId: string | null;
  scrollIndex: number | null;
}

const initialState = { initialFileId: null, scrollIndex: null };

export default function MediaItemGridView({ ids, loadMore, selectById }: Props) {
  const [{ scrollIndex, initialFileId }, setState] = useState<State>(initialState);

  const { columnCount, rowCount } = useGridLayout(ids);

  const data: ItemDataProps = useMemo(
    () => ({
      ids: ids ?? [],
      columnCount,
    }),
    [ids, columnCount],
  );

  const onClose = useCallback(
    (currentIndex: number) => {
      const idx = Math.floor(currentIndex / columnCount);
      setState({ scrollIndex: idx, initialFileId: null });
    },
    [setState, columnCount],
  );

  const scrollToItem = useCallback(
    (el: FixedSizeGrid) => {
      if (scrollIndex != null) {
        el?.scrollToItem({
          align: 'center',
          rowIndex: scrollIndex,
        });
        setState((state) => ({ ...state, scrollIndex: null }));
      }
    },
    [scrollIndex, setState],
  );

  const onItemClick = useCallback(
    (fileId: string) => {
      setState((state) => ({ ...state, initialFileId: fileId }));
    },
    [setState],
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
      <MediaItemsProvider ids={ids} selectById={selectById} onItemClick={onItemClick}>
        {initialFileId != null && (
          <Gallery
            ids={ids}
            initialFileId={initialFileId}
            selectById={selectById}
            onClose={onClose}
          />
        )}
        <div className="h-full">
          <VGrid
            innerRef={scrollToItem}
            itemRenderer={MediaItemGridItem}
            itemData={data}
            overscanRowCount={3}
            columnCount={columnCount}
            rowCount={rowCount}
            rowHeightOffset={24}
            loadMore={loadMore}
          />
        </div>
      </MediaItemsProvider>
    </SelectionProvider>
  );
}
