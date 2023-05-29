import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import * as icons from '../../../icons';
import * as routes from '../../../routes';

import Button from '../../../components/ui/Button';

function Header({ name, onInfo }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-row border-b dark:border-zinc-700/50 items-center justify-between px-4 py-3">
      <div className="flex items-center flex-row">
        <icons.AppLogo className="h-10 w-10 p-2 dark:bg-white/5 rounded-xl" />
        <p className="hidden sm:block text-xl font-mono font-bold ml-3">shelf</p>
      </div>

      <div className="w-full min-w-0 px-4 sm:px-8">
        <p className="truncate text-left text-sm font-bold sm:text-center sm:text-lg">{name}</p>
      </div>

      <div className="flex min-w-max flex-row items-center justify-end text-gray-800 dark:text-zinc-200 sm:w-48">
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
          className="hidden sm:block ml-8"
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
