import { HeartOutlineIcon, MoreHorizontalIcon } from '@/icons';

import { useTranslation } from 'react-i18next';

import type { IMediaItem } from '@/types/photos';

import * as Collapsible from '@radix-ui/react-collapsible';

import { cn } from '@/lib/utils';

import { Button } from '@/ui/button';
import { ButtonGroup } from '@/ui/button-group';
import { FileSize } from '@/ui/filesize';
import { Text } from '@/ui/text';
import { TimeAgo } from '@/ui/timeago';

import { FavouriteToggle } from '@/apps/photos/components/favourite-toggle';
import { MediaItemSections } from '@/apps/photos/components/media-item-sections';

import { useDownloadBatchAction } from '@/components/photos/hooks/media-item-actions';

import { useGallery, useSelectGallerySlide } from './context';
import { useMediaItemBrowser } from '../contexts/ui';

function Title({ name }: { name: string }) {
  return (
    <p
      className={cn(
        'w-full py-1.5 font-semibold wrap-break-word',
        name.length > 128 ? 'text-sm' : 'text-base',
      )}
    >
      {name}
    </p>
  );
}

function Description({ modifiedAt, size }: { modifiedAt: string; size: number }) {
  return (
    <Text size="sm">
      <FileSize bytes={size} />
      <span> • </span>
      <TimeAgo value={modifiedAt} />
    </Text>
  );
}

function Actions({ className, mediaItem }: { className?: string; mediaItem: IMediaItem }) {
  const { t } = useTranslation('photos');
  const { mediaItemActionsDropdown: MediaItemActionsDropdown } = useMediaItemBrowser();
  const downloadAction = useDownloadBatchAction([mediaItem]);

  if (!downloadAction) {
    return null;
  }

  return (
    <div className={cn('flex items-center justify-between', className)}>
      <Button size="sm" onClick={downloadAction.onClick}>
        {downloadAction.name}
      </Button>
      <ButtonGroup>
        <FavouriteToggle mediaItemIds={[mediaItem.id]} variant="outline" size="sm">
          <HeartOutlineIcon />
          {t('photos:mediaItem.actions.favourite', { defaultValue: 'Favourite', count: 1 })}
        </FavouriteToggle>
        <MediaItemActionsDropdown mediaItem={mediaItem} align="end">
          <Button size="sm" variant="outline" aria-label="More actions">
            <MoreHorizontalIcon />
          </Button>
        </MediaItemActionsDropdown>
      </ButtonGroup>
    </div>
  );
}

function SidePanelContent() {
  const { currentMediaItem } = useSelectGallerySlide();

  if (!currentMediaItem) {
    return null;
  }

  return (
    <div className="h-full w-full border-l">
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        <div>
          <Title name={currentMediaItem.name} />
          <Description modifiedAt={currentMediaItem.modifiedAt} size={currentMediaItem.size} />
        </div>
        <Actions mediaItem={currentMediaItem} />
        <MediaItemSections mediaItem={currentMediaItem} />
      </div>
    </div>
  );
}

export function GallerySidePanel() {
  const { sidePanelOpen } = useGallery();

  return (
    <Collapsible.Root
      open={sidePanelOpen}
      className={[
        'hidden h-full lg:block lg:w-xs xl:w-sm',
        'transform transition-all duration-300',
        'data-[state=closed]:pointer-events-none',
        'data-[state=closed]:w-0',
        'data-[state=closed]:translate-x-full',
      ].join(' ')}
    >
      <Collapsible.Content forceMount className="h-full overflow-hidden dark:bg-zinc-900">
        <SidePanelContent />
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
