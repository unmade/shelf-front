import React from 'react';

import { FixedSizeGrid, GridChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import Spinner from './Spinner';

export type ItemRendererProps<T> = GridChildComponentProps<T>;

interface Props<T> {
  className?: string;
  columnCount: number;
  innerRef?: React.Ref<FixedSizeGrid>;
  itemData: T;
  loading?: boolean;
  rowCount: number;
  rowHeightOffset: number;
  itemRenderer: React.FC<ItemRendererProps<T>>;
}

export default function VGrid<T>({
  className,
  columnCount,
  innerRef,
  itemData,
  loading = false,
  rowCount,
  rowHeightOffset = 0,
  itemRenderer: View,
}: Props<T>) {
  if (loading) {
    return <Spinner className="h-full w-full" />;
  }

  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeGrid
          ref={innerRef}
          className={className}
          columnCount={columnCount}
          columnWidth={width / columnCount}
          height={height}
          itemData={itemData}
          rowCount={rowCount}
          rowHeight={width / columnCount + rowHeightOffset}
          width={width}
        >
          {View}
        </FixedSizeGrid>
      )}
    </AutoSizer>
  );
}
