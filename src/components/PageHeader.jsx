import React from 'react';
import PropTypes from 'prop-types';

import { useIsLaptop } from '../hooks/media-query';

import { Children } from '../types';

import AppSidebarModal from './AppSidebarModal';

function Title({ children, icon }) {
  const isLaptop = useIsLaptop();

  if (isLaptop) {
    return (
      <div className="flex min-w-0 flex-1 items-center">
        {icon}
        <h2 className="ml-2 truncate text-xl font-medium text-gray-900 sm:text-3xl dark:text-zinc-100">
          {children}
        </h2>
      </div>
    );
  }
  return (
    <>
      <AppSidebarModal />
      <h2 className="ml-2 text-xl font-medium text-gray-900 sm:text-3xl dark:text-zinc-100">
        {children}
      </h2>
    </>
  );
}

Title.propTypes = {
  children: Children.isRequired,
  icon: PropTypes.node,
};

Title.defaultProps = {
  icon: null,
};

function Actions({ children }) {
  return (
    <div className="flex items-center text-2xl sm:ml-6 sm:space-x-8">
      {/* hack: this is to center text like on other pages */}
      {children ?? <div className="h-9 w-9">&nbsp;</div>}
    </div>
  );
}

Actions.propTypes = {
  children: Children,
};

Actions.defaultProps = {
  children: null,
};

function PageHeader({ children }) {
  return (
    <div className="mb-4 flex flex-row items-center justify-between px-6 py-7 sm:pr-8 sm:pl-5">
      {children}
    </div>
  );
}

PageHeader.propTypes = {
  children: Children.isRequired,
};

PageHeader.Title = Title;
PageHeader.Actions = Actions;

export default PageHeader;
