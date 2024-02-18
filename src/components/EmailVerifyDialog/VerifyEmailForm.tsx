import React from 'react';

import { useNavigate } from 'react-router-dom';

import useDefaultApp from 'hooks/available-apps';

import {
  useGetCurrentAccountQuery,
  useVerifyEmailCompleteMutation,
  useVerifyEmailSendCodeMutation,
} from 'store/accounts';
import { addToast } from 'store/toasts';

import { useAppDispatch } from 'hooks';

import OTPForm from 'components/OTPForm';

interface Props {
  onSubmit: () => void;
}

export default function VerifyEmailForm({ onSubmit }: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const defaultApp = useDefaultApp();

  const { email, verified } = useGetCurrentAccountQuery(undefined, {
    selectFromResult: ({ data }) => ({
      email: data?.email,
      verified: data?.verified,
    }),
  });

  const [sendCode, { isLoading: resending }] = useVerifyEmailSendCodeMutation();
  const [verifyEmail, { isLoading: submitting }] = useVerifyEmailCompleteMutation();

  if (verified) {
    navigate(defaultApp.path);
  }

  const handleSubmit = async (code: string) => {
    try {
      const { completed } = await verifyEmail(code).unwrap();
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
      await sendCode(undefined).unwrap();
    } catch (err) {
      /* empty */
    }
  };

  return (
    <OTPForm
      submitting={submitting}
      resending={resending}
      email={email!}
      onSubmit={handleSubmit}
      onResend={handleResend}
    />
  );
}
