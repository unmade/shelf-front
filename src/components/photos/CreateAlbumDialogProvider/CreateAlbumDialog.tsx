import React from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigate, resolvePath } from 'react-router';

import * as routes from '@/routes';

import { useCreateAlbumMutation } from '@/store/albums';

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
  open: boolean;
  onClose: () => void;
}

export default function CreateAlbumDialog({ open, onClose }: Props) {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [createAlbum, { isLoading: loading }] = useCreateAlbumMutation();

  const [error, setError] = React.useState<string | null>(null);

  const onInputChange = () => {
    if (error != null) {
      setError(null);
    }
  };

  const handleOpenChanged = (open: boolean) => {
    if (!open) {
      setError(null);
      onClose();
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const albumTitle = ((formData.get('title') ?? '') as string).trim();

    if (albumTitle === '') {
      setError(
        t('photos:dialogs.createAlbum.errors.nameRequired', {
          defaultValue: 'Name cannot be empty',
        }),
      );
      return;
    }

    try {
      const album = await createAlbum({ title: albumTitle }).unwrap();
      navigate(resolvePath(routes.encodePath(album.slug), routes.PHOTOS_ALBUMS.prefix));
      onClose();
    } catch {
      setError(
        t('photos:dialogs.createAlbum.errors.unknown', {
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
            {t('photos:dialogs.createAlbum.title', { defaultValue: 'Create Album' })}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <DialogBody>
            <Field data-invalid={!!error}>
              <FieldLabel>
                {t('photos:dialogs.createAlbum.fields.title.label', {
                  defaultValue: 'Album title',
                })}
              </FieldLabel>
              <Input
                id="title"
                name="title"
                placeholder={t('photos:dialogs.createAlbum.fields.title.placeholder', {
                  defaultValue: 'e.g. My Album',
                })}
                aria-invalid={!!error}
                onChange={onInputChange}
              />
              {error && <FieldError>{error}</FieldError>}
            </Field>
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">{t('Cancel')}</Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {t('Create')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
