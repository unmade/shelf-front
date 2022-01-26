import React from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';

import { openDialog } from '../store/actions/ui';
import { getCurrentPath } from '../store/reducers/ui';
import { Dialogs } from '../constants';

import * as icons from '../icons';

import { breadcrumbs } from './ui/Breadcrumb';

function BreadcrumbDropdown() {
  const { t } = useTranslation();

  const currentPath = useSelector(getCurrentPath);
  const dispatch = useDispatch();
  const crumbs = breadcrumbs(currentPath);

  let currentFolder;
  let hasBreadcrumbs;
  if (crumbs.length === 1) {
    currentFolder = crumbs[crumbs.length - 1];
    hasBreadcrumbs = false;
  } else {
    currentFolder = crumbs.pop();
    hasBreadcrumbs = true;
  }

  return (
    <Menu as="div" className="relative min-w-0 flex-1 px-3">
      <Menu.Button className="mx-auto flex w-full items-center justify-center focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:w-auto sm:max-w-xs lg:max-w-md">
        <h2 className="truncate text-xl font-medium text-gray-900 sm:text-3xl">
          {currentFolder.name}
        </h2>
        <icons.SelectorOutlined className="ml-3 h-5 w-5 shrink-0" />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-full max-w-xs origin-top-right overflow-auto rounded-xl bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <div className={`${hasBreadcrumbs ? 'border-b' : 'hidden'} max-h-60 overflow-scroll`}>
            {crumbs
              .slice()
              .reverse()
              .map((item) => (
                <Menu.Item key={item.url}>
                  <NavLink to={item.url} className="flex items-center px-4 py-2">
                    <icons.Folder className="h-5 w-5 shrink-0 text-blue-400" />
                    <div className="ml-3 truncate">{item.name}</div>
                  </NavLink>
                </Menu.Item>
              ))}
          </div>
          <Menu.Item>
            <button
              type="button"
              title={t('button_create_folder_title')}
              className="w-full"
              onClick={() => dispatch(openDialog(Dialogs.createFolder))}
            >
              <div className="flex items-center justify-between px-4 py-2">
                <div className="font-medium">{t('New Folder')}</div>
                <icons.NewFolder className="h-5 w-5 shrink-0 text-gray-400" />
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
