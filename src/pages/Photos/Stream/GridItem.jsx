import React from 'react';

import { useSelector } from 'react-redux';

import { useFavouriteAction } from '../../../hooks/file-actions';
import { useTouchDevice } from '../../../hooks/media-query';

import Thumbnail from '../../../components/Thumbnail';

import GridItemMenu from './GridItemMenu';
import { useSelection } from './SelectionProvider';

function FavouriteButton({ file, touch }) {
  const { key, title, Icon, onClick } = useFavouriteAction([file]);
  const favourite = key === 'unfavourite';

  if (touch) {
    if (favourite) {
      return (
        <div>
          <Icon className="shrink-0 w-4 h-4 drop-shadow-md" />
        </div>
      );
    }
    return null;
  }

  return (
    <button
      title={title}
      type="button"
      className={`p-0.5 rounded-full text-gray-50 dark:text-zinc-100 drop-shadow-md ${
        favourite ? 'block' : 'hidden group-hover:block'
      }`}
      onClick={onClick}
    >
      <Icon className="shrink-0 w-4 h-4 drop-shadow-md" />
    </button>
  );
}

function GridItem({ data, rowIndex, columnIndex, style }) {
  const touch = useTouchDevice();

  const itemStyle = { ...style, width: style.width - 20, height: style.width };

  const { columnCount, ids, onClick, selectById } = data;
  const idx = rowIndex * columnCount + columnIndex;

  const { select, isSelected } = useSelection();
  const item = useSelector((state) => selectById(state, ids[idx]));
  if (item == null) {
    return null;
  }

  const selected = isSelected(item.id);

  const onSelect = () => {
    if (touch) {
      onClick(idx);
    } else {
      select(item.id);
    }
  };
  const onOpen = () => {
    if (!touch) onClick(idx);
  };

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
          onClick={onSelect}
          onDoubleClick={onOpen}
        >
          <Thumbnail
            className="rounded-lg"
            style={{ maxHeight: style.width - (selected ? 12 : 0) }}
            file={item}
            size="lg"
          />
          <div
            className={`${!touch && selected ? '' : 'hidden'} ${
              !touch ? 'group-hover:block' : ''
            } absolute top-1 right-2`}
          >
            <GridItemMenu item={item} onOpen={() => select(item.id)} />
          </div>
          <div className="absolute bottom-1 left-2">
            <FavouriteButton file={item} touch={touch} />
          </div>
        </span>
      </div>
    </div>
  );
}

export default GridItem;
