import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import i18n from '../i18n';

import { getIsCurrentAccountSuperuser } from '../store/reducers/accounts';

import * as icons from '../icons';
import * as routes from '../routes';

import CircularProgressBar from './ui/CiruclarProgressBar';
import ProgressBar from './ui/ProgressBar';

import AccountMenu from './AccountMenu';

function StorageUsed() {
  const storageUsed = Math.floor(((994.66 - 84.21) / 994.66) * 100);

  return (
    <>
      <div className="hidden space-y-2 xl:block">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <icons.Database className="h-4 w-4" />
            <p>Storage</p>
          </div>
          <p className="text-gray-400">{storageUsed}%</p>
        </div>
        <ProgressBar
          progress={storageUsed}
          success={storageUsed < 50}
          warning={storageUsed >= 50 && storageUsed < 85}
          danger={storageUsed >= 85}
        />
      </div>

      <div className="block xl:hidden">
        <div className="mx-auto h-12 w-12">
          <CircularProgressBar
            progress={storageUsed}
            success={storageUsed < 50}
            warning={storageUsed >= 50 && storageUsed < 85}
            danger={storageUsed >= 85}
          >
            <div className="text-[12px]">{storageUsed}%</div>
          </CircularProgressBar>
        </div>
        <div className="mt-2 flex items-center justify-center space-x-1 text-sm">
          <icons.Database className="h-4 w-4" />
          <p>Storage</p>
        </div>
      </div>
    </>
  );
}

const menu = [
  {
    path: routes.FILES.prefix,
    title: i18n.t('Home'),
    icon: <icons.HomeOutlined className="mr-3 h-5 w-5 shrink-0 lg:mx-auto xl:mr-3" />,
  },
  {
    path: routes.BOOKMARKS.prefix,
    title: i18n.t('Saved'),
    icon: <icons.BookmarkOutlined className="mr-3 h-5 w-5 shrink-0 lg:mx-auto xl:mr-3" />,
  },
  {
    path: '/duplicates',
    title: i18n.t('Duplicates'),
    icon: <icons.DocumentSearchOutlined className="mr-3 h-5 w-5 shrink-0 lg:mx-auto xl:mr-3" />,
  },
  {
    path: routes.TRASH.prefix,
    title: i18n.t('Trash'),
    icon: <icons.TrashOutlined className="mr-3 h-5 w-5 shrink-0 lg:mx-auto xl:mr-3" />,
  },
];

const adminMenu = [
  {
    path: routes.USER_MANAGEMENT.prefix,
    title: i18n.t('Users'),
    icon: <icons.UsersOutline className="mr-3 h-5 w-5 shrink-0 lg:mx-auto xl:mr-3" />,
  },
];

i18n.on('languageChanged init', () => {
  menu[0].title = i18n.t('Home');
  menu[1].title = i18n.t('Saved');
  menu[2].title = i18n.t('Duplicates');
  menu[3].title = i18n.t('Trash');
  adminMenu[0].title = i18n.t('Users');
});

const defaultClassNames =
  'flex items-center whitespace-nowrap rounded-xl py-2 px-3 font-medium transition-colors duration-200';
const activeClassNames = 'bg-gray-200 text-gray-700';

function classNameFactory({ isActive }) {
  return `${defaultClassNames} ${isActive ? activeClassNames : ''}`;
}

function MenuGroup({ items }) {
  return items.map((item) => (
    <NavLink key={item.path} to={item.path} className={classNameFactory}>
      <div className="mx-0 flex px-2 lg:mx-auto lg:block xl:mx-0 xl:flex xl:items-center">
        <div>{item.icon}</div>
        <div className="lg:pt-1 xl:pt-0">{item.title}</div>
      </div>
    </NavLink>
  ));
}

MenuGroup.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
    }).isRequired
  ),
};

function SideBar() {
  const { t } = useTranslation();
  const isSuperuser = useSelector(getIsCurrentAccountSuperuser);

  return (
    <div className="flex h-full flex-col px-3 py-4">
      <div className="mx-0 flex items-center px-2 pt-2 pb-8 font-mono text-2xl font-bold text-gray-900 lg:mx-auto xl:mx-0">
        <div className="mr-3 flex items-center rounded-xl bg-white p-2 shadow-sm lg:mr-0 xl:mr-3">
          <icons.AppLogo className="h-7 w-7 shrink-0 text-gray-600" />
        </div>
        <span className="inline-block lg:hidden xl:inline-block">shelf</span>
      </div>

      <div className="flex-1 pt-2 pb-4 text-sm text-gray-500">
        <nav className="space-y-2">
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

      <div className="border-t-2 pt-2">
        <div className="px-3 py-2">
          <AccountMenu />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
