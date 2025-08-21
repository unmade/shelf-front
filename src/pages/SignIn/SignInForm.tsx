import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AppLogo } from 'icons';
import * as routes from 'routes';

import { isInvalidCredentials } from 'store/auth';
import { selectFeatureSignUpEnabled } from 'store/features';

import { useAppSelector } from 'hooks';

import Button from 'components/ui/Button';
import Field, { ErrorMessage, Label } from 'components/ui/Field';
import Heading from 'components/ui/Heading';
import Input from 'components/ui/Input';
import { Strong, Text, TextAppLink } from 'components/ui/Text';

import useSignIn from './hooks';

interface Form {
  login: string;
  password: string;
}

interface Errors {
  login?: string;
  password?: string;
  nonfield?: string;
}

export default function SignInForm() {
  const { t } = useTranslation(['translation', 'signin']);

  const [errors, setErrors] = useState<Errors>({});

  const signUpEnabled = useAppSelector(selectFeatureSignUpEnabled);
  const { signIn, loading, error } = useSignIn();

  useEffect(() => {
    if (isInvalidCredentials(error)) {
      setErrors({
        nonfield: t('signin:form.errors.invalidCredentials', {
          defaultValue: 'Invalid username or password',
        }),
      });
    }
  }, [t, error]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name as keyof Form;
    if (name in errors) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [name]: removed_, nonfield, ...rest } = errors;
      setErrors(rest);
    } else if ('nonfield' in errors) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { nonfield: _removed, ...rest } = errors;
      setErrors(rest);
    }
  };

  const validate = (data: Form) => {
    const errors: Errors = {};
    for (const field of Object.keys(data) as (keyof typeof data)[]) {
      if (!data[field]) {
        errors[field] = t('signin:form.errors.requiredField', {
          defaultValue: 'This field is required',
        });
      }
    }

    if (Object.keys(errors).length > 0) {
      setErrors({ ...errors });
      return false;
    }

    return true;
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson: Form = {
      login: (formData.get('login') ?? '') as string,
      password: (formData.get('password') ?? '') as string,
    };

    if (validate(formJson)) {
      signIn(formJson.login, formJson.password);
    }
  };

  return (
    <form className="grid w-full max-w-sm grid-cols-1 gap-8" onSubmit={onSubmitHandler}>
      <div className="relative inline-flex w-full items-center space-x-4">
        <AppLogo className="h-10 w-10" />
        <Heading>
          <span className="text-gray-400 text-shadow-2xs dark:text-zinc-500 dark:shadow-none">
            S H E L F
          </span>
        </Heading>
      </div>
      <Heading>{t('signin:form.title', { defaultValue: 'Sign in to your account' })}</Heading>
      <Field>
        <Label>{t('signin:form.inputs.login.label', { defaultValue: 'Login' })}</Label>
        <Input
          id="login"
          name="login"
          placeholder={t('signin:form.inputs.login.placeholder', {
            defaultValue: 'Email or username',
          })}
          onChange={onInputChange}
        />
        {errors.login && <ErrorMessage>{errors.login}</ErrorMessage>}
      </Field>
      <Field>
        <Label>{t('signin:form.inputs.password.label', { defaultValue: 'Password' })}</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="********"
          onChange={onInputChange}
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        {errors.nonfield && <ErrorMessage>{errors.nonfield}</ErrorMessage>}
      </Field>
      <Button
        type="submit"
        className="mt-4 w-full"
        title={t('signin:form.button.signin.title', 'Sign In')}
        variant="primary"
        disabled={loading || Object.keys(errors).length > 0}
      >
        {t('signin:form.button.signin.title', { defaultValue: 'Sign In' })}
      </Button>
      {signUpEnabled && (
        <Text className="text-center">
          {t('signin:dontHaveAnAccount')}{' '}
          <TextAppLink to={routes.SIGNUP.route}>
            <Strong>{t('signin:signUp', { defaultValue: 'Sign up' })}</Strong>
          </TextAppLink>
        </Text>
      )}
    </form>
  );
}
