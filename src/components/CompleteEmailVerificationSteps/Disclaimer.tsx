import { useTranslation } from 'react-i18next';

import { isOTPCodeAlreadySent, useVerifyEmailSendCodeMutation } from 'store/accounts';

import Button from 'components/ui/Button';
import { Dialog, DialogActions, DialogDescription, DialogTitle } from 'components/ui/Dialog';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export default function Disclaimer({ open, onClose, onSubmit }: Props) {
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
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {t('email-verification:dialogs.disclaimer.title', { defaultValue: 'Email Verification' })}
      </DialogTitle>
      <DialogDescription>
        {t('email-verification:dialogs.disclaimer.description', {
          defaultValue: 'Verify your email address to access all features',
        })}
      </DialogDescription>

      <DialogActions>
        <Button variant="plain" color="gray" onClick={onClose}>
          {t('email-verification:dialogs.disclaimer.skip-button', { defaultValue: 'Skip' })}
        </Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {t('email-verification:dialogs.disclaimer.continue-button', { defaultValue: 'Continue' })}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
