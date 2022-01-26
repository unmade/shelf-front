import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import i18n from '../i18n';

import { getIsCurrentAccountSuperuser } from '../store/reducers/accounts';

import * as icons from '../icons';
import * as routes from '../routes';

import AccountMenu from './AccountMenu';

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
  menu[2].title = i18n.t('Trash');
  adminMenu[0].title = i18n.t('Users');
});

function MenuGroup({ items }) {
  return items.map((item) => (
    <NavLink
      key={item.path}
      to={item.path}
      className="flex items-center whitespace-nowrap rounded-xl py-2 px-3 font-medium transition-colors duration-200"
      activeClassName="bg-gray-200 text-gray-700"
    >
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

      <div className="px-3 py-2">
        <AccountMenu />
      </div>
    </div>
  );
}

export default SideBar;
