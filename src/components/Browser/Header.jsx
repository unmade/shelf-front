import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { getCurrentFolderName, getCurrentPath } from '../../store/reducers/ui';

import * as icons from '../../icons';
import * as routes from '../../routes';

import Button from '../ui/Button';

import BreadcrumbDropdown from '../BreadcrumbDropdown';
import FileLink from '../FileLink';
import SearchButton from '../SearchButton';
import SideBarModal from '../SideBarModal';

function GoBack() {
  const currentPath = useSelector(getCurrentPath);
  const isRoot = (currentPath === '.' || currentPath.toLowerCase() === 'trash');
  const button = (
    <Button
      disabled={isRoot}
      type="text"
      icon={<icons.ArrowLeft className={`w-7 h-7 ${(isRoot) ? 'text-gray-400' : ''}`} />}
    />
  );
  if (isRoot) {
    return button;
  }
  return (
    <FileLink path={routes.parent(currentPath)}>
      {button}
    </FileLink>
  );
}

function Header({ isLaptop, actionButton: ActionButton }) {
  const currentFolderName = useSelector(getCurrentFolderName);
  return (
    <>
      <div className="flex flex-row items-center justify-between px-6 sm:pl-5 sm:pr-8 py-7">
        {(!isLaptop) ? (
          <>
            <SideBarModal />
            <BreadcrumbDropdown />
          </>
        ) : (
          <div className="min-w-0 flex-1 flex items-center ">
            <GoBack />
            <h2 className="ml-2 text-gray-900 truncate text-xl sm:text-3xl font-medium">
              {currentFolderName}
            </h2>
          </div>
        )}
        <div className="sm:ml-6 flex text-2xl items-center sm:space-x-8">
          <SearchButton />
          <ActionButton />
        </div>
      </div>
    </>
  );
}

export default Header;

Header.propTypes = {
  isLaptop: PropTypes.bool,
  actionButton: PropTypes.func.isRequired,
};

Header.defaultProps = {
  isLaptop: false,
};
