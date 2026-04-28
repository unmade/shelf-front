import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import type { IAlbum } from '@/types/photos';

import { useUpdateAlbumMutation } from '@/store/albums';

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
import { Field, FieldError, FieldLabel } from '@/ui/field';
import { Input } from '@/ui/input';

interface Props {
  album: IAlbum | null;
  open: boolean;
  onClose: () => void;
}

export function RenameAlbumDialog({ album, open, onClose }: Props) {
  const { t } = useTranslation('photos');

  const [error, setError] = useState<string | null>(null);
  const [updateAlbum, { isLoading: renaming }] = useUpdateAlbumMutation();

  const onInputChange = () => {
    setError(null);
  };

  const handleOpenChanged = (isOpen: boolean) => {
    if (!isOpen) {
      setError(null);
      onClose();
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (album == null) {
      return;
    }

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const newTitle = ((formData.get('title') ?? '') as string).trim();

    if (newTitle === '') {
      setError(
        t('photos:dialogs.renameAlbum.errors.nameRequired', {
          defaultValue: 'Name cannot be empty',
        }),
      );
      return;
    }

    if (newTitle === album.title) {
      setError(
        t('photos:dialogs.renameAlbum.errors.nameUnchanged', {
          defaultValue: 'Name is the same',
        }),
      );
      return;
    }

    try {
      updateAlbum({ albumSlug: album.slug, title: newTitle }).unwrap();
    } catch {
      setError(
        t('photos:dialogs.renameAlbum.errors.unknown', {
          defaultValue: 'Something went wrong',
        }),
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChanged}>
      <DialogContent className="sm:w-sm">
        <DialogHeader>
          <DialogTitle>
            {t('photos:dialogs.renameAlbum.title', { defaultValue: 'Rename Album' })}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <DialogBody>
            <Field data-invalid={!!error}>
              <FieldLabel>
                {t('photos:dialogs.renameAlbum.fields.title.label', {
                  defaultValue: 'New Album Title',
                })}
              </FieldLabel>
              <Input
                id="title"
                name="title"
                placeholder={t('photos:dialogs.renameAlbum.fields.title.placeholder', {
                  defaultValue: 'e.g. My Album',
                })}
                aria-invalid={!!error}
                onChange={onInputChange}
                defaultValue={album?.title ?? ''}
              />
              {error ? <FieldError>{error}</FieldError> : null}
            </Field>
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">
                {t('photos:dialogs.renameAlbum.actions.cancel', { defaultValue: 'Cancel' })}
              </Button>
            </DialogClose>
            <Button type="submit" disabled={renaming}>
              {t('photos:dialogs.renameAlbum.actions.rename', { defaultValue: 'Rename' })}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
