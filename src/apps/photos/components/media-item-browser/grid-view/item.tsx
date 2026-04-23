import { memo } from 'react';

import type { IMediaItem } from '@/types/photos';

import { HeartOutlineIcon, MoreVerticalIcon } from '@/icons';

import { MediaType, ThumbnailSize } from '@/constants';

import { cn } from '@/lib/utils';

import { useTouchDevice } from '@/hooks/media-query';

import { Button } from '@/ui/button';
import { Checkbox } from '@/ui/checkbox';
import { Item, ItemActions, ItemHeader } from '@/ui/item';

import FileIcon from '@/components/FileIcon';
import { useSelection } from '@/components/SelectionProvider';
import { Thumbnail, ThumbnailFallback, ThumbnailImage } from '@/components/thumbnail';

import { FavouriteToggle } from '@/apps/photos/components/favourite-toggle';

import { useMediaItemBrowser } from '../contexts/ui';

interface Props {
  mediaItem: IMediaItem;
}

const overlayControlClassName = [
  // Sizing
  'size-6 sm:size-6 min-w-0',
  // Shape and background
  'rounded-full bg-black/45 backdrop-blur-sm',
  // Typography and color
  'text-white',
  // Padding and shadow
  'p-0 shadow-sm',
  // State transitions
  'transition-all',
  // Hover/focus states
  'hover:bg-black/60 hover:text-white',
  'dark:bg-black/55 dark:hover:bg-black/70',
].join(' ');

const hiddenOverlayControlClassName =
  'pointer-events-none opacity-0 group-hover/item:pointer-events-auto group-hover/item:opacity-100';

export const GridViewItem = memo(function GridViewItem({ mediaItem }: Props) {
  const touch = useTouchDevice();
  const { isSelected, select, toggleSelection } = useSelection();
  const { mediaItemActionsDropdown: MediaItemActionsDropdown, openPreview } = useMediaItemBrowser();

  const selected = isSelected(mediaItem.id);
  const hasThumbnail = !!mediaItem.thumbnailUrl && MediaType.isImage(mediaItem.mediaType);

  const handleCheckboxChange = (checked: boolean | 'indeterminate') => {
    if (checked !== 'indeterminate') {
      toggleSelection(mediaItem.id);
    }
  };

  const handlePreviewOpen = () => {
    if (!selected) {
      select([mediaItem.id]);
    }
    openPreview(mediaItem.id);
  };

  const isControlTarget = (target: HTMLElement) => {
    return (
      target.closest('[data-slot="checkbox"]') != null ||
      target.closest('[data-slot="item-actions"]') != null
    );
  };

  const handleItemClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (isControlTarget(target)) {
      return;
    }

    if (touch) {
      handlePreviewOpen();
      return;
    }

    if (event.metaKey) {
      toggleSelection(mediaItem.id);
      return;
    }

    if (!selected) {
      select([mediaItem.id]);
    }
  };

  const handleItemDoubleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (isControlTarget(target)) {
      return;
    }

    handlePreviewOpen();
  };

  const handleMenuOpen = () => {
    if (!selected) {
      select([mediaItem.id]);
    }
  };

  return (
    <div className="aspect-square p-2">
      <Item
        className={cn(
          'h-full flex-col items-stretch p-1.5',
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
          <Checkbox
            checked={selected}
            onCheckedChange={handleCheckboxChange}
            aria-label={`Select ${mediaItem.name}`}
            className={cn(
              'absolute top-2 left-2 z-10',
              overlayControlClassName,
              touch || selected ? 'opacity-100' : hiddenOverlayControlClassName,
            )}
          />

          <ItemActions
            className={cn(
              'absolute top-2 right-2 z-10 transition-opacity',
              selected ? 'opacity-100' : hiddenOverlayControlClassName,
            )}
          >
            <MediaItemActionsDropdown mediaItem={mediaItem} onOpen={handleMenuOpen}>
              <Button
                className={overlayControlClassName}
                size="icon-sm"
                variant="ghost"
                aria-label="More actions"
              >
                <MoreVerticalIcon className="size-3.5" />
              </Button>
            </MediaItemActionsDropdown>
          </ItemActions>

          <Thumbnail className="size-full rounded-md">
            <ThumbnailImage
              src={mediaItem.thumbnailUrl}
              size={ThumbnailSize.lg}
              objectFit="cover"
              alt={mediaItem.name}
            />
            <ThumbnailFallback>
              <FileIcon className="size-14" mediatype={mediaItem.mediaType} hidden={false} />
            </ThumbnailFallback>
          </Thumbnail>

          <ItemActions className="absolute bottom-2 left-2 z-10">
            <FavouriteToggle
              className={({ favourite }) =>
                cn(
                  overlayControlClassName,
                  'data-[state=on]:bg-black/45 data-[state=on]:text-white',
                  selected || favourite ? 'opacity-100' : hiddenOverlayControlClassName,
                )
              }
              mediaItemIds={[mediaItem.id]}
              size="sm"
            >
              <HeartOutlineIcon className="size-4 drop-shadow-sm" />
            </FavouriteToggle>
          </ItemActions>
        </ItemHeader>
      </Item>
    </div>
  );
});

GridViewItem.displayName = 'GridViewItem';
