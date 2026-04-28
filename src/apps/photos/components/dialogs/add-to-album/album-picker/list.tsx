import { memo, useMemo } from 'react';

import type { IAlbum } from '@/types/photos';

import { type ItemRendererProps, VList } from '@/ui/vlist';

import AlbumPickerItem from './item';

export interface ItemData {
  entities: Record<string, IAlbum>;
  ids: string[];
  pendingAlbumSlug?: string;
  onItemClick?: (albumSlug: string) => void;
}

interface Props {
  entities: Record<string, IAlbum>;
  ids: string[];
  loadMore?: () => void;
  pendingAlbumSlug?: string;
  onItemClick?: (albumSlug: string) => void;
}

const AlbumPickerRowRenderer = memo(function AlbumPickerRowRenderer({
  data,
  index,
  style,
}: ItemRendererProps<ItemData>) {
  const album = data.entities[data.ids[index]];

  if (album == null) {
    return null;
  }

  return (
    <div style={style} className="px-1 py-1">
      <AlbumPickerItem
        album={album}
        disabled={data.pendingAlbumSlug != null}
        loading={data.pendingAlbumSlug === album.slug}
        onClick={data.onItemClick}
      />
    </div>
  );
});

AlbumPickerRowRenderer.displayName = 'AlbumPickerRowRenderer';

export function AlbumPickerList({ entities, ids, pendingAlbumSlug, loadMore, onItemClick }: Props) {
  const itemData: ItemData = useMemo(
    () => ({
      entities,
      ids,
      onItemClick,
      pendingAlbumSlug,
    }),
    [entities, ids, onItemClick, pendingAlbumSlug],
  );

  return (
    <VList
      itemData={itemData}
      itemCount={ids.length}
      itemRenderer={AlbumPickerRowRenderer}
      itemHeight={84}
      loadMore={loadMore}
    />
  );
}
