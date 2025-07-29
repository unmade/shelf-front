import type React from 'react';

import AutoSizer from 'react-virtualized-auto-sizer';
import type { GridChildComponentProps } from 'react-window';
import { FixedSizeGrid } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import Spinner from './Spinner';

export type ItemRendererProps<T> = GridChildComponentProps<T>;

interface Props<T> {
  className?: string;
  columnCount: number;
  innerRef?: React.Ref<FixedSizeGrid>;
  itemData: T;
  loading?: boolean;
  overscanRowCount?: number;
  rowCount: number;
  rowHeightOffset: number;
  itemRenderer: React.FC<ItemRendererProps<T>>;
  loadMore?: () => void;
}

export default function VGrid<T>({
  className,
  columnCount,
  innerRef,
  itemData,
  loading = false,
  overscanRowCount,
  rowCount,
  rowHeightOffset = 0,
  itemRenderer: View,
  loadMore,
}: Props<T>) {
  if (loading) {
    return <Spinner className="h-full w-full" />;
  }

  return (
    <AutoSizer>
      {({ height, width }) => (
        <InfiniteLoader
          threshold={overscanRowCount}
          isItemLoaded={(index) => index < rowCount - 1}
          itemCount={rowCount}
          loadMoreItems={() => {
            if (loadMore) {
              loadMore();
            }
          }}
        >
          {({ onItemsRendered, ref }) => (
            <FixedSizeGrid
              ref={(el: FixedSizeGrid) => {
                ref(el);
                if (innerRef) {
                  if (typeof innerRef === 'function') {
                    innerRef(el);
                  }
                }
              }}
              className={className}
              columnCount={columnCount}
              columnWidth={width / columnCount}
              height={height}
              itemData={itemData}
              rowCount={rowCount}
              rowHeight={width / columnCount + rowHeightOffset}
              overscanRowCount={overscanRowCount}
              width={width}
              onItemsRendered={({
                visibleRowStartIndex,
                visibleRowStopIndex,
                overscanRowStopIndex,
                overscanRowStartIndex,
              }) => {
                onItemsRendered({
                  overscanStartIndex: overscanRowStartIndex,
                  overscanStopIndex: overscanRowStopIndex,
                  visibleStartIndex: visibleRowStartIndex,
                  visibleStopIndex: visibleRowStopIndex,
                });
              }}
            >
              {View}
            </FixedSizeGrid>
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  );
}
