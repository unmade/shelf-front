import React from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useSignUpMutation } from '../../store/auth';
import { tokenRefreshed } from '../../store/authSlice';

import * as routes from '../../routes';

import SignUpForm from './SignUpForm';

function SignUpFormContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signUp, { isLoading: loading }] = useSignUpMutation();

  const onSubmit = async (username, password, confirmPassword) => {
    try {
      const data = await signUp({ username, password, confirmPassword }).unwrap();
      dispatch(tokenRefreshed(data));
    } catch (err) {
      return;
    }
    navigate(routes.FILES.prefix);
  };

  return <SignUpForm onSubmit={onSubmit} loading={loading} />;
}

export default SignUpFormContainer;

SignUpFormContainer.propTypes = {};
