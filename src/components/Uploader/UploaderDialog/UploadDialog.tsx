import { useTranslation } from 'react-i18next';

import type { UploadEntries, UploadScope } from '@/types/uploads';

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

import { UploadButton } from '@/components/Uploader/UploadButton';

import RecentUploads from '../RecentUploads';

interface Props {
  onFilesAdded: (files: UploadEntries) => void;
  uploadScope: UploadScope;
  open: boolean;
  onCancel: () => void;
}

export default function UploadDialog({ onFilesAdded, uploadScope, open, onCancel }: Props) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('Uploads')}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <RecentUploads uploadScope={uploadScope} />
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">{t('Cancel')}</Button>
          </DialogClose>
          <UploadButton className="w-full" onFilesAdded={onFilesAdded}>
            {t('Browse')}
          </UploadButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
