import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function BreadcrumbItem({ name, path }) {
  return (
    <NavLink
      to={path}
      className="font-semibold text-gray-600 hover:text-blue-500"
      activeClassName="text-gray-800 pointer-events-none"
      exact
    >
      {name}
    </NavLink>
  );
}

BreadcrumbItem.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default BreadcrumbItem;
