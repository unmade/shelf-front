import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { signUp } from '../../store/actions/auth';
import { signUpResetted } from '../../store/actions/ui';
import { getLoading } from '../../store/reducers/loading';
import { SignUpState, getSignUpState } from '../../store/reducers/ui';

import * as routes from '../../routes';

import SignUpForm from './SignUpForm';

function SignUpFormContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => getLoading(state, { actionType: signUp }));
  const state = useSelector(getSignUpState);

  React.useEffect(() => {
    if (state === SignUpState.signedUp) {
      navigate(routes.FILES.prefix);
    }
    return () => dispatch(signUpResetted());
  }, [state, dispatch, navigate]);

  const onSubmit = (username, password, confirmPassword) => {
    dispatch(signUp(username, password, confirmPassword));
  };

  return <SignUpForm onSubmit={onSubmit} loading={loading} />;
}

export default SignUpFormContainer;

SignUpFormContainer.propTypes = {};
