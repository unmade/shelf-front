import { useCallback, useRef } from 'react';

import AutoSizer from 'react-virtualized-auto-sizer';
import {
  FixedSizeList,
  type ListChildComponentProps,
  type ListOnItemsRenderedProps,
} from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

export type ItemRendererProps<T> = ListChildComponentProps<T>;

interface Props<T> {
  className?: string;
  heightOffset?: number;
  initialScrollOffset?: number;
  itemCount: number;
  itemData: T;
  itemHeight?: number;
  loadMore?: () => void;
  scrollKey?: string;
  itemRenderer: React.FC<ItemRendererProps<T>>;
  onScrollOffsetChange?: (args: { key: string; offset: number }) => void;
}

export function VList<T>({
  className,
  heightOffset = 0,
  initialScrollOffset = 0,
  itemCount,
  itemData,
  itemHeight = 64,
  loadMore,
  scrollKey,
  itemRenderer: View,
  onScrollOffsetChange,
}: Props<T>) {
  const shouldTrackScrolling = scrollKey && onScrollOffsetChange != null;

  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const handleItemsRendered = useCallback(
    ({ visibleStartIndex }: ListOnItemsRenderedProps) => {
      clearTimeout(timeout?.current);
      timeout.current = setTimeout(() => {
        if (scrollKey && visibleStartIndex !== initialScrollOffset) {
          onScrollOffsetChange?.({ key: scrollKey, offset: visibleStartIndex });
        }
      }, 200);
    },
    [initialScrollOffset, onScrollOffsetChange, timeout, scrollKey],
  );

  return (
    <AutoSizer>
      {({ height, width }) => (
        <InfiniteLoader
          isItemLoaded={loadMore == null ? () => true : (index) => index < itemCount - 1}
          itemCount={itemCount}
          loadMoreItems={() => {
            loadMore?.();
          }}
        >
          {({ onItemsRendered, ref }) => (
            <FixedSizeList
              ref={ref}
              initialScrollOffset={itemHeight * initialScrollOffset}
              height={height - heightOffset}
              itemCount={itemCount}
              itemData={itemData}
              itemSize={itemHeight}
              width={width}
              className={className}
              onItemsRendered={(props) => {
                onItemsRendered(props);
                if (shouldTrackScrolling) {
                  handleItemsRendered(props);
                }
              }}
            >
              {View}
            </FixedSizeList>
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  );
}
