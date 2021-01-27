import React from 'react';
import { NavLink } from 'react-router-dom';

import * as icons from '../icons';

import { TRASH_FOLDER_NAME } from '../constants';

import AccountMenu from '../containers/AccountMenu';

const menu = [
  {
    path: '/files',
    title: 'All files',
  },
  {
    path: `/files/${TRASH_FOLDER_NAME}`,
    title: TRASH_FOLDER_NAME,
  },
];

function SideMenu() {
  return (
    <div className="p-2 flex flex-col h-full">
      <icons.AppLogo className="my-12 w-10 h-10 text-gray-500" />

      <div className="py-2 text-lg text-gray-600 flex-1">
        <ul className="space-y-4">
          {menu.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className="hover:text-gray-800"
                activeClassName="text-gray-800 pointer-events-none"
                exact
              >
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <AccountMenu />
      </div>

    </div>
  );
}

export default SideMenu;
