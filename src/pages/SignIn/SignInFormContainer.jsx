import React from 'react';

import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { useSignInMutation } from '../../store/auth';
import { tokenRefreshed } from '../../store/authSlice';

import * as routes from '../../routes';

import SignInForm from './SignInForm';

function SignInFormContainer() {
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [signIn, { isLoading: loading }] = useSignInMutation();

  const onSubmit = async (username, password) => {
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
      navigate(routes.FILES.prefix);
    }
  };

  return <SignInForm onSubmit={onSubmit} loading={loading} />;
}

export default SignInFormContainer;

SignInFormContainer.propTypes = {};
