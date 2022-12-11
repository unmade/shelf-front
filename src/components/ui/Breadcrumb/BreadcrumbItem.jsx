import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const defaultClassNames = 'block transition-colors duration-150';
const defaultTextColors =
  'text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-100';
const activeTextColors = 'text-gray-900 pointer-events-none dark:text-zinc-100';

function BreadcrumbItem({ active = null, children, className, to, onClick }) {
  const classNameFactory = ({ isActive }) => {
    if ((isActive && active == null) || active) {
      return `${defaultClassNames} ${activeTextColors} ${className}`;
    }
    return `${defaultClassNames} ${defaultTextColors} ${className}`;
  };

  return (
    <NavLink to={to} className={classNameFactory} onClick={onClick} end>
      {children}
    </NavLink>
  );
}

BreadcrumbItem.propTypes = {
  active: PropTypes.oneOfType([PropTypes.bool, null]),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  className: PropTypes.string,
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

BreadcrumbItem.defaultProps = {
  active: null,
  className: '',
  onClick: () => {},
};

export default BreadcrumbItem;
