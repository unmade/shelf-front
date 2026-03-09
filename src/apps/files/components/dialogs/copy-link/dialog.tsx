import { useTranslation } from 'react-i18next';

import type { IFile } from '@/types/files';

import { useAppSelector } from '@/hooks';

import { selectIsSuperuser } from '@/store/accounts';
import { selectFeatureSharedLinksEnabled } from '@/store/features';

import { Button } from '@/ui/button';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/ui/dialog';

import SharedLinkSetting from '@/components/SharedLinkSetting';

interface Props {
  file: IFile | null;
  open: boolean;
  onClose: () => void;
}

export function CopyLinkDialog({ file, open, onClose }: Props) {
  const { t } = useTranslation('files');

  const superuser = useAppSelector(selectIsSuperuser);
  const sharingEnabled = useAppSelector(selectFeatureSharedLinksEnabled);

  const canShare = sharingEnabled || superuser;

  const handleOpenChanged = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const onConfirm = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChanged}>
      <DialogContent className="sm:min-w-md">
        <DialogHeader>
          <DialogTitle>
            {t('dialogs.copyLink.title', { defaultValue: 'Share read-only link' })}
          </DialogTitle>
          <DialogDescription>
            {!canShare
              ? t('dialogs.copyLink.sharingDisabled', {
                  defaultValue: 'Sharing is temporarily disabled for your account',
                })
              : null}
          </DialogDescription>
        </DialogHeader>
        <DialogBody>{canShare && file && <SharedLinkSetting file={file} />}</DialogBody>
        <DialogFooter>
          <Button onClick={onConfirm}>{t('actions.done', { defaultValue: 'Done' })}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
