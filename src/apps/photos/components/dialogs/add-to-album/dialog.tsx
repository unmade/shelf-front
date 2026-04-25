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

import { AlbumPicker } from './album-picker';

interface Props {
  mediaItems: IMediaItem[];
  open: boolean;
  onClose: () => void;
}

export function AddToAlbumDialog({ mediaItems, open, onClose }: Props) {
  const { t } = useTranslation('photos');

  const [addAlbumItems] = useAddAlbumItemsMutation();

  const mediaItemIds = mediaItems.map((item) => item.id);

  const onItemClick = useCallback(
    async (albumSlug: string) => {
      try {
        await addAlbumItems({ albumSlug, mediaItemIds }).unwrap();
        onClose();
      } catch {
        // skip error
      }
    },
    [addAlbumItems, mediaItemIds, onClose],
  );

  const handleOpenChanged = (isOpen: boolean) => {
    if (!isOpen) {
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
            onItemClick={onItemClick}
          />
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button>
              {t('photos:dialogs.addToAlbumDialog.actions.close', { defaultValue: 'Close' })}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
