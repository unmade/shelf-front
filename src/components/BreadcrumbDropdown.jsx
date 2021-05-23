import React from 'react';

import { useDispatch } from 'react-redux';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';

import { openDialog } from '../store/actions/ui';
import { Dialogs } from '../constants';

import * as icons from '../icons';
import * as routes from '../routes';

function BreadcrumbDropdown() {
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const breadcrumbs = routes.breadcrumbs(match.url);

  let currentFolder;
  let hasBreadcrumbs;
  if (breadcrumbs.length === 1) {
    currentFolder = breadcrumbs[breadcrumbs.length - 1];
    hasBreadcrumbs = false;
  } else {
    currentFolder = breadcrumbs.pop();
    hasBreadcrumbs = true;
  }

  return (
    <Menu as="div" className="relative flex-1 min-w-0 px-3">
      <Menu.Button className="w-full mx-auto sm:w-auto sm:max-w-xs lg:max-w-md flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500">
        <h2 className="text-gray-900 truncate text-xl sm:text-3xl font-medium">
          {currentFolder.name}
        </h2>
        <icons.SelectorOutlined className="flex-shrink-0 ml-3 w-5 h-5" />
      </Menu.Button>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="z-10 absolute w-full max-w-xs right-0 origin-top-right py-1 mt-2 overflow-auto text-base bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <div className={`${(hasBreadcrumbs) ? 'border-b' : 'hidden'} max-h-60 overflow-scroll`}>
            {breadcrumbs.slice().reverse().map((item) => (
              <Menu.Item key={item.path}>
                <NavLink to={item.path} className="flex items-center px-4 py-2">
                  <icons.Folder className="flex-shrink-0 text-blue-400 w-5 h-5" />
                  <div className="ml-3 truncate">
                    {item.name}
                  </div>
                </NavLink>
              </Menu.Item>
            ))}
          </div>
          <Menu.Item>
            <button
              type="button"
              className="w-full"
              onClick={() => dispatch(openDialog(Dialogs.createFolder))}
            >
              <div className="flex items-center justify-between px-4 py-2">
                <div className="font-medium">
                  New Folder
                </div>
                <icons.NewFolder className="text-gray-400 flex-shrink-0 w-5 h-5" />
              </div>
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default BreadcrumbDropdown;

BreadcrumbDropdown.propTypes = {};
