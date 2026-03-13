import { useTranslation } from 'react-i18next';

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

import { UploadButton } from '@/apps/files/components/upload-button';

import RecentUploads from '../RecentUploads';

interface Props {
  allowedMediaTypes?: string[];
  uploadTo: string;
  open: boolean;
  onCancel: () => void;
}

export default function UploadDialog({ allowedMediaTypes, uploadTo, open, onCancel }: Props) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('Uploads')}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <RecentUploads />
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">{t('Cancel')}</Button>
          </DialogClose>
          <UploadButton
            className="w-full"
            allowedMediaTypes={allowedMediaTypes}
            uploadTo={uploadTo}
          >
            {t('Browse')}
          </UploadButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
