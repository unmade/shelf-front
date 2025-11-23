import { Trans, useTranslation } from 'react-i18next';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/ui/dialog';
import { Button } from '@/ui/button';
import { Strong } from '@/ui/text';

interface Props {
  names: string[];
  loading: boolean;
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function DeleteImmediatelyDialog({
  names,
  loading,
  open,
  onConfirm,
  onClose,
}: Props) {
  const { t } = useTranslation();

  const count = names.length;
  const fileName = names[0];

  const dialogText =
    names.length === 1 ? (
      <Trans i18nKey="delete_immediately_dialog_text" t={t} values={{ fileName }}>
        Are you sure you want to
        <Strong>permanently</Strong>
        delete
        <Strong className="text-foreground">{fileName}</Strong>?
      </Trans>
    ) : (
      <Trans i18nKey="delete_immediately_dialog_batch_text" t={t} count={count}>
        Are you sure you want to
        <Strong>permanently</Strong>
        delete
        <Strong className="text-foreground">{count}</Strong>?
      </Trans>
    );

  const handleOpenChanged = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChanged}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('delete_immediately_dialog_title', { count })}</DialogTitle>
          <DialogDescription>{dialogText}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={loading}>{t('Cancel')}</Button>
          </DialogClose>
          <Button disabled={loading} onClick={onConfirm}>
            {t('Delete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
