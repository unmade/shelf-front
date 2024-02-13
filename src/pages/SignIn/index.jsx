import React from 'react';

import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';

import { useListFeaturesQuery } from '../../store/features';

import * as icons from '../../icons';
import * as routes from '../../routes';

import usePrefersColorScheme from '../../hooks/prefers-color-scheme';

import SignInFormContainer from './SignInFormContainer';

function SignIn() {
  const { t } = useTranslation(['translation', 'signin']);

  usePrefersColorScheme();

  // use useQuery because after sign out the store is completely empty and we need to re-fetch
  // features.
  const { entities } = useListFeaturesQuery(undefined, {
    selectFromResult: ({ data }) => ({ entities: data?.entities ?? {} }),
  });

  const signUpDisabled = entities.sign_up_disabled?.value;

  return (
    <>
      <Helmet>
        <title>{t('Sign In')} - Shelf</title>
      </Helmet>
      <div className="flex min-h-svh items-end justify-center bg-gray-100 pb-20 dark:bg-zinc-900 sm:items-center sm:p-0">
        <div className="flex-flex-col m-4 w-full max-w-md">
          <div className="w-full rounded-2xl bg-white px-6 pb-8 pt-12 shadow dark:bg-zinc-800 sm:m-0">
            <div className="relative inline-flex w-full items-center space-x-4">
              <icons.AppLogo className="h-10 w-10" />
              <h1 className="text-2xl font-bold text-gray-700 dark:text-zinc-200">Shelf</h1>
            </div>
            <SignInFormContainer />
          </div>
          {!signUpDisabled && (
            <div className="mt-6 w-full max-w-md text-gray-700 dark:text-zinc-200">
              <p className="text-center text-sm">
                {t('signin:dontHaveAnAccount')}{' '}
                <Link
                  to={routes.SIGNUP.route}
                  className="inline-flex items-center space-x-1 font-medium text-indigo-600 dark:text-indigo-400"
                >
                  {t('signin:signUpNow')}
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

SignIn.propTypes = {};

export default SignIn;
