import React from 'react';
import PropTypes from 'prop-types';

import { useMediaQuery } from 'react-responsive';
import { useRouteMatch } from 'react-router-dom';

import { MediaQuery } from '../../constants';
import * as routes from '../../routes';

import BreadcrumbDropdown from '../BreadcrumbDropdown';

import SearchButton from '../SearchButton';
import SideBarModal from '../SideBarModal';

function Header({ actionButton: ActionButton }) {
  const match = useRouteMatch();
  const isLaptop = useMediaQuery({ query: MediaQuery.lg });
  const breadcrumbs = routes.breadcrumbs(match.url);
  let currentFolder;
  if (breadcrumbs.length === 1) {
    currentFolder = breadcrumbs[breadcrumbs.length - 1];
  } else {
    currentFolder = breadcrumbs.pop();
  }

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
            {currentFolder.name}
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
  actionButton: PropTypes.func.isRequired,
};
