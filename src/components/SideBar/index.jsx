import React from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import i18n from '../../i18n';

import { getIsCurrentAccountSuperuser } from '../../store/reducers/accounts';

import * as icons from '../../icons';
import * as routes from '../../routes';

import CurrentAccount from './CurrentAccount';
import MenuGroup from './MenuGroup';
import StorageUsed from './StorageUsed';

const iconClassName = 'mr-3 h-5 w-5 shrink-0 lg:mx-auto lg:h-6 lg:w-6 xl:mr-3 xl:h-5 xl:w-5';

const menu = [
  {
    path: routes.FILES.prefix,
    title: i18n.t('Home'),
    icon: <icons.HomeOutlined className={iconClassName} />,
    desktopOnly: false,
  },
  {
    path: routes.BOOKMARKS.prefix,
    title: i18n.t('Saved'),
    icon: <icons.BookmarkOutlined className={iconClassName} />,
    desktopOnly: false,
  },
  {
    path: '/duplicates',
    title: i18n.t('Duplicates'),
    icon: <icons.DocumentSearchOutlined className={iconClassName} />,
    desktopOnly: true,
  },
  {
    path: routes.TRASH.prefix,
    title: i18n.t('Trash'),
    icon: <icons.TrashOutlined className={iconClassName} />,
    desktopOnly: false,
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
  menu[3].title = i18n.t('Trash');
  adminMenu[0].title = i18n.t('Users');
});

function SideBar() {
  const { t } = useTranslation();
  const isSuperuser = useSelector(getIsCurrentAccountSuperuser);

  return (
    <div className="flex h-full flex-col px-1 py-4">
      <div className="mx-0 flex items-center px-2 pt-2 pb-8 font-mono text-2xl font-bold text-gray-900 lg:mx-auto xl:mx-0">
        <div className="mr-3 flex items-center rounded-xl bg-white p-2 shadow-sm lg:mr-0 xl:mr-3">
          <icons.AppLogo className="h-7 w-7 shrink-0 text-gray-600" />
        </div>
        <span className="inline-block lg:hidden xl:inline-block">shelf</span>
      </div>

      <div className="flex-1 pt-2 pb-4 text-sm text-gray-500">
        <nav className="space-y-2 lg:space-y-4 xl:space-y-2">
          <MenuGroup items={menu} />
          {isSuperuser && (
            <>
              <div className="px-3 pt-4 font-semibold text-gray-400 lg:mx-auto lg:text-center xl:mx-0 xl:text-left">
                {t('ADMIN')}
              </div>
              <MenuGroup items={adminMenu} />
            </>
          )}
        </nav>
      </div>

      <div className="space-y-1 px-3 py-6 text-sm font-medium text-gray-500">
        <StorageUsed />
      </div>

      <div className="mx-3 border-t-2 pt-2">
        <CurrentAccount />
      </div>
    </div>
  );
}

export default SideBar;
