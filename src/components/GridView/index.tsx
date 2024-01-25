import React from 'react';

import VGrid, { ItemRendererProps } from 'components/ui/VGrid';

import { Breakpoint, useBreakpoint } from 'hooks/media-query';

function useGridLayout() {
  const breakpoint = useBreakpoint();
  if (breakpoint === Breakpoint.base) {
    return { columnCount: 3 };
  }
  return { columnCount: 5 };
}

export interface ItemDataProps {
  ids: string[];
  columnCount: number;
}

interface GridViewProps {
  ids: string[];
  loading: boolean;
  itemRenderer: React.FC<ItemRendererProps<ItemDataProps>>;
}

function GridView({ ids, loading, itemRenderer }: GridViewProps) {
  const { columnCount } = useGridLayout();

  const data = {
    ids,
    columnCount,
  };

  return (
    <VGrid
      itemRenderer={itemRenderer}
      itemData={data}
      columnCount={columnCount}
      rowCount={Math.ceil((ids?.length ?? 0) / columnCount)}
      rowHeightOffset={24}
      loading={loading}
    />
  );
}

export default GridView;
