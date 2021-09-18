import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { retrieveCurrentAccount } from '../store/actions/accounts';
import { signOut } from '../store/actions/auth';
import { getCurrentAccount } from '../store/reducers/accounts';

import * as icons from '../icons';

import Button from './ui/Button';

function AccountMenu() {
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
    dispatch(signOut());
  };

  return (
    <div className="flex flex-row lg:block xl:flex items-center">
      <div
        className="mx-0 lg:mx-auto xl:mx-0 rounded-full h-10 w-10 bg-orange-50 flex items-center justify-center border border-orange-200 text-orange-600"
      >
        {username.substring(0, 1).toUpperCase()}
      </div>
      <button
        type="button"
        className="hidden lg:block xl:hidden text-sm font-medium pt-1 text-gray-500"
        onClick={onSignOut}
      >
        Sign out
      </button>
      <div className="ml-2 text-left flex flex-col lg:hidden xl:flex flex-1">
        <div className="text-sm font-semibold text-gray-700">
          {username}
        </div>
        <div className="text-xs text-gray-600">
          {`@${username}`}
        </div>
      </div>
      <div className="block lg:hidden xl:block">
        <Button
          type="text"
          title="Sign Out"
          icon={<icons.LogOut />}
          onClick={onSignOut}
        />
      </div>
    </div>
  );
}

AccountMenu.propTypes = {};

export default AccountMenu;
