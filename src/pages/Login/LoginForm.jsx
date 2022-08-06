import React from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { issueToken } from '../../store/actions/auth';

import * as icons from '../../icons';
import * as routes from '../../routes';

import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { getLoading } from '../../store/reducers/loading';

function LoginForm() {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const loading = useSelector((state) => getLoading(state, { actionType: issueToken }));

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
      dispatch(issueToken(username, password));
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
      <div className="w-full pt-2 text-gray-700">
        <p className="text-center text-sm">
          Not registered yet?{' '}
          <Link
            to={routes.SIGNUP.prefix}
            className="inline-flex items-center space-x-1 font-medium text-indigo-600"
          >
            <span>Register now </span>
            <span>
              <icons.ExternalLink className="w5 h-5" />
            </span>
          </Link>
        </p>
      </div>
    </form>
  );
}

LoginForm.propTypes = {};

export default LoginForm;
