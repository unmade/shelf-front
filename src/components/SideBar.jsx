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
    icon: <icons.HomeOutlined className="flex-shrink-0 w-5 h-5 mr-3 lg:mx-auto xl:mr-3" />,
  },
  {
    path: routes.BOOKMARKS.prefix,
    title: i18n.t('Saved'),
    icon: <icons.BookmarkOutlined className="flex-shrink-0 w-5 h-5 mr-3 lg:mx-auto xl:mr-3" />,
  },
  {
    path: routes.TRASH.prefix,
    title: i18n.t('Trash'),
    icon: <icons.TrashOutlined className="flex-shrink-0 w-5 h-5 mr-3 lg:mx-auto xl:mr-3" />,
  },
];

const adminMenu = [
  {
    path: routes.USER_MANAGEMENT.prefix,
    title: i18n.t('Users'),
    icon: <icons.UsersOutline className="flex-shrink-0 w-5 h-5 mr-3 lg:mx-auto xl:mr-3" />,
  },
];

i18n.on('languageChanged init', () => {
  menu[0].title = i18n.t('Home');
  menu[1].title = i18n.t('Saved');
  menu[2].title = i18n.t('Trash');
  adminMenu[0].title = i18n.t('Users');
});

function MenuGroup({ items }) {
  return (
    items.map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        className="whitespace-nowrap flex items-center font-medium transition-colors duration-200 rounded-xl py-2 px-3"
        activeClassName="bg-gray-200 text-gray-700"
      >
        <div className="flex lg:block xl:flex xl:items-center mx-0 lg:mx-auto xl:mx-0 px-2">
          <div>
            {item.icon}
          </div>
          <div className="lg:pt-1 xl:pt-0">
            {item.title}
          </div>
        </div>
      </NavLink>
    ))
  );
}

MenuGroup.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
    }).isRequired,
  ),
};

function SideBar() {
  const { t } = useTranslation();
  const isSuperuser = useSelector(getIsCurrentAccountSuperuser);

  return (
    <div className="px-3 py-4 flex flex-col h-full">
      <div className="mx-0 lg:mx-auto xl:mx-0 px-2 pt-2 pb-8 flex items-center font-bold font-mono text-2xl text-gray-900">
        <div className="mr-3 lg:mr-0 xl:mr-3 p-2 bg-white flex items-center rounded-xl shadow-sm">
          <icons.AppLogo className="flex-shrink-0 w-7 h-7 text-gray-600" />
        </div>
        <span className="inline-block lg:hidden xl:inline-block">
          shelf
        </span>
      </div>

      <div className="pt-2 pb-4 text-sm text-gray-500 flex-1">
        <nav className="space-y-2">
          <MenuGroup items={menu} />
          {(isSuperuser) && (
            <>
              <div className="lg:mx-auto xl:mx-0 px-3 pt-4 font-semibold text-gray-400 lg:text-center xl:text-left">
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
