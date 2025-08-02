import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import * as icons from '../../../icons';
import * as routes from '../../../routes';

import Button from '../../../components/ui-legacy/Button';

function Header({ name, onInfo }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-row items-center justify-between border-b px-4 py-3 dark:border-zinc-700/50">
      <div className="flex flex-row items-center">
        <icons.AppLogo className="h-10 w-10 rounded-xl p-2 dark:bg-white/5" />
        <p className="ml-3 hidden font-mono text-xl font-bold sm:block">shelf</p>
      </div>

      <div className="w-full min-w-0 px-4 sm:px-8">
        <p className="truncate text-left text-sm font-bold sm:text-center sm:text-lg">{name}</p>
      </div>

      <div className="flex min-w-max flex-row items-center justify-end text-gray-800 sm:w-48 dark:text-zinc-200">
        <Link to={routes.SIGNIN.prefix} className="hidden sm:inline-block">
          <Button type="text">
            <span className="font-medium">{t('Sign In')}</span>
          </Button>
        </Link>
        <Link to={routes.SIGNUP.prefix} className="ml-4">
          <Button as="div" variant="primary">
            {t('Sign Up')}
          </Button>
        </Link>
        <Button
          className="ml-8 hidden sm:block"
          variant="text"
          size="base"
          icon={<icons.InformationCircleOutlined className="h-5 w-5" />}
          onClick={onInfo}
        />
      </div>
    </div>
  );
}

export default Header;

Header.propTypes = {
  name: PropTypes.string.isRequired,
  onInfo: PropTypes.func.isRequired,
};
