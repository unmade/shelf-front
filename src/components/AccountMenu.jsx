import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { retrieveCurrentAccount } from '../store/actions/accounts';
import { signedOut } from '../store/actions/auth';
import { getCurrentAccount } from '../store/reducers/accounts';

import * as icons from '../icons';

import Button from './ui/Button';
import Dropdown from './ui/Dropdown';

function Avatar({ className, username }) {
  return (
    <div
      className={`${className} mx-0 flex items-center justify-center rounded-xl border border-orange-200 bg-orange-50 text-orange-600 lg:mx-auto xl:mx-0`}
    >
      {username.substring(0, 1).toUpperCase()}
    </div>
  );
}

Avatar.propTypes = {
  className: PropTypes.string,
  username: PropTypes.string.isRequired,
};

Avatar.defaultProps = {
  className: '',
};

function Overlay() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { username } = useSelector(getCurrentAccount);

  const onSignOut = () => {
    dispatch(signedOut());
  };

  return (
    <div className="flex min-w-[12rem] flex-col space-y-2 rounded-xl bg-white p-2 shadow focus:outline-none">
      <div className="flex flex-row items-center">
        <Avatar className="h-8 w-8 rounded-lg" username={username} />
        <div className="ml-2 flex flex-1 flex-col text-left">
          <div className="text-sm font-semibold text-gray-700">{username}</div>
        </div>
      </div>
      <hr />
      <div className="space-y-1">
        <Button
          full
          type="text"
          title={t('Sign Out')}
          icon={<icons.LogoutOutlined className="h-5 w-5" />}
          onClick={onSignOut}
          danger
        >
          <div className="my-1">{t('Sign Out')}</div>
        </Button>
      </div>
    </div>
  );
}

Overlay.propTypes = {};

function AccountMenu() {
  const dispatch = useDispatch();
  const account = useSelector(getCurrentAccount);

  const shouldRetrieveAccount = account == null;
  React.useEffect(() => {
    if (shouldRetrieveAccount) {
      dispatch(retrieveCurrentAccount());
    }
  }, [shouldRetrieveAccount]);

  if (account == null) {
    return null;
  }

  const { username } = account;

  return (
    <Dropdown overlay={Overlay} placement="top-end">
      <div className="flex flex-row items-center lg:block xl:flex">
        <Avatar username={username} className="h-10 w-10" />
        <div className="ml-2 flex flex-1 flex-col text-left lg:hidden xl:flex">
          <div className="text-sm font-semibold text-gray-700">{username}</div>
        </div>
        <div className="block lg:hidden xl:block">
          <icons.Selector className="h-5 w-5 text-gray-500" />
        </div>
      </div>
    </Dropdown>
  );
}

AccountMenu.propTypes = {};

export default AccountMenu;
