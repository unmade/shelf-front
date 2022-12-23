import React from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';

import { selectCurrentPath } from '../store/browser';

import * as icons from '../icons';
import * as routes from '../routes';

import { useCreateFolderDialog } from './CreateFolderDialogProvider';

function CreateFolderDialogButton({ inPath }) {
  const { t } = useTranslation();

  const openCreateFolderDialog = useCreateFolderDialog();

  return (
    <button
      type="button"
      title={t('button_create_folder_title')}
      className="w-full"
      onClick={() => openCreateFolderDialog(inPath)}
    >
      <div className="flex items-center justify-between px-4 py-2">
        <div className="font-medium">{t('New Folder')}</div>
        <icons.NewFolder className="h-5 w-5 shrink-0 text-gray-400 dark:text-zinc-500" />
      </div>
    </button>
  );
}

CreateFolderDialogButton.propTypes = {
  inPath: PropTypes.string.isRequired,
};

function BreadcrumbDropdown() {
  const currentPath = useSelector(selectCurrentPath);
  const crumbs = routes.breadcrumbs(currentPath);

  const [currentFolder, ...rest] = crumbs.slice().reverse();

  const canCreateFolder = !currentPath.toLowerCase().startsWith('trash');
  const CreateFolderDialogButtonItem = canCreateFolder ? (
    <Menu.Item>
      <CreateFolderDialogButton inPath={currentPath} />
    </Menu.Item>
  ) : null;

  return (
    <Menu as="div" className="relative min-w-1.5xs px-3">
      <Menu.Button className="mx-auto flex w-full items-center justify-center focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:w-auto sm:max-w-xs lg:max-w-md">
        <span className="max-w-2xs truncate sm:max-w-sm">{currentFolder.name}</span>
        {canCreateFolder || rest.length ? (
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
        <Menu.Items className="absolute right-0 z-10 mt-2 max-h-60 w-full max-w-xs origin-top-right overflow-auto rounded-xl bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-zinc-800 dark:text-zinc-100 sm:text-sm">
          {rest.map((item) => (
            <Menu.Item key={item.key}>
              <NavLink to={item.url} className="flex items-center px-4 py-2 ">
                <icons.Folder className="h-5 w-5 shrink-0 text-blue-400" />
                <div className="ml-3 truncate">{item.name}</div>
              </NavLink>
            </Menu.Item>
          ))}
          {CreateFolderDialogButtonItem}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default BreadcrumbDropdown;

BreadcrumbDropdown.propTypes = {};
