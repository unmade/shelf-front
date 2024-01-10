import React from 'react';

import { useSelector } from 'react-redux';

import * as icons from '../../../icons';

import { useSelection } from './SelectionProvider';
import Thumbnail from '../../../components/Thumbnail';

function GridItem({ data, rowIndex, columnIndex, style }) {
  const itemStyle = { ...style, width: style.width - 20, height: style.width };

  const { columnCount, ids, onDoubleClick, selectById } = data;
  const idx = rowIndex * columnCount + columnIndex;

  const { select, toggleSelection, isSelected } = useSelection();
  const item = useSelector((state) => selectById(state, ids[idx]));
  if (item == null) {
    return null;
  }

  const selected = isSelected(item.id);

  return (
    <div style={itemStyle} className="pl-[20px]">
      <div className="group h-full flex items-center justify-center">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <span
          className={`relative ${
            selected
              ? 'm-2 ring-2 rounded-lg ring-offset-4 ring-offset-zinc-800 ring-indigo-500'
              : ''
          }`}
          onClick={({ metaKey }) => (metaKey ? toggleSelection(item.id) : select(item.id))}
          onDoubleClick={() => onDoubleClick(idx)}
        >
          <Thumbnail
            className="rounded-lg"
            style={{ maxHeight: style.width - (selected ? 12 : 0) }}
            file={item}
            size="lg"
          />
          <div className="hidden group-hover:block absolute top-1 right-2">
            <button
              type="button"
              variant="text"
              className="p-0.5 dark:bg-zinc-200 rounded-full dark:text-zinc-600"
            >
              <icons.More className="shrink-0 w-3 h-3" />
            </button>
          </div>
        </span>
      </div>
    </div>
  );
}

export default GridItem;
