import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const defaultClassNames =
  'block text-gray-500 transition-colors duration-150 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-100 ';
const activeClassNames = 'text-gray-900 pointer-events-none dark:text-zinc-100';

function BreadcrumbItem({ active, children, className, to, onClick }) {
  const classNameFactory = ({ isActive }) => {
    if (isActive || active === true) {
      return `${defaultClassNames} ${activeClassNames} ${className}`;
    }
    return `${defaultClassNames} ${className}`;
  };

  return (
    <NavLink to={to} className={classNameFactory} onClick={onClick} end>
      {children}
    </NavLink>
  );
}

BreadcrumbItem.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  className: PropTypes.string,
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

BreadcrumbItem.defaultProps = {
  active: false,
  className: '',
  onClick: () => {},
};

export default BreadcrumbItem;
