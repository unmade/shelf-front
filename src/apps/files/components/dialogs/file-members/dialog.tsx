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

import FileMembersSetting from '@/components/FileMembersSetting';

interface Props {
  fileId?: string;
  open: boolean;
  onClose: () => void;
}

export function FileMembersDialog({ fileId, open, onClose }: Props) {
  const { t } = useTranslation('files');

  const handleOpenChanged = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChanged}>
      <DialogContent className="sm:w-md">
        <DialogHeader>
          <DialogTitle>
            {t('dialogs.fileMembers.title', { defaultValue: 'Share with other members' })}
          </DialogTitle>
        </DialogHeader>
        <DialogBody>{fileId && <FileMembersSetting fileId={fileId} />}</DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button>{t('actions.done', { defaultValue: 'Done' })}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
