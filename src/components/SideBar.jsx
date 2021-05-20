import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import * as icons from '../icons';

import AccountMenu from '../containers/AccountMenu';

export const menu = [
  {
    path: '/files',
    title: 'Files',
    icon: <icons.File className="flex-shrink-0 w-5 h-5 mr-3" />,
  },
  {
    path: '/trash',
    title: 'Trash',
    icon: <icons.TrashOutlined className="flex-shrink-0 w-5 h-5 mr-3" />,
  },
];

const adminMenu = [
  {
    path: '/admin/users',
    title: 'User management',
    icon: <icons.UsersOutline className="flex-shrink-0 w-5 h-5 mr-3" />,
  },
];

function MenuGroup({ items }) {
  return (
    items.map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        className="whitespace-nowrap flex items-center font-medium transition-colors duration-200 rounded-md py-2 px-3"
        activeClassName="bg-gray-200 text-gray-700"
      >
        {item.icon}
        {item.title}
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

function SideBar({ currentAccount }) {
  return (
    <div className="px-3 flex flex-col h-full">
      <div className="px-2 pt-2 pb-8 flex items-center font-bold font-mono text-2xl text-gray-900">
        <div className="mr-3 p-2 bg-white flex items-center rounded-xl shadow-sm">
          <icons.AppLogo className="flex-shrink-0 w-7 h-7 text-gray-600" />
        </div>
        shelf
      </div>

      <div className="pt-2 pb-4 text-sm text-gray-500 flex-1">
        <nav className="space-y-2">
          <MenuGroup items={menu} />
          {(currentAccount?.superuser) && (
            <>
              <div className="px-3 font-semibold text-gray-400 pt-4">
                ADMIN
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

SideBar.propTypes = {
  currentAccount: PropTypes.shape({
    superuser: PropTypes.bool.isRequired,
  }),
};

SideBar.defaultProps = {
  currentAccount: null,
};
