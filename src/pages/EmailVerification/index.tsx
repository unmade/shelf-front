import { Helmet } from 'react-helmet-async';
import { Navigate, useNavigate } from 'react-router';

import { useGetCurrentAccountQuery } from 'store/accounts';

import { useDefaultApp } from 'hooks/available-apps';

import EmailVerificationForm from './EmailVerificationForm';

export default function OTPVerification() {
  const navigate = useNavigate();

  const defaultApp = useDefaultApp();

  const { email, verified } = useGetCurrentAccountQuery(undefined, {
    selectFromResult: ({ data }) => ({
      email: data?.email,
      verified: data?.verified,
    }),
  });

  if (!email || verified) {
    return <Navigate to={defaultApp.path} replace />;
  }

  const onSkip = () => {
    navigate(defaultApp.path);
  };

  return (
    <>
      <Helmet>
        <title>Email Verification - Shelf</title>
      </Helmet>

      <div className="flex min-h-svh items-end justify-center bg-white p-2 sm:items-center dark:bg-zinc-900">
        <div className="flex w-full items-center justify-center px-6 pt-6 pb-20 sm:pb-6">
          <EmailVerificationForm email={email!} onSkip={onSkip} />
        </div>
      </div>
    </>
  );
}
