import { useTranslation } from 'react-i18next';

import type { IFile } from '@/types/files';

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
import { FileSize } from '@/ui/filesize';
import { TimeAgo } from '@/ui/timeago';

import Exif from 'components/Exif';

import Categories from '../Categories';

interface Props {
  file: IFile | null;
  open: boolean;
  onClose: () => void;
}

export default function InformationDialog({ file, open, onClose }: Props) {
  const { t } = useTranslation('photos');

  const handleOpenChanged = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChanged}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{file?.name ?? ''}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <div className="flex">
            <div className="mr-4 w-full min-w-0 text-gray-800 dark:text-zinc-200">
              <p className="text-xs font-medium text-gray-500 dark:text-zinc-400">
                <FileSize bytes={file?.size ?? 0} />
              </p>
            </div>
          </div>

          <div className="pt-4">
            <p className="mb-1 px-2 text-left text-gray-800 dark:text-zinc-100">
              <TimeAgo value={file?.modified_at ?? 0} format="LLLL" />
            </p>
            {file && <Exif fileId={file.id} />}
            <div className="mt-6">{file && <Categories fileId={file.id} />}</div>
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button>
              {t('photos:dialogs.information.actions.close', { defaultValue: 'Close' })}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
