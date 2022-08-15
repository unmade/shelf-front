import React from 'react';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import * as icons from '../../icons';
import * as routes from '../../routes';

import Toast from '../../containers/Toast';
import ToastItem from '../../containers/ToastItem';

import SignUpFormContainer from './SignUpFormContainer';

function SignUp() {
  const { t } = useTranslation(['translation', 'signup']);

  return (
    <>
      <div className="flex min-h-screen items-end justify-center bg-gray-100 pb-20 sm:items-center sm:p-0">
        <div className="flex-flex-col m-4 w-full max-w-md">
          <div className="w-full rounded-2xl bg-white px-6 pb-8 pt-12 shadow sm:m-0">
            <div className="relative inline-flex w-full items-center space-x-4">
              <icons.AppLogo className="h-10 w-10 text-gray-600" />
              <h1 className="text-2xl font-bold text-gray-700">{t('signup:form.title')}</h1>
            </div>
            <SignUpFormContainer />
          </div>
          <div className="mt-6 w-full text-gray-700">
            <p className="text-center text-sm">
              {t('signup:alreadyHaveAnAccount')}{' '}
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link
                to={routes.SIGNIN.route}
                className="inline-flex items-center space-x-1 font-medium text-indigo-600"
              >
                {t('signup:signInHere')}
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Toast itemRender={ToastItem} />
    </>
  );
}

export default SignUp;

SignUp.propTypes = {};