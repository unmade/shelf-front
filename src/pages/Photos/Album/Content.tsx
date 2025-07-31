import { useCallback } from 'react';

import type { IAlbum } from 'types/photos';

import type { RootState } from 'store/store';
import { useListAlbumItemsInfiniteQuery, albumItemsAdapter } from 'store/albums';

import type { MenuItemRendererProps } from 'components/photos/MediaItemGridView';
import MediaItemGridView from 'components/photos/MediaItemGridView';
import AlbumMediaItemMenu from 'components/photos/AlbumMediaItemMenu';

import Empty from './Empty';

const initialState = albumItemsAdapter.getInitialState();
const { selectIds, selectById } = albumItemsAdapter.getSelectors();

interface Props {
  album: IAlbum;
}

export default function Content({ album }: Props) {
  const { data, isSuccess, fetchNextPage } = useListAlbumItemsInfiniteQuery(
    {
      albumSlug: album.slug,
    },
    {
      selectFromResult: ({ data: result, isSuccess: success }) => ({
        data: albumItemsAdapter.setAll(initialState, result?.pages.flat() ?? []),
        isSuccess: success,
      }),
    },
  );

  const selectByIdCallback = useCallback(
    (_: RootState, itemId: string) => selectById(data, itemId),
    [data],
  );

  const ids = selectIds(data);

  const menuItemRenderer = useCallback(
    ({ mediaItem, onOpen }: MenuItemRendererProps) => (
      <AlbumMediaItemMenu mediaItem={mediaItem} onOpen={onOpen} albumSlug={album.slug} />
    ),
    [album.slug],
  );

  if (isSuccess && !ids.length) {
    return (
      <div className="flex h-full">
        <Empty />
      </div>
    );
  }

  return (
    <MediaItemGridView
      ids={ids}
      itemsCount={album.itemsCount}
      selectById={selectByIdCallback}
      loadMore={fetchNextPage}
      menuItemRenderer={menuItemRenderer}
    />
  );
}
