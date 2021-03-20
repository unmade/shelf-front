import React from 'react';

import { NavLink } from 'react-router-dom';

import { MENU } from '../constants';
import * as icons from '../icons';

import AccountMenu from '../containers/AccountMenu';

import Button from './ui/Button';
import Modal from './ui/Modal';

function AppMenuModal() {
  const [menuVisible, setMenuVisible] = React.useState(false);
  return (
    <>
      <Button
        type="text"
        size="lg"
        icon={<icons.Menu />}
        onClick={() => { setMenuVisible(true); }}
      />
      <span>
        <Modal
          visible={menuVisible}
          onClose={() => { setMenuVisible(false); }}
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-4 sm:w-72">
            <div className="text-center mb-2 sm:inline-flex sm:items-center">
              <div className="text-gray-500 bg-gray-100 mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                <icons.AppLogo />
              </div>
              <h3 className="mt-3 sm:mt-0 sm:ml-4 sm:text-left text-lg leading-6 font-semibold text-gray-900">
                Shelf
              </h3>
            </div>
            <div className="pt-12 pb-8 text-center text-xl text-gray-600 flex-1">
              <ul className="space-y-8">
                {MENU.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className="hover:text-gray-800"
                      activeClassName="text-gray-800 pointer-events-none"
                    >
                      {item.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-4 bg-gray-100">
            <AccountMenu />
          </div>
        </Modal>
      </span>
    </>
  );
}

AppMenuModal.propTypes = {};

export default AppMenuModal;
