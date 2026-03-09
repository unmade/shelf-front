import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { EntityState } from '@reduxjs/toolkit';

import type { FileSchema } from '@/store/files';

import { type ItemRendererProps, VGrid } from '@/ui/vgrid';

import { GridViewItem } from './item';

const ROW_HEIGHT_OFFSET = 0;

interface ItemData {
  ids: string[];
  entities: Record<string, FileSchema>;
  columnCount: number;
}

function getColumnCount(width: number): number {
  if (width >= 1280) {
    return 5;
  } else if (width >= 768) {
    return 4;
  } else if (width >= 640) {
    return 3;
  } else {
    return 2;
  }
}

function useContainerColumns(ref: React.RefObject<HTMLDivElement | null>): number {
  const [columnCount, setColumnCount] = useState(3);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      setColumnCount(getColumnCount(entry.contentRect.width));
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return columnCount;
}

const GridViewCellRenderer = memo(function GridViewCellRenderer({
  columnIndex,
  rowIndex,
  data,
  style,
}: ItemRendererProps<ItemData>) {
  const itemIndex = rowIndex * data.columnCount + columnIndex;

  if (itemIndex >= data.ids.length) {
    return null;
  }

  const fileId = data.ids[itemIndex];
  const file = data.entities[fileId];

  if (!file) {
    return null;
  }

  return (
    <div style={style}>
      <GridViewItem file={file} />
    </div>
  );
});

GridViewCellRenderer.displayName = 'GridViewCellRenderer';

interface GridViewProps {
  data: EntityState<FileSchema, string>;
}

export function GridView({ data }: GridViewProps) {
  const { t } = useTranslation('files');
  const containerRef = useRef<HTMLDivElement>(null);
  const columnCount = useContainerColumns(containerRef);

  const allIds = data.ids as string[];
  const rowCount = Math.ceil(allIds.length / columnCount);

  const itemData = useMemo<ItemData>(
    () => ({
      ids: allIds,
      entities: data.entities as Record<string, FileSchema>,
      columnCount,
    }),
    [allIds, data.entities, columnCount],
  );

  return (
    <div
      ref={containerRef}
      className="min-w-0 flex-1 px-4"
      role="grid"
      aria-label={t('browser.grid.ariaLabel', { defaultValue: 'Files grid' })}
    >
      <VGrid
        columnCount={columnCount}
        rowCount={rowCount}
        rowHeightOffset={ROW_HEIGHT_OFFSET}
        itemData={itemData}
        itemRenderer={GridViewCellRenderer}
        overscanRowCount={2}
      />
    </div>
  );
}
