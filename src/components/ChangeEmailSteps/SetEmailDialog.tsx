import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { isEmail } from 'validator';

import {
  isEmailAlreadyTaken,
  isEmailUpdateLimitReached,
  useChangeEmailStartMutation,
} from 'store/accounts';

import { Button } from '@/ui/button';
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/ui/dialog';
import { Field, FieldError, FieldLabel } from '@/ui/field';
import { Input } from '@/ui/input';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (email: string) => void;
}

export default function SetEmailDialog({ open, onOpenChange, onSubmit }: Props) {
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:w-md">
        <DialogHeader>
          <DialogTitle>
            {t('email-verification:dialogs.set-email.title', { defaultValue: 'Change Email' })}
          </DialogTitle>
          <DialogDescription>
            {t('email-verification:dialogs.set-email.description', {
              defaultValue:
                'Enter your new email address below. A verification code will be sent to this address',
            })}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <DialogBody>
            <Field data-invalid={!!error}>
              <FieldLabel>
                {t('email-verification:dialogs.set-email.email-label', {
                  defaultValue: 'E-mail address',
                })}
              </FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={t('email-verification:dialogs.set-email.email-placeholder', {
                  defaultValue: 'e.g. user@example.com',
                })}
                aria-invalid={!!error}
                onChange={onInputChange}
              />
              {error && <FieldError>{error}</FieldError>}
            </Field>
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">
                {t('email-verification:dialogs.set-email.skip-button', { defaultValue: 'Skip' })}
              </Button>
            </DialogClose>
            <Button type="submit" disabled={changing || error != null}>
              {t('email-verification:dialogs.set-email.continue-button', {
                defaultValue: 'Continue',
              })}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
