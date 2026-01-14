import { useCallback, useRef } from 'react';

import AutoSizer from 'react-virtualized-auto-sizer';
import {
  FixedSizeList,
  type ListChildComponentProps,
  type ListOnItemsRenderedProps,
} from 'react-window';

export type ItemRendererProps<T> = ListChildComponentProps<T>;

interface Props<T> {
  className?: string;
  heightOffset?: number;
  initialScrollOffset?: number;
  itemCount: number;
  itemData: T;
  itemHeight?: number;
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
  scrollKey,
  itemRenderer: View,
  onScrollOffsetChange,
}: Props<T>) {
  const shouldTrackScrolling = scrollKey && onScrollOffsetChange != null;

  const timeout = useRef<number | undefined>(undefined);
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
        <FixedSizeList
          initialScrollOffset={itemHeight * initialScrollOffset}
          height={height - heightOffset}
          itemCount={itemCount}
          itemData={itemData}
          itemSize={itemHeight}
          width={width}
          className={className}
          onItemsRendered={shouldTrackScrolling ? handleItemsRendered : undefined}
        >
          {View}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
}
