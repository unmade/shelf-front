import React from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { useGetCurrentAccountQuery } from '../../store/accounts';
import { signedOut } from '../../store/auth';
import { appearanceChanged, selectAppearance } from '../../store/ui';

import * as icons from '../../icons';

import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Dropdown from '../ui/Dropdown';
import Listbox from '../ui/Listbox';

function PreferredAppearance() {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const options = [
    { name: t('Light'), value: 'light' },
    { name: t('Dark'), value: 'dark' },
    { name: t('Auto'), value: 'auto' },
  ];

  const appearance = useSelector(selectAppearance);
  const currentOption = options.filter(({ value }) => value === appearance)[0];

  const onOptionChange = (option) => {
    dispatch(appearanceChanged({ appearance: option.value }));
  };

  return (
    <Listbox
      initial={currentOption}
      options={options}
      placement="right-end"
      onOptionChange={onOptionChange}
    >
      <Button full type="text" icon={<icons.MoonOutlined className="h-5 w-5" />}>
        <div className="my-1">
          {t('Appearance')}: {currentOption.name.toLowerCase()}
        </div>
      </Button>
    </Listbox>
  );
}

function Overlay() {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { data: account } = useGetCurrentAccountQuery();
  const { username } = account;

  const onSignOut = () => {
    dispatch(signedOut());
  };

  return (
    <div className="flex min-w-[12rem] flex-col space-y-2 rounded-xl bg-white p-2 shadow focus:outline-none dark:bg-zinc-800 dark:shadow-zinc-900/70">
      <div className="flex flex-row items-center p-1">
        <Avatar className="h-8 w-8 rounded-lg" username={username} />
        <div className="ml-2 flex flex-1 flex-col text-left">
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{username}</div>
        </div>
      </div>
      <hr className="dark:border-zinc-700" />
      <PreferredAppearance />
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

function CurrentAccount() {
  const { data: account } = useGetCurrentAccountQuery();

  if (account == null) {
    return null;
  }

  const { username } = account;

  return (
    <Dropdown overlay={Overlay} placement="top-end">
      <div className="flex flex-row items-center lg:block xl:flex">
        <Avatar username={username} className="h-10 w-10" />
        <div className="ml-2 flex flex-1 flex-col text-left lg:hidden xl:flex">
          <div className="text-sm font-semibold text-gray-700 dark:text-zinc-400">{username}</div>
        </div>
        <div className="block lg:hidden xl:block">
          <icons.Selector className="h-5 w-5 text-gray-500 dark:text-zinc-500" />
        </div>
      </div>
    </Dropdown>
  );
}

CurrentAccount.propTypes = {};

export default CurrentAccount;
