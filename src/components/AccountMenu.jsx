import React from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { retrieveCurrentAccount } from '../store/actions/accounts';
import { signedOut } from '../store/actions/auth';
import { getCurrentAccount } from '../store/reducers/accounts';

import * as icons from '../icons';

import Button from './ui/Button';

function AccountMenu() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const account = useSelector(getCurrentAccount);

  React.useEffect(() => {
    if (account == null) {
      dispatch(retrieveCurrentAccount());
    }
  }, [account]);

  if (account == null) {
    return null;
  }

  const { username } = account;
  const onSignOut = () => {
    dispatch(signedOut());
  };

  return (
    <div className="flex flex-row items-center lg:block xl:flex">
      <div className="mx-0 flex h-10 w-10 items-center justify-center rounded-full border border-orange-200 bg-orange-50 text-orange-600 lg:mx-auto xl:mx-0">
        {username.substring(0, 1).toUpperCase()}
      </div>
      <button
        type="button"
        className="hidden w-full pt-1 text-sm font-medium text-gray-500 lg:block xl:hidden"
        onClick={onSignOut}
      >
        {t('Sign Out')}
      </button>
      <div className="ml-2 flex flex-1 flex-col text-left lg:hidden xl:flex">
        <div className="text-sm font-semibold text-gray-700">{username}</div>
        <div className="text-xs text-gray-600">{`@${username}`}</div>
      </div>
      <div className="block lg:hidden xl:block">
        <Button
          type="text"
          title={t('Sign Out')}
          size="lg"
          icon={<icons.Logout className="h-5 w-5 text-gray-500" />}
          onClick={onSignOut}
        />
      </div>
    </div>
  );
}

AccountMenu.propTypes = {};

export default AccountMenu;
