import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../../icons';

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
    [false]: ['bg-blue-400', 'text-white'],
    [true]: ['bg-red-500', 'text-red-50', 'hover:bg-red-400'],
  },
  text: {
    [false]: ['text-gray-700', 'hover:bg-gray-50'],
    [true]: ['text-red-600', 'hover:bg-red-50'],
  },
};

const fontSizes = {
  xs: 'text-sm sm:text-xs',
  sm: 'text-base sm:text-sm',
  base: 'text-lg sm:text-base',
  lg: 'text-xl sm:text-lg',
};

const iconSize = {
  xs: 'w-5 h-5 sm:w-4 sm:h-4',
  sm: 'w-6 h-6 sm:w-5 sm:h-5',
  base: 'w-7 h-7 sm:w-6 sm:h-6',
  lg: 'w-8 h-8 sm:w-7 sm:h-7',
};

const paddings = {
  xs: {
    [false]: ['px-2 py-1'],
    [true]: ['p-1'],
  },
  sm: {
    [false]: ['px-4 py-2', 'sm:px-3 sm:py-1'],
    [true]: ['p-2', 'sm:p-1'],
  },
  base: {
    [false]: ['px-4 py-2'],
    [true]: ['p-2'],
  },
  lg: {
    [false]: ['px-4 py-2'],
    [true]: ['p-2'],
  },
};

const shapes = {
  circle: ['rounded-full'],
  round: ['rounded-md'],
};

function Button({
  as: RenderAs,
  children,
  danger,
  disabled,
  full,
  htmlType,
  icon,
  loading,
  shape,
  size,
  title,
  type,
  onClick,
}) {
  const buttonProps = { disabled };
  const classNames = [fontSizes[size], 'rounded-md', 'focus:outline-none', 'focus:ring', 'transition', 'ease-in-out', 'duration-75'];

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
  if (loading) {
    buttonProps.disabled = true;
    buttonProps.className = `${buttonProps.className} opacity-50 cursor-wait`;
    return (
      <button
        // eslint-disable-next-line react/button-has-type
        type={htmlType}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...buttonProps}
      >
        <span>
          <icons.Spinner className={`${iconSize[size]} mx-auto animate-spin`} />
        </span>
      </button>
    );
  }
  return (
    <RenderAs
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...buttonProps}
    >
      {(icon) && (
        <span>
          {icon}
        </span>
      )}
      {(!loading && children) && (
        <span className="min-w-0">
          {children}
        </span>
      )}
    </RenderAs>
  );
}

Button.propTypes = {
  as: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  danger: PropTypes.bool,
  disabled: PropTypes.bool,
  full: PropTypes.bool,
  htmlType: PropTypes.oneOf(['button', 'submit']),
  icon: PropTypes.element,
  loading: PropTypes.bool,
  shape: PropTypes.oneOf(['circle', 'round']),
  size: PropTypes.oneOf(['xs', 'sm', 'base', 'lg']),
  title: PropTypes.string,
  type: PropTypes.oneOf(['primary', 'default', 'text']),
  onclick: PropTypes.func,
};

Button.defaultProps = {
  as: 'button',
  children: null,
  disabled: false,
  danger: false,
  full: false,
  htmlType: 'button',
  icon: null,
  loading: false,
  shape: 'round',
  size: 'sm',
  title: null,
  type: 'default',
  onclick: null,
};

export default Button;
