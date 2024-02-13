import React from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from 'hooks';
import * as routes from 'routes';

import { useVerifyEmailSendCodeMutation } from 'store/accounts';
import { useSignUpMutation } from 'store/auth';
import { tokenRefreshed } from 'store/authSlice';
import { selectFeatureVerificationRequired } from 'store/features';

import SignUpForm, { IOnSubmitArg } from './SignUpForm';

export default function SignUpFormContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const verificationRequired = useAppSelector(selectFeatureVerificationRequired);

  const [signUp, { isLoading: loading }] = useSignUpMutation();
  const [sendCode] = useVerifyEmailSendCodeMutation();

  const onSubmit = async ({ email, name, password, confirmPassword }: IOnSubmitArg) => {
    try {
      const data = await signUp({ email, name, password, confirmPassword }).unwrap();
      dispatch(tokenRefreshed(data));
    } catch (err) {
      return;
    }

    try {
      if (verificationRequired) {
        await sendCode(undefined).unwrap();
      }
    } catch (err) {
      // empty
    }

    if (verificationRequired) {
      navigate(routes.EMAIL_VERIFICATION.prefix);
    } else {
      navigate(routes.PHOTOS.prefix);
    }
  };

  return <SignUpForm onSubmit={onSubmit} loading={loading} />;
}
