import { useMemo, type ComponentType } from 'react';

import type { IAlbum } from 'types/photos';

import { useListAlbumItemsInfiniteQuery, albumItemsAdapter } from 'store/albums';

import {
  AlbumMediaItemActionsDropdown,
  type MediaItemActionsDropdownProps,
} from '@/apps/photos/components/album-item-actions-dropdown';
import {
  MediaItemBrowser,
  MediaItemsBrowserDataProvider,
} from '@/apps/photos/components/media-item-browser';

import Empty from './Empty';

const initialState = albumItemsAdapter.getInitialState();
const { selectIds } = albumItemsAdapter.getSelectors();

interface Props {
  album: IAlbum;
}

export default function Content({ album }: Props) {
  const {
    data: result,
    isError,
    isLoading,
    isSuccess,
    fetchNextPage,
  } = useListAlbumItemsInfiniteQuery({ albumSlug: album.slug });

  const data = useMemo(
    () => albumItemsAdapter.setAll(initialState, result?.pages.flat() ?? []),
    [result],
  );
  const mediaItemActionsDropdown = useMemo<ComponentType<MediaItemActionsDropdownProps>>(() => {
    function AlbumActionsDropdown(props: MediaItemActionsDropdownProps) {
      return <AlbumMediaItemActionsDropdown {...props} albumSlug={album.slug} />;
    }

    AlbumActionsDropdown.displayName = 'AlbumActionsDropdown';
    return AlbumActionsDropdown;
  }, [album.slug]);

  const ids = selectIds(data);
  const empty = isSuccess && ids.length === 0;

  if (empty) {
    return (
      <div className="flex h-full">
        <Empty />
      </div>
    );
  }

  return (
    <MediaItemsBrowserDataProvider
      data={data}
      isLoading={isLoading}
      isError={isError}
      itemsCount={album.itemsCount}
      loadMore={fetchNextPage}
    >
      <MediaItemBrowser mediaItemActionsDropdown={mediaItemActionsDropdown} />
    </MediaItemsBrowserDataProvider>
  );
}
