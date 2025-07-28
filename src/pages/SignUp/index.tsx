import React from 'react';

import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import * as icons from 'icons';
import * as routes from 'routes';

import usePrefersColorScheme from 'hooks/prefers-color-scheme';

import SignUpFormContainer from './SignUpFormContainer';

export default function SignUp() {
  const { t } = useTranslation(['translation', 'signup']);

  usePrefersColorScheme();

  return (
    <>
      <Helmet>
        <title>{t('Sign Up')} - Shelf</title>
      </Helmet>
      <div className="flex min-h-svh items-end justify-center bg-gray-100 pb-20 sm:items-center sm:p-0 dark:bg-zinc-900">
        <div className="flex-flex-col m-4 w-full max-w-md">
          <div className="w-full rounded-2xl bg-white px-6 pt-12 pb-8 shadow sm:m-0 dark:bg-zinc-800">
            <div className="relative inline-flex w-full items-center space-x-4">
              <icons.AppLogo className="h-10 w-10" />
              <h1 className="text-2xl font-bold text-gray-700 dark:text-zinc-200">
                {t('signup:form.title')}
              </h1>
            </div>
            <SignUpFormContainer />
          </div>
          <div className="mt-6 w-full text-gray-700 dark:text-zinc-200">
            <p className="text-center text-sm">
              {t('signup:alreadyHaveAnAccount')}{' '}
              <Link
                to={routes.SIGNIN.route}
                className="inline-flex items-center space-x-1 font-medium text-indigo-600 dark:text-indigo-400"
              >
                {t('signup:signInHere')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
