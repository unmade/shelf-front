import React from 'react';

import CurrentAccount from './CurrentAccount';
import MenuGroup from './MenuGroup';
import { useSidebarContext } from './SidebarProvider';
import StorageUsed from './StorageUsed';
import AppTitle from './AppTitle';

function SideBar() {
  const { app } = useSidebarContext();

  return (
    <div className="flex h-full flex-col px-1 py-4">
      <AppTitle title={app.title} />

      <div className="flex-1 pb-4 pt-2 text-sm text-gray-500 dark:text-zinc-500">
        <nav className="space-y-2 lg:space-y-4 xl:space-y-2">
          <MenuGroup items={app.menu} />
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

export default SideBar;
