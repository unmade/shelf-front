import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router';

import * as icons from 'icons';
import * as routes from 'routes';

import OTPFormContainer from './OTPFormContainer';

export default function OTPVerification() {
  return (
    <>
      <Helmet>
        <title>Email Verification - Shelf</title>
      </Helmet>
      <div className="flex min-h-svh items-end justify-center bg-gray-100 pb-20 text-gray-700 sm:items-center sm:p-0 dark:bg-zinc-900 dark:text-zinc-200">
        <div className="m-4 flex w-full max-w-md flex-col">
          <div className="w-full rounded-2xl bg-white px-6 pt-8 pb-8 shadow sm:m-0 dark:bg-zinc-800">
            <div className="relative w-full text-center">
              <icons.AppLogo className="mx-auto h-10 w-10" />
              <h1 className="mt-1 text-xl font-light">Shelf Cloud</h1>
            </div>
            <div className="mt-6">
              <OTPFormContainer />
            </div>
          </div>
          <div className="mt-6 w-full text-gray-700 dark:text-zinc-200">
            <p className="text-center text-sm">
              <Link
                to={routes.PHOTOS.route}
                className="inline-flex items-center space-x-1 font-medium text-indigo-600 dark:text-indigo-400"
              >
                Skip for now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
