import { useTranslation } from 'react-i18next';
import Button from 'components/ui/Button';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from 'components/ui/Dialog';
import { Strong } from 'components/ui/Text';

import { OTPField } from './OTPField';

interface Props {
  email: string;
  error: string | null;
  open: boolean;
  otpInputName?: string;
  verifying: boolean;
  resending: boolean;
  onClose: () => void;
  onInputChange: () => void;
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
  onClose,
  onInputChange,
  onSubmit,
  onResend,
}: Props) {
  const { t } = useTranslation('email-verification');
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {t('email-verification:dialogs.verify-email.title', { defaultValue: 'Email Verification' })}
      </DialogTitle>
      <DialogDescription>
        {t('email-verification:dialogs.verify-email.description', {
          defaultValue: "We've sent a code to",
        })}{' '}
        <Strong>{email}</Strong>
      </DialogDescription>
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
        <DialogActions>
          <Button variant="plain" color="gray" onClick={onClose}>
            {t('email-verification:dialogs.verify-email.skip-button', { defaultValue: 'Skip' })}
          </Button>
          <Button type="submit" disabled={verifying}>
            {t('email-verification:dialogs.verify-email.verify-button', { defaultValue: 'Verify' })}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
