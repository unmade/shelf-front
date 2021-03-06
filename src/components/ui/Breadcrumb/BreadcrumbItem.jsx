import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function BreadcrumbItem({
  children, className, path, isActive, onClick,
}) {
  const linkProps = {};
  if (isActive !== null) {
    linkProps.isActive = isActive;
  }
  if (onClick !== null) {
    linkProps.onClick = onClick;
  }
  return (
    <NavLink
      to={path}
      className={`block text-gray-500 hover:text-gray-900 transition-colors duration-150 ${className}`}
      activeClassName="text-gray-900 pointer-events-none"
      exact
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...linkProps}
    >
      {children}
    </NavLink>
  );
}

BreadcrumbItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  path: PropTypes.string.isRequired,
  isActive: PropTypes.func,
  onClick: PropTypes.func,
};

BreadcrumbItem.defaultProps = {
  className: '',
  isActive: null,
  onClick: null,
};

export default BreadcrumbItem;
