import React from 'react';

import { NavLink } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';

import * as icons from '../icons';

function BreadcrumbDropdown({ items: crumbs }) {
  const [currentFolder, ...rest] = crumbs;

  return (
    <Menu as="div" className="relative min-w-3xs px-3">
      <Menu.Button className="focus-visible:ring-opacity-75 mx-auto flex w-full items-center justify-center focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:w-auto sm:max-w-xs lg:max-w-md">
        <span className="max-w-3xs truncate sm:max-w-sm">{currentFolder.name}</span>
        {rest.length ? (
          <icons.Selector className="ml-3 h-5 w-5 shrink-0 dark:text-zinc-100" />
        ) : null}
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
        <Menu.Items className="ring-opacity-5 absolute right-0 z-10 mt-2 max-h-fit w-full max-w-xs origin-top-right overflow-auto rounded-xl bg-white py-1 text-base shadow-lg ring-1 ring-black focus:outline-none sm:text-sm dark:bg-zinc-800 dark:text-zinc-100">
          {rest.map((item) => (
            <Menu.Item key={item.key}>
              {item.url != null ? (
                <NavLink to={item.url} className="flex items-center px-4 py-2">
                  <icons.Folder className="h-5 w-5 shrink-0 text-blue-400" />
                  <div className="ml-3 truncate">{item.name}</div>
                </NavLink>
              ) : (
                <span>{item.name}</span>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default BreadcrumbDropdown;

BreadcrumbDropdown.propTypes = {};
