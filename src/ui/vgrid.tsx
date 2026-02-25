import type React from 'react';

import AutoSizer from 'react-virtualized-auto-sizer';
import type { GridChildComponentProps } from 'react-window';
import { FixedSizeGrid } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

export type ItemRendererProps<T> = GridChildComponentProps<T>;

interface Props<T> {
  className?: string;
  columnCount: number;
  innerRef?: React.Ref<FixedSizeGrid>;
  itemData: T;
  overscanRowCount?: number;
  rowCount: number;
  rowHeightOffset?: number;
  itemRenderer: React.FC<ItemRendererProps<T>>;
  loadMore?: () => void;
}

export function VGrid<T>({
  className,
  columnCount,
  innerRef,
  itemData,
  overscanRowCount,
  rowCount,
  rowHeightOffset = 0,
  itemRenderer: View,
  loadMore,
}: Props<T>) {
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
