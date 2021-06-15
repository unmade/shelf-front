import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { getCurrentFolderName } from '../../store/reducers/ui';

import BreadcrumbDropdown from '../BreadcrumbDropdown';

import SearchButton from '../SearchButton';
import SideBarModal from '../SideBarModal';

function Header({ isLaptop, actionButton: ActionButton }) {
  const currentFolderName = useSelector(getCurrentFolderName);
  return (
    <>
      <div className="flex flex-row items-center justify-between px-8 py-7">
        {(!isLaptop) ? (
          <>
            <SideBarModal />
            <BreadcrumbDropdown />
          </>
        ) : (
          <h2 className="flex-1 text-gray-900 truncate text-xl sm:text-3xl font-medium">
            {currentFolderName}
          </h2>
        )}
        <div className="ml-6 flex text-2xl items-center space-x-8">
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
