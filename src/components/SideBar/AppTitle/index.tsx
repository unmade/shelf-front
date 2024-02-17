import React from 'react';

import * as icons from 'icons';

import Dropdown from 'components/ui/Dropdown';

import useAvailableApps from '../hooks/available-apps';

import AppList from './AppList';

interface Props {
  title: string;
}

function AppLogo() {
  return (
    <div className="mr-3 flex items-center rounded-xl bg-white p-2 shadow-sm dark:bg-zinc-800 lg:mr-0 xl:mr-3">
      <icons.AppLogo className="h-7 w-7 shrink-0" />
    </div>
  );
}

export default function AppTitle({ title }: Props) {
  const apps = useAvailableApps();

  if (apps.length < 2) {
    return (
      <div className="mb-6 px-2 text-gray-900 dark:text-zinc-100">
        <div className="mx-0 flex items-center px-1 py-2 text-2xl lg:mx-auto lg:py-1 xl:mx-0 xl:py-2">
          <AppLogo />
          <div className="flex w-full items-center rounded-xl p-1 text-2xl lg:hidden xl:flex">
            <span className="font-light tracking-tight">Shelf</span>
            <span className="pl-2 font-medium">{title}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 px-2 text-gray-900 dark:text-zinc-100">
      <Dropdown overlay={<AppList items={apps} />} placement="bottom-end">
        <div className="mx-0 flex items-center px-1 py-2 text-2xl lg:mx-auto lg:py-1 xl:mx-0 xl:py-2">
          <AppLogo />
          <div className="flex w-full items-center justify-between rounded-xl p-1 text-2xl lg:hidden xl:flex">
            <div className="flex items-center">
              <span className="font-light tracking-tight">Shelf</span>
              <span className="pl-2 font-medium">{title}</span>
            </div>
            <span className="pl-1">
              <icons.ChevronDown className="h-5 w-5" />
            </span>
          </div>
        </div>
      </Dropdown>
    </div>
  );
}
