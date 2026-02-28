import { useCallback, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import type { IFile } from '@/types/files';

import { useMoveFileBatchMutation } from '@/store/files';
import { Scopes, waitForBackgroundTaskToComplete } from '@/store/tasks';

import { MediaType } from '@/constants';
import { useAppDispatch } from '@/hooks';
import * as routes from '@/routes';

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
import { Field, FieldError } from '@/ui/field';
import { Input } from '@/ui/input';

function useRenameFile(onSuccess: () => void) {
  const dispatch = useAppDispatch();
  const [moveFileBatch, { isLoading }] = useMoveFileBatchMutation();

  const rename = useCallback(
    async (fromPath: string, toPath: string) => {
      const relocations = [{ fromPath, toPath }];
      const { taskId } = await moveFileBatch(relocations).unwrap();
      dispatch(
        waitForBackgroundTaskToComplete({
          taskId,
          scope: Scopes.MovingBatch,
          itemsCount: relocations.length,
        }),
      );
      onSuccess();
    },
    [dispatch, moveFileBatch, onSuccess],
  );

  return { rename, isLoading };
}

interface Props {
  file: IFile | null;
  open: boolean;
  onClose: () => void;
}

export function RenameFileDialog({ file, open, onClose }: Props) {
  const { t } = useTranslation();
  const { rename, isLoading } = useRenameFile(onClose);

  const [name, setName] = useState(file?.name ?? '');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (file != null) {
      setName(file.name);
    }
  }, [file]);

  useEffect(() => {
    if (!open && error != null) {
      setError(null);
    }
  }, [open, error]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    if (error != null) {
      setError(null);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (file == null) return;

    if (name === '') {
      setError(t('Name cannot be empty.'));
    } else if (name === file.name) {
      setError(t('Name is the same.'));
    } else {
      const toPath = routes.join(routes.parent(file.path), name);
      rename(file.path, toPath);
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      onClose();
    }
  };

  const title = file?.mediatype === MediaType.FOLDER ? t('Rename Folder') : t('Rename File');

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form className="w-full sm:min-w-xs" onSubmit={handleSubmit}>
          <DialogBody>
            <Field data-invalid={error != null}>
              <Input
                id="name"
                name="name"
                placeholder={t('New name')}
                aria-invalid={error != null}
                onChange={handleInputChange}
                defaultValue={name}
              />
              {error && <FieldError>{error}</FieldError>}
            </Field>
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">{t('Cancel')}</Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading || name === ''}>
              {t('Rename')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
