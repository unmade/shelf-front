import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const defaultClassNames = 'block min-w-0 transition-colors duration-150';
const defaultTextColors =
  'text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-100';
const activeTextColors = 'text-gray-900 pointer-events-none dark:text-zinc-100';

function BreadcrumbItem({ active = null, children, className, to }) {
  const classNameFactory = ({ isActive }) => {
    if ((isActive && active == null) || active) {
      return `${defaultClassNames} ${activeTextColors} ${className}`;
    }
    return `${defaultClassNames} ${defaultTextColors} ${className}`;
  };

  if (to != null) {
    return (
      <NavLink to={to} className={classNameFactory} end>
        {children}
      </NavLink>
    );
  }
  return <div className={classNameFactory({ isActive: active })}>{children}</div>;
}

BreadcrumbItem.propTypes = {
  active: PropTypes.oneOfType([PropTypes.bool, null]),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  className: PropTypes.string,
  to: PropTypes.string,
};

BreadcrumbItem.defaultProps = {
  active: null,
  className: '',
  to: null,
};

export default BreadcrumbItem;
