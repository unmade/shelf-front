import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import type { IAlbum } from '@/types/photos';

import { useDeleteAlbumMutation } from '@/store/albums';

import { Button } from '@/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/ui/dialog';
import { Strong } from '@/ui/text';

interface Props {
  open: boolean;
  album: IAlbum | null;
  onClose: () => void;
}

export function DeleteAlbumDialog({ open, album, onClose }: Props) {
  const { t } = useTranslation('photos');

  const [deleteAlbum, { isLoading: deleting }] = useDeleteAlbumMutation();

  const handleConfirm = async () => {
    if (album == null) {
      return;
    }

    try {
      await deleteAlbum(album.slug).unwrap();
      onClose();
    } catch {
      // do nothing on error
    }
  };

  const handleOpenChanged = useCallback(
    (isOpen: boolean) => {
      if (!isOpen) {
        onClose();
      }
    },
    [onClose],
  );

  const dialogText = album ? (
    <span>
      {t('photos:dialogs.deleteAlbum.description', {
        defaultValue: 'Are you sure you want to delete',
      })}{' '}
      <Strong className="text-foreground">{album.title}</Strong>?
    </span>
  ) : null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChanged}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t('photos:dialogs.deleteAlbum.title', { defaultValue: 'Delete Album' })}
          </DialogTitle>
          <DialogDescription>{dialogText}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">
              {t('photos:dialogs.deleteAlbum.actions.cancel', { defaultValue: 'Cancel' })}
            </Button>
          </DialogClose>
          <Button variant="destructive" disabled={deleting} onClick={handleConfirm}>
            {t('photos:dialogs.deleteAlbum.actions.delete', { defaultValue: 'Delete' })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
