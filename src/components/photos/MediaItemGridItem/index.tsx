import React from 'react';

import { shallowEqual } from 'react-redux';

import { IMediaItem } from 'types/photos';

import { useAppSelector } from 'hooks';
import { useTouchDevice } from 'hooks/media-query';

import { ItemRendererProps } from 'components/ui/VGrid';

import { useSelection } from 'components/SelectionProvider';
import Thumbnail, { ThumbnailSize } from 'components/Thumbnail';

import useFileFromMediaItem from '../hooks/file-from-media-item';

import { ItemDataProps } from '../MediaItemGridView';
import { useMediaItemsData } from '../MediaItemsProvider';

import FavouriteButton from './FavouriteButton';

interface GridItemProps {
  mediaItem: IMediaItem;
  touch: boolean;
  width: number;
  onClick: (id: string) => void;
  menuItemRenderer: React.ComponentType<{ mediaItem: IMediaItem; onOpen: () => void }>;
}

function GridItem({ mediaItem, touch, width, onClick, menuItemRenderer: Menu }: GridItemProps) {
  const file = useFileFromMediaItem(mediaItem);

  const { select, toggleSelection, isSelected } = useSelection();
  const selected = isSelected(mediaItem.id);

  const onSelect = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();

    if (touch) {
      onClick(mediaItem.id);
    } else if (event.metaKey) {
      toggleSelection(mediaItem.id);
    } else {
      select(mediaItem.id);
    }
  };

  const onOpen = () => {
    if (!touch) {
      onClick(mediaItem.id);
    }
  };

  const handleMenuOpen = () => {
    if (!selected) {
      select(mediaItem.id);
    }
  };

  return (
    <div className="group flex h-full items-center justify-center">
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <span
        className={`relative ${
          selected
            ? 'm-2 rounded-lg ring-2 ring-blue-600 ring-offset-2 ring-offset-white dark:ring-indigo-500 dark:ring-offset-4 dark:ring-offset-zinc-800'
            : ''
        }`}
        onClick={onSelect}
        onDoubleClick={onOpen}
      >
        <Thumbnail
          className="rounded-lg"
          style={{ maxHeight: width - (selected ? 12 : 0) }}
          file={file}
          size={ThumbnailSize.lg}
        />
        <div
          className={`${!touch && selected ? '' : 'hidden'} ${
            !touch ? 'group-hover:block' : ''
          } absolute right-2 top-1`}
        >
          <Menu mediaItem={mediaItem} onOpen={handleMenuOpen} />
        </div>
        {!mediaItem.deletedAt && (
          <div className="absolute bottom-1 left-2">
            <FavouriteButton mediaItem={mediaItem} touch={touch} />
          </div>
        )}
      </span>
    </div>
  );
}

function GridItemContainer({
  data,
  rowIndex,
  columnIndex,
  style,
}: ItemRendererProps<ItemDataProps>) {
  const touch = useTouchDevice();

  const { selectById, onItemClick } = useMediaItemsData();

  const width = typeof style.width === 'number' ? style.width - 20 : style.width;
  const itemStyle = { ...style, width, height: style.width };

  const { columnCount, ids, menuItemRenderer: Menu } = data;
  const idx = rowIndex * columnCount + columnIndex;

  const mediaItem = useAppSelector<IMediaItem | undefined>(
    (state) => selectById(state, ids[idx]),
    shallowEqual,
  );

  if (mediaItem == null) {
    return null;
  }

  return (
    <div style={itemStyle} className="pl-[20px]">
      <GridItem
        mediaItem={mediaItem}
        width={width as number}
        touch={touch}
        onClick={onItemClick}
        menuItemRenderer={Menu}
      />
    </div>
  );
}

export default React.memo(GridItemContainer);
