import React from 'react';

import { shallowEqual } from 'react-redux';

import { IAlbum } from 'types/photos';

import { useAppSelector } from 'hooks';

import * as icons from 'icons';

import { ItemRendererProps } from 'components/ui/VGrid';

import { useSelection } from 'components/SelectionProvider';

import { ItemDataProps } from '../AlbumGridView';

interface GridItemProps {
  album: IAlbum;
  width: number;
}

function GridItem({ album, width }: GridItemProps) {
  const { select, toggleSelection, isSelected } = useSelection();
  const selected = isSelected(album.id);

  const onSelect = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();

    if (event.metaKey) {
      toggleSelection(album.id);
    } else {
      select(album.id);
    }
  };

  return (
    <div className="group flex h-full flex-col items-center justify-center">
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <span
        className={`relative ${
          selected
            ? 'm-2 rounded-lg ring-2 ring-blue-600 ring-offset-2 ring-offset-white dark:ring-indigo-500 dark:ring-offset-4 dark:ring-offset-zinc-800'
            : ''
        }`}
        onClick={onSelect}
      >
        <div
          className="flex h-full w-full items-center justify-center rounded-xl bg-gray-100 dark:bg-zinc-700"
          style={{ width: width - (selected ? 40 : 24), height: width - (selected ? 40 : 24) }}
        >
          <icons.PhotographOutlined className="h-12 w-12 dark:text-zinc-400" />
        </div>
      </span>
      <div className="pt-1 text-center">
        <p>{album.title}</p>
        <p className="text-xs text-gray-500 dark:text-zinc-400">{0}</p>
      </div>
    </div>
  );
}

function GridItemContainer({
  data,
  rowIndex,
  columnIndex,
  style,
}: ItemRendererProps<ItemDataProps>) {
  const width = typeof style.width === 'number' ? style.width - 20 : style.width;
  const itemStyle = { ...style, width, height: style.width };

  const { columnCount, ids, selectById } = data;
  const idx = rowIndex * columnCount + columnIndex;

  const album = useAppSelector<IAlbum | undefined>(
    (state) => selectById(state, ids[idx]),
    shallowEqual,
  );

  if (album == null) {
    return null;
  }

  return (
    <div style={itemStyle} className="pl-[20px]">
      <GridItem album={album} width={width as number} />
    </div>
  );
}

export default React.memo(GridItemContainer);
