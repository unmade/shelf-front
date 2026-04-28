import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import type { IMediaItem } from '@/types/photos';

import { useAddAlbumItemsMutation } from '@/store/albums';

import { Button } from '@/ui/button';
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/ui/dialog';
import { toast } from '@/ui/sonner';

import { useCreateAlbumDialog } from '../create-album';

import { AlbumPicker } from './album-picker';

interface Props {
  mediaItems: IMediaItem[];
  open: boolean;
  onClose: () => void;
}

export function AddToAlbumDialog({ mediaItems, open, onClose }: Props) {
  const { t } = useTranslation('photos');
  const { openDialog } = useCreateAlbumDialog();

  const [addAlbumItems, { isLoading: loading, originalArgs }] = useAddAlbumItemsMutation();
  const pendingAlbumSlug = loading ? originalArgs?.albumSlug : undefined;

  const mediaItemIds = mediaItems.map((item) => item.id);

  const onItemClick = useCallback(
    async (albumSlug: string) => {
      if (loading) {
        return;
      }

      try {
        const album = await addAlbumItems({ albumSlug, mediaItemIds }).unwrap();
        toast.success(
          t('photos:dialogs.addToAlbumDialog.notifications.success.title', {
            defaultValue: 'Added to album',
          }),
          {
            description: t('photos:dialogs.addToAlbumDialog.notifications.success.description', {
              defaultValue: '{{count}} item added to {{albumTitle}}',
              count: mediaItems.length,
              albumTitle: album.title,
            }),
          },
        );
        onClose();
      } catch {
        toast.error(
          t('photos:dialogs.addToAlbumDialog.notifications.error.title', {
            defaultValue: 'Unable to add to album',
          }),
          {
            description: t('photos:dialogs.addToAlbumDialog.notifications.error.description', {
              defaultValue: 'Something went wrong. Please try again.',
            }),
          },
        );
      }
    },
    [addAlbumItems, loading, mediaItemIds, mediaItems.length, onClose, t],
  );

  const handleOpenChanged = (isOpen: boolean) => {
    if (!isOpen && !loading) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChanged}>
      <DialogContent className="sm:w-lg">
        <DialogHeader>
          <DialogTitle>
            {t('photos:dialogs.addToAlbumDialog.title', {
              defaultValue: 'Add to Album',
              count: mediaItems.length,
            })}
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <AlbumPicker
            className="flex min-h-[40vh] flex-col sm:min-h-[60vh] sm:w-md"
            pendingAlbumSlug={pendingAlbumSlug}
            onItemClick={onItemClick}
          />
        </DialogBody>
        <DialogFooter className="justify-between">
          <Button variant="outline" disabled={loading} onClick={openDialog}>
            {t('photos:pages.albums.newAlbumButton', { defaultValue: 'Create Album' })}
          </Button>
          <DialogClose asChild>
            <Button variant="ghost" disabled={loading}>
              {t('photos:dialogs.addToAlbumDialog.actions.close', { defaultValue: 'Close' })}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
