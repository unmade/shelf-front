import React from 'react';

import type { ListChildComponentProps } from 'react-window';
import { shallowEqual } from 'react-redux';

import type { IAlbum } from 'types/photos';

import { useAppSelector } from 'hooks';

import * as icons from 'icons';

import Thumbnail, { ThumbnailSize } from 'components/Thumbnail';

import type { ItemDataProps } from '../AlbumListView';

function AlbumListItem({ data, index, style }: ListChildComponentProps<ItemDataProps>) {
  const { ids, onItemClick, selectById } = data;

  const album = useAppSelector<IAlbum | undefined>(
    (state) => selectById(state, ids[index]),
    shallowEqual,
  );

  const onClick = React.useCallback(() => {
    if (onItemClick) {
      onItemClick(album?.slug ?? '');
    }
  }, [album, onItemClick]);

  if (!album) return null;

  return (
    <div style={style} className="bg-white py-1 transition-colors dark:bg-zinc-800">
      <button
        type="button"
        className="flex h-full w-full items-center justify-start rounded-xl bg-gray-50 px-3 py-3 text-left dark:bg-zinc-900/50"
        onClick={onClick}
      >
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-200 dark:bg-zinc-700">
          {(album.cover?.thumbnailUrl && (
            <Thumbnail
              file={{
                id: album.cover?.fileId,
                thumbnail_url: album.cover?.thumbnailUrl,
                modified_at: album.createdAt,
              }}
              size={ThumbnailSize.lg}
              objectFit="cover"
            />
          )) ?? (
            <div className="flex items-center justify-center rounded-lg bg-gray-100 dark:bg-zinc-700">
              <icons.PhotographOutlined className="h-7 w-7 text-gray-500 dark:text-zinc-400" />
            </div>
          )}
        </div>
        <div className="ml-3 flex min-w-0 flex-1 flex-col">
          <span className="truncate font-medium text-gray-900 dark:text-gray-100">
            {album.title}
          </span>
          <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {album.itemsCount} {album.itemsCount === 1 ? 'item' : 'items'}
          </span>
        </div>
      </button>
    </div>
  );
}

export default React.memo(AlbumListItem);
