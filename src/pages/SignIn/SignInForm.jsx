import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import Button from 'components/ui/Button';
import Input from 'components/ui/Input';

function LoginForm({ loading, onSubmit }) {
  const { t } = useTranslation(['translation', 'signin']);

  const [inputs, setInputs] = React.useState({
    login: null,
    password: null,
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

  const isValid = () => {
    const emptyFields = {};
    Object.entries(inputs).forEach(([field, value]) => {
      if (value == null || value === '') {
        emptyFields[field] = t('This field is required');
      }
    });

    if (Object.keys(emptyFields).length > 0) {
      setErrors({ ...errors, ...emptyFields });
      return false;
    }

    return true;
  };

  const submit = () => {
    if (isValid()) {
      const { login, password } = inputs;
      onSubmit(login, password);
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
        id="login"
        name="login"
        label={t('signin:form.inputs.login.label', { defaultValue: 'Login' })}
        placeholder={t('signin:form.inputs.login.placeholder', {
          defaultValue: 'Email or username',
        })}
        error={errors && errors.username}
        onChange={onInputChange}
      />
      <Input
        id="password"
        name="password"
        type="password"
        label={t('signin:form.inputs.password.label', { defaultValue: 'Password' })}
        placeholder="********"
        error={errors && errors.password}
        onChange={onInputChange}
      />
      <div className="w-full pt-5">
        <Button
          type="submit"
          title={t('signin:form.button.signin.title', 'Sign In')}
          variant="primary"
          size="base"
          onClick={submit}
          loading={loading}
          full
        >
          {t('signin:form.button.signin.title', { defaultValue: 'Sign In' })}
        </Button>
      </div>
    </form>
  );
}

LoginForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
