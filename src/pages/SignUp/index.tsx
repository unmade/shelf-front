import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import SignUpForm from './SignUpForm';

export default function SignUp() {
  const { t } = useTranslation(['translation', 'signup']);

  return (
    <>
      <Helmet>
        <title>{t('Sign Up')} - Shelf</title>
      </Helmet>
      <div className="flex min-h-svh items-end justify-center bg-white p-2 sm:items-center dark:bg-zinc-900">
        <div className="flex w-full items-center justify-center px-6 pt-6 pb-20 sm:pb-6">
          <SignUpForm />
        </div>
      </div>
    </>
  );
}
