import React from 'react';

import { useSelector } from 'react-redux';

import { useTouchDevice } from '../../../../hooks/media-query';
import useFileFromMediaItem from '../../hooks/file-from-media-item';

import { selectMediaItemById } from '../../../../store/photos';

import Thumbnail from '../../../../components/Thumbnail';

import { useSelection } from '../SelectionProvider';

import FavouriteButton from './FavouriteButton';
import GridItemMenu from './GridItemMenu';

function GridItem({ data, rowIndex, columnIndex, style }) {
  const touch = useTouchDevice();

  const itemStyle = { ...style, width: style.width - 20, height: style.width };

  const { columnCount, ids, onClick } = data;
  const idx = rowIndex * columnCount + columnIndex;

  const { select, isSelected } = useSelection();
  const mediaItem = useSelector((state) => selectMediaItemById(state, ids[idx]));
  const file = useFileFromMediaItem(mediaItem);
  if (mediaItem == null) {
    return null;
  }

  const selected = isSelected(mediaItem.id);

  const onSelect = () => {
    if (touch) {
      onClick(idx);
    } else {
      select(mediaItem.id);
    }
  };
  const onOpen = () => {
    if (!touch) onClick(idx);
  };

  return (
    <div style={itemStyle} className="pl-[20px]">
      <div className="group flex h-full items-center justify-center">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <span
          className={`relative ${
            selected
              ? 'm-2 rounded-lg ring-2 ring-indigo-500 ring-offset-4 ring-offset-zinc-800'
              : ''
          }`}
          onClick={onSelect}
          onDoubleClick={onOpen}
        >
          <Thumbnail
            className="rounded-lg"
            style={{ maxHeight: style.width - (selected ? 12 : 0) }}
            file={file}
            size="lg"
          />
          <div
            className={`${!touch && selected ? '' : 'hidden'} ${
              !touch ? 'group-hover:block' : ''
            } absolute right-2 top-1`}
          >
            <GridItemMenu mediaItem={mediaItem} onOpen={() => select(mediaItem.id)} />
          </div>
          <div className="absolute bottom-1 left-2">
            <FavouriteButton mediaItem={mediaItem} touch={touch} />
          </div>
        </span>
      </div>
    </div>
  );
}

export default GridItem;
