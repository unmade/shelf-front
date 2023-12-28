import React from 'react';

import i18n from '../../i18n';

import * as icons from '../../icons';
import * as routes from '../../routes';

import CurrentAccount from './CurrentAccount';
import MenuGroup from './MenuGroup';
import StorageUsed from './StorageUsed';

const iconClassName = 'mr-3 h-5 w-5 shrink-0 lg:mx-auto lg:h-6 lg:w-6 xl:mr-3 xl:h-5 xl:w-5';

const menu = [
  {
    path: routes.FILES.prefix,
    title: i18n.t('Home', { defaultValue: 'Home' }),
    icon: <icons.HomeOutlined className={iconClassName} />,
    desktopOnly: false,
    items: null,
  },
  {
    path: routes.BOOKMARKS.prefix,
    title: i18n.t('Saved', { defaultValue: 'Saved' }),
    icon: <icons.BookmarkOutlined className={iconClassName} />,
    desktopOnly: false,
    items: null,
  },
  {
    path: routes.DUPLICATES.prefix,
    title: i18n.t('Duplicates', { defaultValue: 'Duplicates' }),
    icon: <icons.DocumentSearchOutlined className={iconClassName} />,
    desktopOnly: true,
    items: null,
  },
  {
    path: null,
    title: i18n.t('Shared', { defaultValue: 'Shared' }),
    icon: <icons.ShareOutlined className={iconClassName} />,
    desktopOnly: false,
    items: [
      {
        path: routes.SHARED_IN_APP.prefix,
        title: i18n.t('In app', { defaultValue: 'In app' }),
      },
      {
        path: routes.SHARED_VIA_LINK.prefix,
        title: i18n.t('Links', { defaultValue: 'Links' }),
      },
    ],
  },
  {
    path: routes.TRASH.prefix,
    title: i18n.t('Trash', { defaultValue: 'Trash' }),
    icon: <icons.TrashOutlined className={iconClassName} />,
    desktopOnly: false,
    items: null,
  },
];

const adminMenu = [
  {
    path: routes.USER_MANAGEMENT.prefix,
    title: i18n.t('Users'),
    icon: <icons.UsersOutline className={iconClassName} />,
  },
];

i18n.on('languageChanged init', () => {
  menu[0].title = i18n.t('Home');
  menu[1].title = i18n.t('Saved');
  menu[2].title = i18n.t('Duplicates');
  menu[3].title = i18n.t('Shared');
  menu[3].items[0].title = i18n.t('In app');
  menu[3].items[1].title = i18n.t('Links');
  menu[4].title = i18n.t('Trash');
  adminMenu[0].title = i18n.t('Users');
});

function SideBar() {
  return (
    <div className="flex h-full flex-col px-1 py-4">
      <div className="mx-0 flex items-center px-3 pt-2 pb-8 font-mono text-2xl font-bold text-gray-900 dark:text-zinc-100 lg:mx-auto xl:mx-0">
        <div className="mr-3 flex items-center rounded-xl bg-white p-2 shadow-sm dark:bg-zinc-800 lg:mr-0 xl:mr-3">
          <icons.AppLogo className="h-7 w-7 shrink-0" />
        </div>
        <span className="inline-block lg:hidden xl:inline-block">shelf</span>
      </div>

      <div className="flex-1 pt-2 pb-4 text-sm text-gray-500 dark:text-zinc-500">
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

export default SideBar;
