import { useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/ui/dialog';

import { Button } from '@/ui/button';

import FileMembersSetting from '@/components/FileMembersSetting';

interface Props {
  fileId?: string;
  open: boolean;
  onClose: () => void;
}

export function FileMembersDialog({ fileId, open, onClose }: Props) {
  const { t } = useTranslation();

  const handleOpenChanged = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChanged}>
      <DialogContent className="sm:w-md">
        <DialogHeader>
          <DialogTitle>{t('Share with other members')}</DialogTitle>
        </DialogHeader>
        <DialogBody>{fileId && <FileMembersSetting fileId={fileId} />}</DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button>{t('Done')}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
