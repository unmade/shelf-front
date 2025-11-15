import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { isEmail } from 'validator';

import {
  isEmailAlreadyTaken,
  isEmailUpdateLimitReached,
  useChangeEmailStartMutation,
} from 'store/accounts';

import Button from 'components/ui/Button';
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogActions,
} from 'components/ui/Dialog';
import { Field, ErrorMessage, Label } from 'components/ui/Field';
import Input from 'components/ui/Input';

interface Props {
  open: boolean;
  onSubmit: (email: string) => void;
  onClose: () => void;
}

export default function SetEmailDialog({ open, onSubmit, onClose }: Props) {
  const { t } = useTranslation('email-verification');

  const [error, setError] = useState<string | null>(null);

  const [changeEmailStart, { isLoading: changing }] = useChangeEmailStartMutation();

  const onInputChange = () => {
    setError(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = (formData.get('email') ?? '') as string;

    if (!isEmail(email)) {
      setError(
        t('email-verification:dialogs.set-email.errors.invalid-email', {
          defaultValue: 'Please enter a valid email address',
        }),
      );
      return;
    }

    try {
      await changeEmailStart(email).unwrap();
      onSubmit(email);
    } catch (err) {
      if (isEmailAlreadyTaken(err)) {
        setError(
          t('email-verification:dialogs.set-email.errors.email-already-exists', {
            defaultValue: 'This email address is already taken',
          }),
        );
        return;
      }
      if (isEmailUpdateLimitReached(err)) {
        setError(
          t('email-verification:dialogs.set-email.errors.email-update-limit-reached', {
            defaultValue:
              'You have reached the limit for changing your email address. Please try again later',
          }),
        );
        return;
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {t('email-verification:dialogs.set-email.title', { defaultValue: 'Change Email' })}
      </DialogTitle>
      <DialogDescription>
        {t('email-verification:dialogs.set-email.description', {
          defaultValue:
            'Enter your new email address below. A verification code will be sent to this address',
        })}
      </DialogDescription>
      <form onSubmit={handleSubmit}>
        <DialogBody>
          <Field>
            <Label>
              {t('email-verification:dialogs.set-email.email-label', {
                defaultValue: 'E-mail address',
              })}
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder={t('email-verification:dialogs.set-email.email-placeholder', {
                defaultValue: 'e.g. user@example.com',
              })}
              invalid={!!error}
              onChange={onInputChange}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </Field>
        </DialogBody>
        <DialogActions>
          <Button variant="plain" color="gray" onClick={onClose}>
            {t('email-verification:dialogs.set-email.skip-button', { defaultValue: 'Skip' })}
          </Button>
          <Button type="submit" variant="primary" disabled={changing || error != null}>
            {t('email-verification:dialogs.set-email.continue-button', {
              defaultValue: 'Continue',
            })}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
