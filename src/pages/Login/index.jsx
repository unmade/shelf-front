import React from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import { getIsAuthenticated } from '../../store/reducers/auth';

import * as icons from '../../icons';
import * as routes from '../../routes';

import Toast from '../../containers/Toast';
import ToastItem from '../../containers/ToastItem';

import LoginForm from './LoginForm';

function Login() {
  const { t } = useTranslation(['translation', 'login']);

  const navigate = useNavigate();
  const location = useLocation();
  const authenticated = useSelector(getIsAuthenticated);

  React.useEffect(() => {
    if (authenticated) {
      const redirectUrl = new URLSearchParams(location.search).get('next');
      if (redirectUrl) {
        navigate(redirectUrl);
      } else {
        navigate('/files');
      }
    }
  }, [authenticated, navigate, location]);

  return (
    <>
      <div className="flex min-h-screen items-end justify-center bg-gray-100 pb-20 sm:items-center sm:p-0">
        <div className="flex-flex-col m-4 w-full max-w-md">
          <div className="w-full rounded-2xl bg-white px-6 pt-12 pb-8 shadow sm:m-0">
            <div className="relative inline-flex w-full items-center space-x-4">
              <icons.AppLogo className="h-10 w-10 text-gray-600" />
              <h1 className="text-2xl font-bold text-gray-700">Shelf</h1>
            </div>
            <LoginForm />
          </div>
          <div className="mt-6 w-full max-w-md text-gray-700">
            <p className="text-center text-sm">
              {t('login:dontHaveAnAccount')}{' '}
              <Link
                to={routes.SIGNUP.route}
                className="inline-flex items-center space-x-1 font-medium text-indigo-600"
              >
                <span>{t('login:signUpNow')} </span>
                <span>
                  <icons.ExternalLink className="w5 h-5" />
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Toast itemRender={ToastItem} />
    </>
  );
}

Login.propTypes = {};

export default Login;
