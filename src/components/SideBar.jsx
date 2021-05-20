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
      <div className="px-2 pt-2 pb-8 flex items-center font-bold font-mono text-2xl text-gray-900">
        <div className="mr-3 p-2 bg-white flex items-center rounded-xl shadow-sm">
          <icons.AppLogo className="flex-shrink-0 w-7 h-7 text-gray-600" />
        </div>
        shelf
      </div>

      <div className="pt-2 pb-4 text-lg text-gray-500 flex-1">
        <nav className="space-y-2">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="whitespace-nowrap flex items-center lg:text-sm font-medium transition-colors duration-200 rounded-md py-2 px-3"
              activeClassName="bg-gray-200 text-gray-700"
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
