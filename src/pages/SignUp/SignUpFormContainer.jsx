import React from 'react';

import { useNavigate } from 'react-router-dom';

import { useSignUpMutation } from '../../store/auth';

import * as routes from '../../routes';

import SignUpForm from './SignUpForm';

function SignUpFormContainer() {
  const navigate = useNavigate();

  const [signUp, { isLoading: loading }] = useSignUpMutation();

  const onSubmit = async (username, password, confirmPassword) => {
    try {
      await signUp({ username, password, confirmPassword }).unwrap();
    } catch (err) {
      return;
    }
    navigate(routes.FILES.prefix);
  };

  return <SignUpForm onSubmit={onSubmit} loading={loading} />;
}

export default SignUpFormContainer;

SignUpFormContainer.propTypes = {};
