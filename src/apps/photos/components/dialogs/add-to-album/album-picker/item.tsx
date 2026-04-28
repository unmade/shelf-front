import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import type { IAlbum } from '@/types/photos';

import { ThumbnailSize } from '@/constants';
import { ImageIcon } from '@/icons';
import { Spinner } from '@/ui/spinner';

import { Thumbnail, ThumbnailFallback, ThumbnailImage } from '@/components/thumbnail';

import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/ui/item';
interface Props {
  album: IAlbum;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (albumSlug: string) => void;
}

function AlbumPickerItem({ album, disabled = false, loading = false, onClick }: Props) {
  const { t } = useTranslation('photos');

  const handleClick = useCallback(() => {
    onClick?.(album.slug);
  }, [album.slug, onClick]);

  return (
    <Item
      asChild
      className="h-full w-full min-w-0 rounded-lg border border-black/5 bg-white/80 px-3 py-2 text-left hover:bg-white/95 dark:border-white/5 dark:bg-zinc-950/60 dark:hover:bg-zinc-900/80"
    >
      <button
        type="button"
        disabled={disabled}
        aria-busy={loading}
        onClick={handleClick}
        className="disabled:cursor-wait disabled:opacity-70"
      >
        <ItemMedia variant="image" className="bg-muted size-14 rounded-lg">
          <Thumbnail className="size-full">
            <ThumbnailImage
              src={album.cover?.thumbnailUrl}
              size={ThumbnailSize.lg}
              objectFit="cover"
              alt={album.title}
            />
            <ThumbnailFallback className="bg-muted">
              <ImageIcon className="text-muted-foreground size-7" />
            </ThumbnailFallback>
          </Thumbnail>
        </ItemMedia>
        <ItemContent className="min-w-0 gap-0.5">
          <ItemTitle className="w-full min-w-0">
            <span className="truncate">{album.title}</span>
          </ItemTitle>
          <ItemDescription className="line-clamp-1 text-xs">
            {t('photos:dialogs.addToAlbumDialog.albumItemCount', {
              defaultValue: '{{count}} item',
              count: album.itemsCount,
            })}
          </ItemDescription>
        </ItemContent>
        <ItemActions>{loading ? <Spinner className="size-5 sm:size-4" /> : null}</ItemActions>
      </button>
    </Item>
  );
}

export default memo(AlbumPickerItem);
