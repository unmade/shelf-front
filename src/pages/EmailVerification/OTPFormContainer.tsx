import React from 'react';

import { useNavigate } from 'react-router-dom';

import * as routes from 'routes';

import { useGetCurrentAccountQuery } from 'store/accounts';
import { addToast } from 'store/toasts';
import { useSendEmailVerificationCodeMutation, useVerifyEmailMutation } from 'store/users';

import { useAppDispatch } from 'hooks';

import OTPForm from 'components/OTPForm';

export default function OTPFormContainer() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { email, email_verified: emailVerified } = useGetCurrentAccountQuery(undefined, {
    selectFromResult: ({ data }) => ({
      email: data?.email,
      email_verified: data?.email_verified,
    }),
  });

  const [sendCode, { isLoading: resending }] = useSendEmailVerificationCodeMutation();
  const [verifyEmail, { isLoading: submitting }] = useVerifyEmailMutation();

  if (emailVerified) {
    navigate(routes.PHOTOS.prefix);
  }

  const onSubmit = async (code: string) => {
    try {
      const { verified } = await verifyEmail(code).unwrap();
      if (verified) {
        navigate(routes.PHOTOS.prefix);
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
  const onResend = async () => {
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
      onSubmit={onSubmit}
      onResend={onResend}
    />
  );
}
