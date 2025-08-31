import { useEffect, useState } from 'react';

import { Trans, useTranslation } from 'react-i18next';
import { isEmail, isStrongPassword } from 'validator';

import { TERMS_AND_CONDITION_URL, PRIVACY_POLICY_URL } from 'constants';
import * as routes from 'routes';

import Button from 'components/ui/Button';
import Checkbox, { CheckboxField } from 'components/ui/Checkbox';
import Field, { ErrorMessage, Label } from 'components/ui/Field';
import Heading from 'components/ui/Heading';
import Input from 'components/ui/Input';
import { Strong, Text, TextAppLink, TextLink } from 'components/ui/Text';

import AppLogo from 'components/AppLogo';

import useSignUp from './hooks';
import { isSignUpDisabled, isUserAlreadyExists } from 'store/auth';

const nameRegEx = /^[\p{L} .'-]+$/u;

const strongPasswordOptions = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 0,
};

interface Form {
  name: string;
  email: string;
  password: string;
  agreeToTermsAndConditions: string;
}

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  agreeToTermsAndConditions?: string;
  nonfield?: string;
}

export default function SignUpForm() {
  const { t } = useTranslation(['translation', 'signup', 'forms']);

  const [errors, setErrors] = useState<Errors>({});

  const { signUp, loading, error } = useSignUp();

  useEffect(() => {
    if (isSignUpDisabled(error)) {
      setErrors({
        nonfield: t('signup:form.errors.signUpDisabled', {
          defaultValue: 'Sign up is currently disabled',
        }),
      });
    }
    if (isUserAlreadyExists(error)) {
      setErrors({
        nonfield: t('signup:form.errors.userAlreadyExists', {
          defaultValue: 'User with this email already exists',
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

  const onCheckboxChange = () => {
    if ('agreeToTermsAndConditions' in errors) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { agreeToTermsAndConditions: _removed, nonfield, ...rest } = errors;
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
        errors[field] = t('This field is required');
      }
    }

    // check agreed to terms and conditions
    if (data.agreeToTermsAndConditions === '') {
      errors.agreeToTermsAndConditions = t(
        'signup:form.errors.agreeToTermsAndConditionsUnchecked',
        {
          defaultValue: 'You must accept Shelf Terms and Privacy Policy to register an account',
        },
      );
    }

    const name = data.name.trim();
    if (!nameRegEx.test(name)) {
      errors.name = t('signup:form.errors.invalidName', {
        defaultValue: 'Name can only contain letters, spaces, hyphens, and apostrophes',
      });
    }

    if (name.length < 2) {
      errors.name = t('signup:form.errors.nameTooShort', {
        defaultValue: 'Name must be at least 2 characters long',
      });
    }

    if (name.length < 2 || name.length > 100) {
      errors.name = t('signup:form.errors.nameTooLong', {
        defaultValue: 'Name must be 2 to 100 character long',
      });
    }

    const email = data.email.trim();
    if (!isEmail(email)) {
      errors.email = t('signup:form.errors.invalidEmail', {
        defaultValue: 'Invalid email address',
      });
    }

    const { password } = data;
    if (password.length > 63) {
      errors.password = t('signup:form.errors.passwordTooLong', {
        minLength: 8,
        maxLength: 63,
        defaultValue: 'Password should be {{minLength}} to {{maxLength}} character long',
      });
    }

    // check password is strong enough
    if (!isStrongPassword(password, strongPasswordOptions)) {
      errors.password = t('signup:form.errors.weakPassword', {
        defaultValue:
          'Password must be at least 8 characters including a lowercase letter, an uppercase letter, and a number',
      });
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return false;
    }
    return true;
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson: Form = {
      name: (formData.get('name') ?? '') as string,
      email: (formData.get('email') ?? '') as string,
      password: (formData.get('password') ?? '') as string,
      agreeToTermsAndConditions: (formData.get('agreeToTermsAndConditions') ?? '') as string,
    };

    if (validate(formJson)) {
      signUp({
        name: formJson.name,
        email: formJson.email,
        password: formJson.password,
        confirmPassword: formJson.password,
      });
    }
  };

  return (
    <form className="grid w-full max-w-sm grid-cols-1 gap-8" onSubmit={onSubmitHandler}>
      <AppLogo />
      <Heading>{t('signup:form.title', { defaultValue: 'Create your account' })}</Heading>
      <Field>
        <Label>{t('signup:form.inputs.name.label', { defaultValue: 'Full name' })}</Label>
        <Input
          id="name"
          name="name"
          placeholder={t('signup:form.inputs.name.placeholder', { defaultValue: 'Name' })}
          onChange={onInputChange}
        />
        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
      </Field>
      <Field>
        <Label>{t('signup:form.inputs.email.label', { defaultValue: 'Email' })}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder={t('signup:form.inputs.email.placeholder', { defaultValue: 'Email' })}
          onChange={onInputChange}
        />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
      </Field>
      <Field>
        <Label>{t('signup:form.inputs.password.label', { defaultValue: 'Password' })}</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="********"
          onChange={onInputChange}
        />
        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
      </Field>
      <CheckboxField>
        <Checkbox
          name="agreeToTermsAndConditions"
          defaultChecked={false}
          onChange={onCheckboxChange}
        />
        <Label>
          <Trans as={Text} i18nKey="signup:form.iHaveReadAndAgreeToTermsAndConditions" t={t}>
            I agree to the {}
            <TextLink href={TERMS_AND_CONDITION_URL}>Shelf Terms</TextLink> and{' '}
            <TextLink href={PRIVACY_POLICY_URL}>Privacy Policy</TextLink>
          </Trans>
        </Label>
        {errors.agreeToTermsAndConditions && (
          <ErrorMessage>{errors.agreeToTermsAndConditions}</ErrorMessage>
        )}
        {errors.nonfield && <ErrorMessage>{errors.nonfield}</ErrorMessage>}
      </CheckboxField>
      <Button
        type="submit"
        className="mt-4 w-full"
        title={t('signup:form.button.title', { defaultValue: 'Create an account' })}
        variant="primary"
        disabled={loading}
      >
        {t('signup:form.button.title', { defaultValue: 'Create an account' })}
      </Button>
      <Text className="text-center">
        {t('signup:alreadyHaveAnAccount')}{' '}
        <TextAppLink to={routes.SIGNIN.route}>
          <Strong>{t('signup:signInHere')}</Strong>
        </TextAppLink>
      </Text>
    </form>
  );
}
