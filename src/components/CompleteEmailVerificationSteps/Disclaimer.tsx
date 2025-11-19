import { useTranslation } from 'react-i18next';

import { isOTPCodeAlreadySent, useVerifyEmailSendCodeMutation } from 'store/accounts';

import { Button } from '@/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from '@/ui/dialog';
import { DialogClose } from '@radix-ui/react-dialog';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
}

export default function Disclaimer({ open, onOpenChange, onSubmit }: Props) {
  const { t } = useTranslation('email-verification');

  const [sendCode, { isLoading: loading }] = useVerifyEmailSendCodeMutation();

  const handleSubmit = async () => {
    try {
      await sendCode(undefined).unwrap();
      onSubmit();
    } catch (err) {
      if (isOTPCodeAlreadySent(err)) {
        onSubmit();
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:w-md">
        <DialogHeader>
          <DialogTitle>
            {t('email-verification:dialogs.disclaimer.title', {
              defaultValue: 'Email Verification',
            })}
          </DialogTitle>
          <DialogDescription>
            {t('email-verification:dialogs.disclaimer.description', {
              defaultValue: 'Verify your email address to access all features',
            })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">
              {t('email-verification:dialogs.disclaimer.skip-button', { defaultValue: 'Skip' })}
            </Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={loading}>
            {t('email-verification:dialogs.disclaimer.continue-button', {
              defaultValue: 'Continue',
            })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
