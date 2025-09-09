import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { useAppSelector } from 'hooks';
import { useDefaultApp } from 'hooks/available-apps';
import * as routes from 'routes';

import { useVerifyEmailSendCodeMutation } from 'store/accounts';
import { useSignUpMutation, type SignUpArgs } from 'store/auth';
import { tokenRefreshed } from 'store/authSlice';
import { selectFeatureVerificationRequired } from 'store/features';

export default function useSignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const defaultApp = useDefaultApp();

  const verificationRequired = useAppSelector(selectFeatureVerificationRequired);

  const [signUp, { isLoading: loading, error }] = useSignUpMutation();
  const [sendCode] = useVerifyEmailSendCodeMutation();

  const onSignUp = async ({ email, name, password, confirmPassword }: SignUpArgs) => {
    try {
      const data = await signUp({ email, name, password, confirmPassword }).unwrap();
      dispatch(tokenRefreshed(data));
    } catch {
      return;
    }

    try {
      if (verificationRequired) {
        await sendCode(undefined).unwrap();
        navigate(routes.EMAIL_VERIFICATION.prefix);
      }
    } catch {
      navigate(defaultApp.path);
    }

    if (!verificationRequired) {
      navigate(defaultApp.path);
    }
  };

  return { signUp: onSignUp, loading, error };
}
