import React from 'react';
import PropTypes from 'prop-types';

import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import validator from 'validator';

import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const strongPasswordOptions = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 0,
};

function SignUpForm({ loading, onSubmit }) {
  const { t } = useTranslation(['translation', 'signup', 'forms']);

  const [inputs, setInputs] = React.useState({
    username: null,
    password: null,
    confirmPassword: null,
    agreeToTermsAndConditions: false,
  });
  const [errors, setErrors] = React.useState({});

  const onInputChange = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
    if (errors[event.target.name]) {
      setErrors({
        ...errors,
        [event.target.name]: null,
      });
    }
  };

  const onCheckboxChange = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.checked,
    });
    if (errors[event.target.name]) {
      setErrors({
        ...errors,
        [event.target.name]: null,
      });
    }
  };

  const isValid = () => {
    // check all fields are set
    const emptyFields = {};
    Object.entries(inputs).forEach(([field, value]) => {
      if (value == null || value === '') {
        emptyFields[field] = t('This field is required');
      }
    });

    // check agreed to terms and conditions
    if (!inputs.agreeToTermsAndConditions) {
      emptyFields.agreeToTermsAndConditions = t(
        'signup:form.errors.agreeToTermsAndConditionsUnchecked'
      );
    }

    if (Object.keys(emptyFields).length > 0) {
      setErrors({ ...errors, ...emptyFields });
      return false;
    }

    // check username length
    if (inputs.username?.length < 3) {
      setErrors({ ...errors, username: t('signup:weakUsername') });
      return false;
    }

    if (inputs.username?.length > 31) {
      setErrors({
        ...errors,
        username: t('signup:usernameTooLong', { minLength: 3, maxLength: 31 }),
      });
    }

    if (inputs.password?.length > 63) {
      setErrors({
        ...errors,
        password: t('signup:passwordTooLong', { minLength: 8, maxLength: 63 }),
      });
    }

    // check username contains only alphanum characters
    if (!validator.isAlphanumeric(inputs.username)) {
      setErrors({ ...errors, username: t('signup:weakUsername') });
      return false;
    }

    // check password is strong enough
    if (!validator.isStrongPassword(inputs.password, strongPasswordOptions)) {
      setErrors({ ...errors, password: t('signup:weakPassword') });
      return false;
    }

    // check passwords match
    if (inputs.confirmPassword !== inputs.password) {
      setErrors({
        ...errors,
        confirmPassword: t('signup:form.errors.passwordsShouldMatch'),
      });
      return false;
    }

    return true;
  };

  const submit = () => {
    if (isValid()) {
      const { username, password, confirmPassword } = inputs;
      onSubmit(username, password, confirmPassword);
    }
  };

  return (
    <form
      className="mt-5 space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      <Input
        id="username"
        name="username"
        label={t('Username')}
        placeholder={t('Username')}
        error={errors?.username}
        onChange={onInputChange}
      />
      <Input
        id="password"
        name="password"
        type="password"
        label={t('Password')}
        placeholder="********"
        error={errors?.password}
        onChange={onInputChange}
      />
      <Input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        label={t('Confirm Password')}
        placeholder="********"
        error={errors?.confirmPassword}
        onChange={onInputChange}
      />
      <div className="pt-2 text-sm">
        <div className="flex items-center">
          <input
            id="agreeToTermsAndConditions"
            type="checkbox"
            name="agreeToTermsAndConditions"
            className="form-checkbox rounded-md border-gray-300 bg-transparent text-blue-500 dark:border-zinc-600 dark:focus:ring-offset-zinc-800"
            onClick={onCheckboxChange}
            readOnly
          />
          <span className="ml-2 dark:text-zinc-200">
            <Trans i18nKey="signup:form.iHaveReadAndAgreeToTermsAndConditions" t={t}>
              I agree to the {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link to="#" className="font-medium text-indigo-600 dark:text-indigo-400">
                Shelf Terms
              </Link>{' '}
              and {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link to="#" className="font-medium text-indigo-600 dark:text-indigo-400">
                Privacy Policy
              </Link>
            </Trans>
          </span>
        </div>
        {errors?.agreeToTermsAndConditions && (
          <p className="mt-3 text-xs italic text-red-500 dark:text-rose-500">
            {errors?.agreeToTermsAndConditions}
          </p>
        )}
      </div>
      <div className="w-full pt-2">
        <Button
          type="submit"
          title={t('signup:form.button.title')}
          variant="primary"
          size="base"
          onClick={submit}
          loading={loading}
          full
        >
          {t('signup:form.button.title')}
        </Button>
      </div>
    </form>
  );
}

SignUpForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SignUpForm;
