import { Trans, useTranslation } from 'react-i18next';

import { Button } from '@/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/ui/dialog';
import { Strong } from '@/ui/text';

interface Props {
  loading: boolean;
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function EmptyTrashDialog({ loading, open, onConfirm, onCancel }: Props) {
  const { t } = useTranslation();

  const handleOpenChanged = (open: boolean) => {
    if (!open) {
      onCancel();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChanged}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('Empty Trash')}</DialogTitle>
          <DialogDescription>
            <Trans i18nKey="empty_trash_dialog_text_styled" t={t}>
              Are you sure you want to delete
              <Strong className="text-foreground">all</Strong>
              files in the Trash?
            </Trans>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">{t('Cancel')}</Button>
          </DialogClose>
          <Button variant="destructive" onClick={onConfirm} disabled={loading}>
            {t('Empty')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
