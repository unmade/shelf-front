import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import useDefaultApp from 'hooks/available-apps';

import { useSignInMutation } from 'store/auth';
import { tokenRefreshed } from 'store/authSlice';

export default function useSignIn() {
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const defaultApp = useDefaultApp();

  const [signIn, { isLoading: loading }] = useSignInMutation();

  const onSignIn = async (username: string, password: string) => {
    try {
      const data = await signIn({ username, password }).unwrap();
      dispatch(tokenRefreshed(data));
    } catch {
      return;
    }

    const redirectUrl = new URLSearchParams(location.search).get('next');
    if (redirectUrl) {
      navigate(redirectUrl);
    } else {
      navigate(defaultApp.path);
    }
  };

  return { signIn: onSignIn, loading };
}
