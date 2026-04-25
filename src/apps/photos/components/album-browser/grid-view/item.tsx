import { memo, type MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import type { IAlbum } from '@/types/photos';

import { AlbumsIcon, MoreVerticalIcon } from '@/icons';

import { ThumbnailSize } from '@/constants';

import { cn } from '@/lib/utils';

import { useTouchDevice } from '@/hooks/media-query';

import { Button } from '@/ui/button';
import { Item, ItemActions, ItemContent, ItemDescription, ItemHeader, ItemTitle } from '@/ui/item';

import { useSelection } from '@/components/SelectionProvider';
import { Thumbnail, ThumbnailFallback, ThumbnailImage } from '@/components/thumbnail';

import { AlbumActionsDropdown } from '@/apps/photos/components/album-actions-dropdown';

interface Props {
  album: IAlbum;
}

const overlayControlClassName = [
  'size-6 sm:size-6 min-w-0',
  'rounded-full bg-black/45 backdrop-blur-sm',
  'text-white',
  'p-0 shadow-sm',
  'transition-all',
  'hover:bg-black/60 hover:text-white',
  'dark:bg-black/55 dark:hover:bg-black/70',
].join(' ');

const hiddenOverlayControlClassName =
  'pointer-events-none opacity-0 group-hover/item:pointer-events-auto group-hover/item:opacity-100';

export const GridViewItem = memo(function GridViewItem({ album }: Props) {
  const { t } = useTranslation('photos');
  const navigate = useNavigate();
  const touch = useTouchDevice();

  const { isSelected, select, toggleSelection } = useSelection();
  const selected = isSelected(album.id);

  const hasThumbnail = !!album.cover?.thumbnailUrl;

  const openAlbum = () => {
    navigate(album.slug);
  };

  const isControlTarget = (target: HTMLElement) => {
    return target.closest('[data-slot="item-actions"]') != null;
  };

  const handleItemClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (isControlTarget(target)) {
      return;
    }

    if (touch) {
      openAlbum();
      return;
    }

    if (event.metaKey) {
      toggleSelection(album.id);
      return;
    }

    if (!selected) {
      select([album.id]);
    }
  };

  const handleItemDoubleClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (isControlTarget(target)) {
      return;
    }

    openAlbum();
  };

  const handleMenuOpen = () => {
    if (!selected) {
      select([album.id]);
    }
  };

  return (
    <div className="h-full p-2">
      <Item
        className={cn(
          'h-full cursor-default flex-col items-stretch p-2',
          selected
            ? 'ring-2 ring-blue-600 ring-offset-1 dark:ring-indigo-500 dark:ring-offset-zinc-900'
            : 'group-hover/item:bg-accent',
        )}
        size="sm"
        onClick={handleItemClick}
        onDoubleClick={touch ? undefined : handleItemDoubleClick}
      >
        <ItemHeader
          className={cn(
            'relative min-h-0 flex-1 basis-0 items-center justify-center overflow-hidden rounded-md transition-all',
            'bg-gray-50',
            'dark:bg-zinc-800 lg:dark:bg-zinc-900/30',
            hasThumbnail && 'bg-muted',
          )}
        >
          <ItemActions
            className={cn(
              'absolute top-2 right-2 z-10 transition-opacity',
              selected ? 'opacity-100' : hiddenOverlayControlClassName,
            )}
          >
            <AlbumActionsDropdown album={album} onOpen={handleMenuOpen}>
              <Button
                className={overlayControlClassName}
                size="icon-sm"
                variant="ghost"
                aria-label={t('gallery.moreActions', { defaultValue: 'More actions' })}
              >
                <MoreVerticalIcon className="size-3.5" />
              </Button>
            </AlbumActionsDropdown>
          </ItemActions>

          <Thumbnail className="size-full rounded-md">
            <ThumbnailImage
              src={album.cover?.thumbnailUrl}
              size={ThumbnailSize.lg}
              objectFit="cover"
              alt={album.title}
            />
            <ThumbnailFallback className="bg-gray-100 dark:bg-zinc-800">
              <AlbumsIcon className="size-14 text-gray-500 dark:text-zinc-400" />
            </ThumbnailFallback>
          </Thumbnail>
        </ItemHeader>

        <div className="w-full min-w-0">
          <ItemContent className="w-full min-w-0 items-center px-2 text-center">
            <ItemTitle className="max-w-full min-w-0 justify-center">
              <p className="truncate">{album.title}</p>
            </ItemTitle>
            <ItemDescription className="text-xs max-sm:hidden">{album.itemsCount}</ItemDescription>
          </ItemContent>
        </div>
      </Item>
    </div>
  );
});

GridViewItem.displayName = 'GridViewItem';
