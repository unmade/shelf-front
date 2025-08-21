import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import SignInForm from './SignInForm';

export default function SignIn() {
  const { t } = useTranslation(['translation', 'signin']);

  return (
    <>
      <Helmet>
        <title>{t('Sign In')} - Shelf</title>
      </Helmet>
      <div className="flex min-h-svh items-end justify-center bg-white p-2 sm:items-center dark:bg-zinc-900">
        <div className="flex w-full items-center justify-center px-6 pt-6 pb-20 sm:pb-6">
          <SignInForm />
        </div>
      </div>
    </>
  );
}
