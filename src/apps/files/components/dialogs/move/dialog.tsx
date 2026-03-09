import { useCallback, useState } from 'react';

import { useTranslation } from 'react-i18next';

import type { IFile } from '@/types/files';

import { useMoveFileBatchMutation } from '@/store/files';
import { Scopes, waitForBackgroundTaskToComplete } from '@/store/tasks';

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

import FolderPicker from '@/components/FolderPicker';
import { useAppDispatch } from '@/hooks';

interface Props {
  files: IFile[];
  open: boolean;
  onClose: () => void;
}

export function MoveDialog({ files, open, onClose }: Props) {
  const { t } = useTranslation('files');

  const dispatch = useAppDispatch();

  const [toPath, setToPath] = useState<string>('.');

  const [moveFileBatch, { isLoading: loading }] = useMoveFileBatchMutation();

  const onConfirm = async () => {
    const relocations = files.map((file) => ({
      fromPath: file.path,
      toPath: routes.join(toPath, file.name),
    }));

    const data = await moveFileBatch(relocations).unwrap();
    dispatch(
      waitForBackgroundTaskToComplete({
        taskId: data.taskId as string,
        scope: Scopes.MovingBatch,
        itemsCount: relocations.length,
      }),
    );
    setToPath('.');
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setToPath('.');
      onClose();
    }
  };

  const onPathChange = useCallback((path: string) => setToPath(path), [setToPath]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t('dialogs.move.title', {
              defaultValue: 'Move {{count}} items to...',
              count: files.length,
            })}
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <FolderPicker
            className="flex min-h-[40vh] flex-col sm:min-h-[60vh] sm:w-md"
            emptyTitle={t('dialogs.move.emptyTitle', { defaultValue: 'Nothing here yet' })}
            emptyDescription={t('dialogs.move.emptyDescription', {
              defaultValue: 'Press "Move" button to move file here',
            })}
            excludeIds={files.map((file) => file.id)}
            onPathChange={onPathChange}
          />
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">{t('actions.cancel', { defaultValue: 'Cancel' })}</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={onConfirm} disabled={loading}>
              {t('actions.move', { defaultValue: 'Move' })}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
