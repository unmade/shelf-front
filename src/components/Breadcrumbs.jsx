import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { BREADCRUMBS_ALIASES } from '../constants';

const smallText = 'text-xs space-x-1';
const largeText = 'text-xl space-x-2';

function breadcrumbsFromPath(path, aliases = BREADCRUMBS_ALIASES) {
  const breadcrumbs = [];
  const parts = path.split('/').filter((e) => e !== '');
  let prefix = '';
  parts.forEach((part) => {
    prefix = (part !== '.') ? `${prefix}/${part}` : part;
    breadcrumbs.push({
      path: prefix,
      name: (aliases && aliases[part]) || part,
    });
  });

  return breadcrumbs;
}

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

function Breadcrumbs({ size, path, itemRender: Render }) {
  const textSize = (size === 'small') ? smallText : largeText;
  const items = breadcrumbsFromPath(path);

  return (
    <nav className={`flex flex-row items-center ${textSize} text-gray-600`}>
      {(items.map((item, idx) => (
        <React.Fragment key={item.path}>
          <Render key={item.path} name={item.name} path={item.path} />
          {(idx !== (items.length - 1)) && <span>&#8250;</span>}
        </React.Fragment>
      )))}
    </nav>
  );
}

Breadcrumbs.propTypes = {
  size: PropTypes.oneOf(['small', 'large']),
  path: PropTypes.string.isRequired,
  itemRender: PropTypes.func,
};

Breadcrumbs.defaultProps = {
  size: 'large',
  itemRender: BreadcrumbItem,
};

export default Breadcrumbs;
