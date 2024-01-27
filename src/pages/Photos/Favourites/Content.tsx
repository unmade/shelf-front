import React, { useCallback, useMemo, useState } from 'react';

import { FixedSizeGrid } from 'react-window';

import useGridLayout from 'hooks/grid-layout';

import { selectMediaItemById, useListMediaItemsQuery } from 'store/photos';

import Spinner from 'components/ui/Spinner';
import VGrid from 'components/ui/VGrid';

import SelectionProvider from 'components/SelectionProvider';

import Gallery from 'components/photos/Gallery';
import MediaItemGridItem from 'components/photos/MediaItemGridItem';
import MediaItemsProvider from 'components/photos/MediaItemsProvider';
import { RootState } from 'store/store';

import Empty from './Empty';

function selectById(state: RootState, id: string) {
  return selectMediaItemById(state, { id, filters: { favourites: true } });
}

interface State {
  initialFileId: string | null;
  scrollIndex: number | null;
}

const initialState = { initialFileId: null, scrollIndex: null };

export default function Content() {
  const [{ scrollIndex, initialFileId }, setState] = useState<State>(initialState);

  const { ids, isFetching: loading } = useListMediaItemsQuery(
    { favourites: true },
    {
      selectFromResult: ({ data, isFetching }) => ({
        ids: data?.ids as string[] | undefined,
        isFetching,
      }),
    },
  );

  const { columnCount, rowCount } = useGridLayout(ids);

  const data = useMemo(
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
      }
    },
    [scrollIndex],
  );

  const onItemClick = useCallback(
    (fileId: string) => {
      setState({ scrollIndex, initialFileId: fileId });
    },
    [initialFileId, scrollIndex, setState],
  );

  const empty = ids?.length != null && ids?.length === 0 && !loading;
  if (empty) {
    return (
      <div className="flex h-full">
        <Empty />
      </div>
    );
  }

  if (!ids) {
    return (
      <div className="flex h-full justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <SelectionProvider>
      <MediaItemsProvider
        ids={ids}
        loading={loading}
        selectById={selectById}
        onItemClick={onItemClick}
      >
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
            columnCount={columnCount}
            rowCount={rowCount}
            rowHeightOffset={24}
            loading={loading}
          />
        </div>
      </MediaItemsProvider>
    </SelectionProvider>
  );
}
