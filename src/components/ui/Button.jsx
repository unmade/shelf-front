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
    [false]: [
      'bg-white dark:bg-zinc-700',
      'text-gray-700 dark:text-zinc-200',
      'border-gray-300 dark:border-zinc-600',
      'hover:text-gray-600 dark:hover:text-zinc-300',
      'dark:focus:ring-zinc-700',
    ],
    [true]: [
      'bg-white dark:bg-zinc-700',
      'text-red-600 dark:text-rose-300',
      'border-red-400 dark:border-rose-500',
    ],
  },
  primary: {
    [false]: [
      'bg-gradient-to-br',
      'from-blue-400 dark:from-blue-500/90',
      'to-indigo-400 dark:to-indigo-500/90',
      'text-white',
      'hover:from-blue-300 dark:hover:from-blue-500',
      'hover:to-indigo-400 dark:hover:to-indigo-500',
      'shadow',
      'dark:focus:ring-indigo-700',
    ],
    [true]: [
      'bg-gradient-to-br',
      'from-red-400 dark:from-rose-500/90',
      'to-rose-400 dark:to-red-500/90',
      'hover:from-red-300 dark:hover:from-rose-500',
      'dark:hover:to-red-500',
      'text-red-50 hover:text-white',
      'shadow',
      'ring-rose-300 dark:focus:ring-rose-700',
    ],
  },
  text: {
    [false]: [
      'text-gray-700',
      'hover:bg-gray-50',
      'dark:text-zinc-300',
      'dark:hover:bg-zinc-700/30',
      'dark:focus:ring-zinc-700',
    ],
    [true]: [
      'text-red-600',
      'hover:bg-red-50',
      'dark:text-rose-500',
      'dark:hover:bg-rose-700/30',
      'dark:focus:ring-rose-800',
    ],
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
  circle: {
    xs: ['rounded-full'],
    sm: ['rounded-full'],
    base: ['rounded-full'],
    lg: ['rounded-full'],
  },
  round: {
    xs: ['rounded-md'],
    sm: [
      'rounded-lg group-last/input:rounded-l-none group-last/input:rounded-r-lg group-last/input:focus:z-20',
    ],
    base: ['rounded-xl'],
    lg: ['rounded-xl'],
  },
};

function Button({
  as: RenderAs,
  children,
  className,
  danger,
  disabled,
  full,
  htmlType,
  icon,
  innerRef,
  loading,
  shape,
  size,
  title,
  type,
  onClick,
}) {
  const buttonProps = { disabled };
  const classNames = [
    className,
    fontSizes[size],
    'focus:outline-none',
    'focus:ring',
    'focus:ring-offset-2',
    'dark:focus:ring-offset-zinc-800',
    'transition-all',
    'ease-in-out',
  ];

  if (full) {
    classNames.push('w-full');
  }

  classNames.push(...paddings[size][children == null]);

  if (title != null) {
    buttonProps.title = title;
  }

  if (innerRef != null) {
    buttonProps.ref = innerRef;
  }

  if (onClick != null) {
    buttonProps.onClick = onClick;
  }

  if (children != null && icon != null) {
    classNames.push('inline-flex', 'items-center', 'space-x-2');
  }

  classNames.push(...shapes[shape][size]);
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
      {icon && <span>{icon}</span>}
      {!loading && children && <span className="min-w-0">{children}</span>}
    </RenderAs>
  );
}

Button.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  className: PropTypes.string,
  danger: PropTypes.bool,
  disabled: PropTypes.bool,
  full: PropTypes.bool,
  htmlType: PropTypes.oneOf(['button', 'submit']),
  icon: PropTypes.element,
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
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
  className: '',
  disabled: false,
  danger: false,
  full: false,
  htmlType: 'button',
  icon: null,
  innerRef: null,
  loading: false,
  shape: 'round',
  size: 'sm',
  title: null,
  type: 'default',
  onclick: null,
};

export default Button;
