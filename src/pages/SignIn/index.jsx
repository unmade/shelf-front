import React from 'react';

import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';

import * as icons from '../../icons';
import * as routes from '../../routes';

import Toast from '../../containers/Toast';
import ToastItem from '../../containers/ToastItem';

import SignInFormContainer from './SignInFormContainer';

function SignIn() {
  const { t } = useTranslation(['translation', 'signin']);

  return (
    <>
      <div className="flex min-h-screen items-end justify-center bg-gray-100 pb-20 sm:items-center sm:p-0">
        <div className="flex-flex-col m-4 w-full max-w-md">
          <div className="w-full rounded-2xl bg-white px-6 pt-12 pb-8 shadow sm:m-0">
            <div className="relative inline-flex w-full items-center space-x-4">
              <icons.AppLogo className="h-10 w-10 text-gray-600" />
              <h1 className="text-2xl font-bold text-gray-700">Shelf</h1>
            </div>
            <SignInFormContainer />
          </div>
          <div className="mt-6 w-full max-w-md text-gray-700">
            <p className="text-center text-sm">
              {t('signin:dontHaveAnAccount')}{' '}
              <Link
                to={routes.SIGNUP.route}
                className="inline-flex items-center space-x-1 font-medium text-indigo-600"
              >
                {t('signin:signUpNow')}
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Toast itemRender={ToastItem} />
    </>
  );
}

SignIn.propTypes = {};

export default SignIn;