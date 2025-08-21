import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import * as icons from 'icons';
import * as routes from 'routes';

import { Strong, Text, TextAppLink } from 'components/ui/Text';

import SignUpFormContainer from './SignUpFormContainer';

export default function SignUp() {
  const { t } = useTranslation(['translation', 'signup']);

  return (
    <>
      <Helmet>
        <title>{t('Sign Up')} - Shelf</title>
      </Helmet>
      <div className="flex min-h-svh items-end justify-center bg-white pb-20 sm:items-center sm:p-0 dark:bg-zinc-900">
        <div className="flex-flex-col m-4 w-full max-w-md">
          <div className="w-full rounded-2xl px-6 pt-12 pb-8">
            <div className="relative inline-flex w-full items-center space-x-4">
              <icons.AppLogo className="h-10 w-10" />
              <h1 className="text-2xl font-bold text-gray-700 dark:text-zinc-200">
                {t('signup:form.title')}
              </h1>
            </div>
            <SignUpFormContainer />
          </div>
          <div className="w-full">
            <Text className="text-center">
              {t('signup:alreadyHaveAnAccount')}{' '}
              <TextAppLink to={routes.SIGNIN.route}>
                <Strong>{t('signup:signInHere')}</Strong>
              </TextAppLink>
            </Text>
          </div>
        </div>
      </div>
    </>
  );
}
