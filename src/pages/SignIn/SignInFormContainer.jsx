import React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { useSignInMutation } from '../../store/auth';

import * as routes from '../../routes';

import SignInForm from './SignInForm';

function SignInFormContainer() {
  const location = useLocation();
  const navigate = useNavigate();

  const [signIn, { isLoading: loading }] = useSignInMutation();

  const onSubmit = async (username, password) => {
    try {
      await signIn({ username, password }).unwrap();
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
