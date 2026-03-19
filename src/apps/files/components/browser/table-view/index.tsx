import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { EntityState } from '@reduxjs/toolkit';

import { type FileSchema } from '@/store/files';

import { type ItemRendererProps, VList } from '@/ui/vlist';

import { useSelection } from '@/components/SelectionProvider';

import { TableViewHeader } from './header';
import { TableViewRow } from './row';

const ROW_HEIGHT = 72;

interface ItemData {
  ids: string[];
  entities: Record<string, FileSchema>;
}

const TableViewRowRenderer = memo(function TableViewRowRenderer({
  index,
  data,
  style,
}: ItemRendererProps<ItemData>) {
  const fileId = data.ids[index];
  const file = data.entities[fileId];

  if (!file) {
    return null;
  }

  return (
    <div style={style}>
      <TableViewRow file={file} index={index} />
    </div>
  );
});

TableViewRowRenderer.displayName = 'TableViewRowRenderer';

interface TableViewProps {
  data: EntityState<FileSchema, string>;
  scrollKey?: string;
  onScrollOffsetChange?: (args: { key: string; offset: number }) => void;
  initialScrollOffset?: number;
}

export function TableView({
  data,
  scrollKey,
  onScrollOffsetChange,
  initialScrollOffset = 0,
}: TableViewProps) {
  const { select } = useSelection();
  const { t } = useTranslation('files');

  const allIds = data.ids as string[];
  const itemCount = allIds.length;

  const itemData = useMemo<ItemData>(() => data, [data]);

  const handleSelectAll = useCallback(() => {
    select(allIds);
  }, [select, allIds]);

  return (
    <div className="@container min-w-0 flex-1">
      <div
        className="flex h-full flex-col"
        role="table"
        aria-label={t('browser.table.ariaLabel', { defaultValue: 'Files' })}
      >
        <TableViewHeader totalCount={itemCount} onSelectAll={handleSelectAll} />
        <div className="flex-1">
          <VList
            itemCount={itemCount}
            itemData={itemData}
            itemHeight={ROW_HEIGHT}
            scrollKey={scrollKey}
            initialScrollOffset={initialScrollOffset}
            onScrollOffsetChange={onScrollOffsetChange}
            itemRenderer={TableViewRowRenderer}
          />
        </div>
      </div>
    </div>
  );
}
