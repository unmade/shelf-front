import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import {
  isEmailUpdateNotStarted,
  isOTPCodeAlreadySent,
  useChangeEmailCompleteMutation,
  useChangeEmailResendCodeMutation,
} from 'store/accounts';

interface useVerifyEmailProps {
  email: string;
  otpInputName?: string;
}

export function useCompleteEmailChange({ email, otpInputName = 'otp-code' }: useVerifyEmailProps) {
  const { t } = useTranslation('email-verification');

  const [error, setError] = useState<string | null>(null);

  const [verify, { isLoading: verifying }] = useChangeEmailCompleteMutation();
  const [resend, { isLoading: resending }] = useChangeEmailResendCodeMutation();

  const onInputChange = () => {
    setError(null);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const code = (formData.get(otpInputName) ?? '') as string;

    if (!code.length) {
      setError(
        t('email-verification:otp-field.errors.enter-code', {
          defaultValue: 'Please enter the verification code',
        }),
      );
      return;
    }

    try {
      const { completed } = await verify({ email, code }).unwrap();
      if (!completed) {
        setError(
          t('email-verification:otp-field.errors.invalid-or-expired', {
            defaultValue: 'The code is invalid or has expired',
          }),
        );
      }
    } catch (err) {
      if (isEmailUpdateNotStarted(err)) {
        setError(
          t('email-verification:otp-field.errors.start-email-change', {
            defaultValue: 'Please start the email change process first',
          }),
        );
      }
    }
  };

  const onResend = async () => {
    try {
      await resend(undefined).unwrap();
    } catch (err) {
      if (isEmailUpdateNotStarted(err)) {
        setError(
          t('email-verification:otp-field.errors.start-email-change', {
            defaultValue: 'Please start the email change process first',
          }),
        );
      }
      if (isOTPCodeAlreadySent(err)) {
        setError(
          t('email-verification:otp-field.errors.code-already-sent', {
            defaultValue: 'A verification code has already been sent',
          }),
        );
      }
    }
  };

  return { verifying, resending, error, otpInputName, onInputChange, onSubmit, onResend };
}
