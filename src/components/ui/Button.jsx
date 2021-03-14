import React from 'react';
import PropTypes from 'prop-types';

const classNamesByType = {
  default: ['font-medium', 'border', 'shadow-sm'],
  primary: ['font-semibold', 'shadow'],
  text: [],
};

const colors = {
  default: {
    [false]: ['bg-white', 'text-gray-700', 'border-gray-300', 'hover:text-gray-600'],
    [true]: ['bg-white', 'text-red-700', 'border-red-300'],
  },
  primary: {
    [false]: ['bg-blue-500', 'text-white'],
    [true]: ['bg-red-600', 'text-red-100', 'hover:bg-red-500'],
  },
  text: {
    [false]: ['text-gray-700', 'hover:bg-gray-100'],
    [true]: ['text-red-600', 'hover:bg-red-100'],
  },
};

const paddings = {
  xs: {
    [false]: ['p-2'],
    [true]: ['p-1'],
  },
  sm: {
    [false]: ['px-3', 'py-1'],
    [true]: ['p-1'],
  },
  base: {
    [false]: ['px-4', 'py-2'],
    [true]: ['p-2'],
  },
  lg: {
    [false]: ['px-4', 'py-2'],
    [true]: ['p-2'],
  },
};

const shapes = {
  circle: ['rounded-full'],
  round: ['rounded-md'],
};

function Button({
  children, danger, disabled, full, htmlType, icon, shape, size, title, type, onClick,
}) {
  const buttonProps = { disabled };
  const classNames = [`text-${size}`, 'rounded-md', 'focus:outline-none', 'focus:ring', 'transition', 'ease-in-out', 'duration-75'];

  if (full) {
    classNames.push('w-full');
  }

  classNames.push(...paddings[size][children === null || children === undefined]);

  if (title !== null || title !== undefined) {
    buttonProps.title = title;
  }

  if (onClick !== null || onClick !== undefined) {
    buttonProps.onClick = onClick;
  }

  if (children !== null && children !== undefined && icon !== null && icon !== undefined) {
    classNames.push('inline-flex', 'items-center', 'space-x-2');
  }

  classNames.push(...shapes[shape]);
  classNames.push(...classNamesByType[type]);
  classNames.push(...colors[type][danger]);
  buttonProps.className = classNames.join(' ');
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={htmlType}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...buttonProps}
    >
      {(icon) && (
        <span>
          {icon}
        </span>
      )}
      {(children) && (
        <span className="truncate">
          {children}
        </span>
      )}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  danger: PropTypes.bool,
  disabled: PropTypes.bool,
  full: PropTypes.bool,
  htmlType: PropTypes.oneOf(['button', 'submit']),
  icon: PropTypes.element,
  shape: PropTypes.oneOf(['circle', 'round']),
  size: PropTypes.oneOf(['xs', 'sm', 'base', 'lg']),
  title: PropTypes.string,
  type: PropTypes.oneOf(['primary', 'default', 'text']),
  onclick: PropTypes.func,
};

Button.defaultProps = {
  children: null,
  disabled: false,
  danger: false,
  full: false,
  htmlType: 'button',
  icon: null,
  shape: 'round',
  size: 'sm',
  title: null,
  type: 'default',
  onclick: null,
};

export default Button;
