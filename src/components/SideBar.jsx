import React from 'react';
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

function SideBar() {
  return (
    <div className="px-3 flex flex-col h-full">
      <div className="py-2 px-2 flex items-center font-bold font-mono text-2xl text-gray-900">
        <icons.AppLogo className="mr-2 flex-shrink-0 w-7 h-7 text-gray-600" />
        shelf
      </div>

      <div className="pt-10 pb-4 text-lg text-gray-600 flex-1">
        <nav className="space-y-2">
          {menu.map((item) => (
            <NavLink
              to={item.path}
              className="whitespace-nowrap flex items-center lg:text-sm font-medium transition-colors duration-200 rounded-md py-2 px-3"
              activeClassName="bg-gray-300 text-gray-800"
            >
              {item.icon}
              {item.title}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="px-3 py-2">
        <AccountMenu />
      </div>

    </div>
  );
}

export default SideBar;
