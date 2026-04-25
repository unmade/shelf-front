import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { EntityState } from '@reduxjs/toolkit';

import type { IAlbum } from '@/types/photos';

import { type ItemRendererProps, VGrid } from '@/ui/vgrid';

import { useAlbumsBrowserData } from '../contexts/data';

import { GridViewItem } from './item';

const ROW_HEIGHT_OFFSET = 56;

interface ItemData {
  ids: string[];
  entities: Record<string, IAlbum>;
  columnCount: number;
}

function getColumnCount(width: number): number {
  if (width >= 1280) {
    return 5;
  } else if (width >= 768) {
    return 4;
  } else if (width >= 640) {
    return 3;
  }

  return 2;
}

function useContainerColumns(ref: React.RefObject<HTMLDivElement | null>): number {
  const [columnCount, setColumnCount] = useState(3);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      setColumnCount(getColumnCount(entry.contentRect.width));
    });

    observer.observe(element);
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

  const albumId = data.ids[itemIndex];
  const album = data.entities[albumId];

  if (!album) {
    return null;
  }

  return (
    <div style={style}>
      <GridViewItem album={album} />
    </div>
  );
});

GridViewCellRenderer.displayName = 'GridViewCellRenderer';

interface GridViewProps {
  data: EntityState<IAlbum, string>;
}

export function GridView({ data }: GridViewProps) {
  const { t } = useTranslation('photos');
  const { loadMore } = useAlbumsBrowserData();

  const containerRef = useRef<HTMLDivElement>(null);
  const columnCount = useContainerColumns(containerRef);

  const ids = data.ids as string[];
  const rowCount = Math.ceil(ids.length / columnCount);

  const itemData = useMemo<ItemData>(
    () => ({
      ids,
      entities: data.entities as Record<string, IAlbum>,
      columnCount,
    }),
    [ids, data.entities, columnCount],
  );

  return (
    <div
      ref={containerRef}
      className="min-w-0 flex-1 px-4"
      role="grid"
      aria-label={t('browser.albums.grid.ariaLabel', { defaultValue: 'Albums grid' })}
    >
      <VGrid
        columnCount={columnCount}
        rowCount={rowCount}
        rowHeightOffset={ROW_HEIGHT_OFFSET}
        itemData={itemData}
        itemRenderer={GridViewCellRenderer}
        overscanRowCount={2}
        loadMore={loadMore}
      />
    </div>
  );
}
