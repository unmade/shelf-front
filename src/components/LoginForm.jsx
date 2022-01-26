import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import Button from './ui/Button';
import Input from './ui/Input';

function LoginForm({ loading, onSubmit }) {
  const { t } = useTranslation();
  const [inputs, setInputs] = React.useState({
    username: null,
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

  const validate = () => {
    let hasError = false;

    Object.entries(inputs).forEach(([field, value]) => {
      if (value == null || value === '') {
        setErrors({
          ...errors,
          [field]: t('This field is required'),
        });
        hasError = true;
      }
    });

    return !hasError;
  };

  const submit = () => {
    if (validate()) {
      const { username, password } = inputs;
      onSubmit(username, password);
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
        error={errors && errors.username}
        onChange={onInputChange}
      />
      <Input
        id="password"
        name="password"
        type="password"
        label={t('Password')}
        placeholder="********"
        error={errors && errors.password}
        onChange={onInputChange}
      />
      <div className="w-full pt-5">
        <Button
          htmlType="submit"
          title={t('Sign In')}
          type="primary"
          size="base"
          onClick={submit}
          loading={loading}
          full
        >
          {t('Sign In')}
        </Button>
      </div>
    </form>
  );
}

LoginForm.propTypes = {
  loading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  loading: false,
};

export default LoginForm;
