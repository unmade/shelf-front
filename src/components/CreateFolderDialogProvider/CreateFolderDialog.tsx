import { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigate, resolvePath } from 'react-router';

import {
  isFileActionNotAllowed,
  isFileAlreadyExists,
  isNotADirectory,
  useCreateFolderMutation,
} from '@/store/files';

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
import { Field, FieldError, FieldLabel } from '@/ui/field';
import { Input } from '@/ui/input';

interface Props {
  inPath: string;
  open: boolean;
  onClose: () => void;
}

export default function CreateFolderDialog({ inPath, open, onClose }: Props) {
  const { t } = useTranslation('files');

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [createFolder, { isLoading: creating }] = useCreateFolderMutation();

  const handleOpenChanged = (open: boolean) => {
    if (!open) {
      setErrorMessage(null);
      onClose();
    }
  };

  const handleInputChange = () => {
    setErrorMessage(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const folderName = (formData.get('name') ?? '') as string;

    if (folderName.trim() === '') {
      setErrorMessage(
        t('files.dialogs.createFolder.errors.nameRequired', {
          defaultValue: 'Name cannot be empty',
        }),
      );
      return;
    }

    try {
      const { path } = await createFolder({ name: folderName, inPath }).unwrap();
      navigate(resolvePath(routes.encodePath(path), routes.FILES.prefix));
      onClose();
    } catch (err) {
      if (isFileActionNotAllowed(err)) {
        setErrorMessage(
          t('files.dialogs.createFolder.errors.actionNotAllowed', {
            defaultValue: 'You do not have permission to create a folder',
          }),
        );
      }
      if (isFileAlreadyExists(err)) {
        setErrorMessage(
          t('files.dialogs.createFolder.errors.folderExists', {
            defaultValue: 'A folder with this name already exists',
          }),
        );
      }
      if (isNotADirectory(err)) {
        setErrorMessage(
          t('files.dialogs.createFolder.errors.notADirectory', {
            defaultValue: 'The specified path is not a directory',
          }),
        );
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChanged}>
      <DialogContent className="sm:w-sm">
        <DialogHeader>
          <DialogTitle>
            {t('files.dialogs.createFolder.title', { defaultValue: 'New Folder' })}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <DialogBody>
            <Field data-invalid={errorMessage != null}>
              <FieldLabel>
                {t('files.dialogs.createFolder.fields.name.label', { defaultValue: 'Name' })}
              </FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder={t('files.dialogs.createFolder.fields.name.placeholder', {
                  defaultValue: 'Folder name',
                })}
                onChange={handleInputChange}
                aria-invalid={!!errorMessage}
              />
              {errorMessage && <FieldError>{errorMessage}</FieldError>}
            </Field>
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">
                {t('files.dialogs.createFolder.actions.cancel', { defaultValue: 'Cancel' })}
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" disabled={creating}>
                {t('files.dialogs.createFolder.actions.create', { defaultValue: 'Create' })}
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
