import React from 'react';

import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import useDefaultApp from 'hooks/available-apps';

import { useSignInMutation } from 'store/auth';
import { tokenRefreshed } from 'store/authSlice';

import SignInForm from './SignInForm';

export default function SignInFormContainer() {
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const defaultApp = useDefaultApp();

  const [signIn, { isLoading: loading }] = useSignInMutation();

  const onSubmit = async (username: string, password: string) => {
    try {
      const data = await signIn({ username, password }).unwrap();
      dispatch(tokenRefreshed(data));
    } catch (err) {
      return;
    }

    const redirectUrl = new URLSearchParams(location.search).get('next');
    if (redirectUrl) {
      navigate(redirectUrl);
    } else {
      navigate(defaultApp.path);
    }
  };

  return <SignInForm onSubmit={onSubmit} loading={loading} />;
}
