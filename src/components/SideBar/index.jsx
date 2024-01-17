import React from 'react';

import CurrentAccount from './CurrentAccount';
import MenuGroup from './MenuGroup';
import { useSidebarContext } from './SidebarProvider';
import StorageUsed from './StorageUsed';

function SideBar() {
  const { appTitle, appLogo: AppLogo, menu } = useSidebarContext();

  return (
    <div className="flex h-full flex-col px-1 py-4">
      <div className="mx-0 flex items-center px-3 pb-8 pt-2 font-mono text-2xl font-bold text-gray-900 dark:text-zinc-100 lg:mx-auto xl:mx-0">
        <div className="mr-3 flex items-center rounded-xl bg-white p-2 shadow-sm dark:bg-zinc-800 lg:mr-0 xl:mr-3">
          <AppLogo className="h-7 w-7 shrink-0" />
        </div>
        <span className="inline-block lg:hidden xl:inline-block">{appTitle}</span>
      </div>

      <div className="flex-1 pb-4 pt-2 text-sm text-gray-500 dark:text-zinc-500">
        <nav className="space-y-2 lg:space-y-4 xl:space-y-2">
          <MenuGroup items={menu} />
        </nav>
      </div>

      <div className="space-y-1 p-3 text-sm font-medium text-gray-500 dark:text-zinc-500">
        <StorageUsed />
      </div>

      <div className="mx-3 border-t-2 pt-3 dark:border-zinc-800">
        <CurrentAccount />
      </div>
    </div>
  );
}

SideBar.propTypes = {};

export default SideBar;
