import React from 'react';

import { useNavigate } from 'react-router-dom';

import * as routes from 'routes';

import { useGetCurrentAccountQuery } from 'store/accounts';
import { addToast } from 'store/toasts';
import { useSendEmailVerificationCodeMutation, useVerifyEmailMutation } from 'store/users';

import { useAppDispatch } from 'hooks';

import OTPForm from 'components/OTPForm';

interface Props {
  onSubmit: () => void;
}

export default function VerifyEmailForm({ onSubmit }: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { email, verified } = useGetCurrentAccountQuery(undefined, {
    selectFromResult: ({ data }) => ({
      email: data?.email,
      verified: data?.verified,
    }),
  });

  const [sendCode, { isLoading: resending }] = useSendEmailVerificationCodeMutation();
  const [verifyEmail, { isLoading: submitting }] = useVerifyEmailMutation();

  if (verified) {
    navigate(routes.PHOTOS.prefix);
  }

  const handleSubmit = async (code: string) => {
    try {
      const { verified: success } = await verifyEmail(code).unwrap();
      if (success) {
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
