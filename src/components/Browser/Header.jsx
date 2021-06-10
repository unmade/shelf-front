import React from 'react';
import PropTypes from 'prop-types';

import { useMediaQuery } from 'react-responsive';
import { useRouteMatch } from 'react-router-dom';

import { MediaQuery } from '../../constants';
import * as routes from '../../routes';

import Breadcrumb from '../ui/Breadcrumb';
import BreadcrumbDropdown from '../BreadcrumbDropdown';

import SearchButton from '../SearchButton';
import SideBarModal from '../SideBarModal';

function Header({ withCreateFolder, actionButton: ActionButton }) {
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
      <div className="flex flex-row items-center justify-between px-8 pt-4 border-gray-100">
        {(!isLaptop) && (
          <>
            <SideBarModal />
            <BreadcrumbDropdown />
          </>
        )}
        {(isLaptop) && (
          <h2 className="flex-1 text-gray-900 truncate text-xl sm:text-3xl font-medium">
            {currentFolder.name}
          </h2>
        )}
        <div className="ml-6 flex text-2xl items-center space-x-8">
          <SearchButton />
          <ActionButton />
        </div>
      </div>
      {(isLaptop) && (
        <Breadcrumb
          className="px-8 pt-2 pb-4"
          items={breadcrumbs}
          itemRender={({ name, path }) => (
            <Breadcrumb.Item path={path}>
              <span className="block truncate">
                {name}
              </span>
            </Breadcrumb.Item>
          )}
          itemRenderCollapsed={({ name, path }) => (
            <Breadcrumb.ItemCollapsed path={path}>
              <span className="block truncate">
                {name}
              </span>
            </Breadcrumb.ItemCollapsed>
          )}
          withCreateFolder={withCreateFolder}
        />
      )}
    </>
  );
}

export default Header;

Header.propTypes = {
  withCreateFolder: PropTypes.bool,
  actionButton: PropTypes.func.isRequired,
};

Header.defaultProps = {
  withCreateFolder: false,
};
