import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

const defaultClassNames =
  'mx-3 flex items-center whitespace-nowrap rounded-xl py-2 px-3 font-medium transition-colors duration-200 lg:p-2.5 xl:py-2 xl:px-3';
const activeClassNames = 'bg-gray-200 text-gray-700';

function classNameFactory({ isActive }) {
  return `${defaultClassNames} ${isActive ? activeClassNames : ''}`;
}

function MenuGroup({ items }) {
  return items.map((item) => (
    <div key={item.path} className={item.desktopOnly ? 'hidden lg:block' : 'block'}>
      <NavLink to={item.path} className={classNameFactory}>
        <div className="mx-0 flex lg:mx-auto lg:block xl:mx-0 xl:flex xl:items-center">
          <div>{item.icon}</div>
          <div className="block lg:hidden xl:block">{item.title}</div>
        </div>
      </NavLink>
    </div>
  ));
}

MenuGroup.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
      desktopOnly: PropTypes.bool.isRequired,
    }).isRequired
  ),
};

export default MenuGroup;
