import React from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as routes from 'routes';

import { useSignUpMutation } from 'store/auth';
import { tokenRefreshed } from 'store/authSlice';

import SignUpForm, { IOnSubmitArg } from './SignUpForm';

export default function SignUpFormContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signUp, { isLoading: loading }] = useSignUpMutation();

  const onSubmit = async ({ email, name, password, confirmPassword }: IOnSubmitArg) => {
    try {
      const data = await signUp({ email, name, password, confirmPassword }).unwrap();
      dispatch(tokenRefreshed(data));
    } catch (err) {
      return;
    }
    navigate(routes.FILES.prefix);
  };

  return <SignUpForm onSubmit={onSubmit} loading={loading} />;
}
