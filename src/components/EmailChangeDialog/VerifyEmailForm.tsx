import React from 'react';

import { useChangeEmailCompleteMutation, useChangeEmailResendCodeMutation } from 'store/accounts';
import { addToast } from 'store/toasts';

import { useAppDispatch } from 'hooks';

import OTPForm from 'components/OTPForm';

interface Props {
  email: string;
  onSubmit: () => void;
}

export default function VerifyEmailForm({ email, onSubmit }: Props) {
  const dispatch = useAppDispatch();

  const [resendCode, { isLoading: resending }] = useChangeEmailResendCodeMutation();
  const [complete, { isLoading: submitting }] = useChangeEmailCompleteMutation();

  const handleSubmit = async (code: string) => {
    try {
      const { completed } = await complete({ email, code }).unwrap();
      if (completed) {
        onSubmit();
      } else {
        dispatch(
          addToast({
            title: 'Invalid code',
            description: "Check the code you've entered is correct",
          }),
        );
      }
    } catch (err) {
      /* empty */
    }
  };

  const handleResend = async () => {
    try {
      await resendCode(undefined).unwrap();
      onSubmit();
    } catch (err) {
      // @ts-expect-error no annotation for error
      const { data } = err;
      if (data.code === 'OTP_CODE_ALREADY_SENT') {
        dispatch(
          addToast({
            title: 'OTP code sent',
            description:
              'Use code that was sent to you or wait until it expire and request a new one',
          }),
        );
      }
    }
  };

  return (
    <OTPForm
      email={email}
      submitting={submitting}
      resending={resending}
      onSubmit={handleSubmit}
      onResend={handleResend}
    />
  );
}
