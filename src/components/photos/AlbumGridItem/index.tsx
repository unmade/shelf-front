import React from 'react';

import { shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router';

import type { IAlbum } from 'types/photos';

import { useAppSelector } from 'hooks';
import { useTouchDevice } from 'hooks/media-query';

import * as icons from 'icons';

import type { ItemRendererProps } from 'components/ui/VGrid';

import { useSelection } from 'components/SelectionProvider';
import Thumbnail, { ThumbnailSize } from 'components/Thumbnail';

import type { ItemDataProps } from '../AlbumGridView';
import AlbumMenu from '../AlbumMenu';

interface GridItemProps {
  album: IAlbum;
  width: number;
}

function GridItem({ album, width }: GridItemProps) {
  const navigate = useNavigate();

  const touch = useTouchDevice();

  const { select, toggleSelection, isSelected } = useSelection();
  const selected = isSelected(album.id);

  const onSelect = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();

    if (touch) {
      navigate(album.slug);
    }

    if (event.metaKey) {
      toggleSelection(album.id);
    } else {
      select(album.id);
    }
  };

  const openAlbum = () => {
    if (!touch) {
      navigate(album.slug);
    }
  };

  const handleMenuOpen = () => {
    if (!selected) {
      select(album.id);
    }
  };

  const style = { width: width - (selected ? 40 : 24), height: width - (selected ? 40 : 24) };

  return (
    /* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
    <div
      className="group flex h-full cursor-default flex-col items-center justify-center"
      onClick={onSelect}
      onDoubleClick={openAlbum}
    >
      <span
        className={`relative ${
          selected
            ? 'm-2 rounded-lg ring-2 ring-blue-600 ring-offset-2 ring-offset-white dark:ring-indigo-500 dark:ring-offset-4 dark:ring-offset-zinc-800'
            : ''
        }`}
      >
        {(album.cover?.thumbnailUrl && (
          <Thumbnail
            className="h-56 w-56 rounded-lg"
            style={style}
            file={{
              id: album.cover?.fileId,
              thumbnail_url: album.cover?.thumbnailUrl,
              modified_at: album.createdAt,
            }}
            size={ThumbnailSize.lg}
            objectFit="cover"
          />
        )) ?? (
          <div
            className="flex items-center justify-center rounded-xl bg-gray-100 dark:bg-zinc-700"
            style={style}
          >
            <icons.PhotographOutlined className="h-12 w-12 text-gray-500 dark:text-zinc-400" />
          </div>
        )}
        <div className={`${selected ? '' : 'hidden'} absolute top-1.5 right-2 group-hover:block`}>
          <AlbumMenu album={album} onOpen={handleMenuOpen} />
        </div>
      </span>
      <div className="pt-1 text-center">
        <p>{album.title}</p>
        <p className="text-xs text-gray-500 dark:text-zinc-400">{album.itemsCount}</p>
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
