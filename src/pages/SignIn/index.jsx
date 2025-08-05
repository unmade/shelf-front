import React from 'react';

import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router';

import { useListFeaturesQuery } from 'store/features';

import * as icons from 'icons';
import * as routes from 'routes';

import SignInFormContainer from './SignInFormContainer';

function SignIn() {
  const { t } = useTranslation(['translation', 'signin']);

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
      <div className="flex min-h-svh items-end justify-center bg-gray-100 pb-20 sm:items-center sm:p-0 dark:bg-zinc-900">
        <div className="flex-flex-col m-4 w-full max-w-md">
          <div className="w-full rounded-2xl bg-white px-6 pt-12 pb-8 shadow sm:m-0 dark:bg-zinc-800">
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
