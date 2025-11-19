import { useTranslation } from 'react-i18next';

import { Button } from '@/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogBody,
  DialogClose,
} from '@/ui/dialog';
import { Strong } from '@/ui/text';

import { OTPField } from './OTPField';

interface Props {
  email: string;
  error: string | null;
  open: boolean;
  otpInputName?: string;
  verifying: boolean;
  resending: boolean;
  onInputChange: () => void;
  onOpenChange: (open: boolean) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onResend: () => void;
}

export function VerifyEmailDialog({
  email,
  error,
  open,
  otpInputName,
  verifying,
  resending,
  onInputChange,
  onOpenChange,
  onSubmit,
  onResend,
}: Props) {
  const { t } = useTranslation('email-verification');
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:w-md">
        <DialogHeader>
          <DialogTitle>
            {t('email-verification:dialogs.verify-email.title', {
              defaultValue: 'Email Verification',
            })}
          </DialogTitle>
          <DialogDescription>
            {t('email-verification:dialogs.verify-email.description', {
              defaultValue: "We've sent a code to",
            })}{' '}
            <Strong>{email}</Strong>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <DialogBody>
            <OTPField
              name={otpInputName}
              error={error}
              onInputChange={onInputChange}
              onResend={onResend}
              resending={resending}
            />
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">
                {t('email-verification:dialogs.verify-email.skip-button', { defaultValue: 'Skip' })}
              </Button>
            </DialogClose>
            <Button type="submit" disabled={verifying}>
              {t('email-verification:dialogs.verify-email.verify-button', {
                defaultValue: 'Verify',
              })}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
