import React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { signIn } from '../../store/actions/auth';
import { signInResetted } from '../../store/actions/ui';
import { getLoading } from '../../store/reducers/loading';
import { SignInState, getSignInState } from '../../store/reducers/ui';

import * as routes from '../../routes';

import SignInForm from './SignInForm';

function SignInFormContainer() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const loading = useSelector((state) => getLoading(state, { actionType: signIn }));
  const state = useSelector(getSignInState);

  React.useEffect(() => {
    if (state === SignInState.signedIn) {
      const redirectUrl = new URLSearchParams(location.search).get('next');
      if (redirectUrl) {
        navigate(redirectUrl);
      } else {
        navigate(routes.FILES.prefix);
      }
    }
    return () => dispatch(signInResetted());
  }, [state, dispatch, navigate, location]);

  const onSubmit = (username, password) => {
    dispatch(signIn(username, password));
  };

  return <SignInForm onSubmit={onSubmit} loading={loading} />;
}

export default SignInFormContainer;

SignInFormContainer.propTypes = {};
