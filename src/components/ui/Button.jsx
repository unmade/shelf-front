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
    primary: [
      'bg-white dark:bg-zinc-700',
      'text-gray-700 dark:text-zinc-200',
      'border-gray-300 dark:border-zinc-600',
      'hover:text-gray-600 dark:hover:text-zinc-300',
      'dark:focus:ring-zinc-700',
    ],
    danger: [
      'bg-white dark:bg-transparent',
      'text-red-600 dark:text-rose-500',
      'border-red-400 dark:border-rose-500',
    ],
    success: [
      'bg-white dark:bg-transparent',
      'text-emerald-600 dark:text-teal-500',
      'border-emerald-400 dark:border-teal-500',
    ],
  },
  primary: {
    primary: [
      'bg-gradient-to-br',
      'from-blue-400 dark:from-blue-500/90',
      'to-indigo-400 dark:to-indigo-500/90',
      'text-white',
      'hover:from-blue-300 dark:hover:from-blue-500',
      'hover:to-indigo-400 dark:hover:to-indigo-500',
      'shadow',
      'dark:focus:ring-indigo-700',
    ],
    danger: [
      'bg-gradient-to-br',
      'from-red-400 dark:from-rose-500/90',
      'to-rose-400 dark:to-red-500/90',
      'hover:from-red-300 dark:hover:from-rose-500',
      'dark:hover:to-red-500',
      'text-red-50 hover:text-white',
      'shadow',
      'ring-rose-300 dark:focus:ring-rose-700',
    ],
    success: [
      'text-emerald-50',
      'bg-gradient-to-br from-teal-300 to-emerald-400',
      'hover:bg-gray-100 hover:from-teal-300/90 hover:to-emerald-400/90',
      'dark:from-teal-500 dark:to-emerald-600',
      'dark:hover:from-teal-500 dark:hover:to-emerald-500',
      'shadow',
      'dark:focus:ring-teal-700',
    ],
  },
  text: {
    primary: [
      'text-gray-700',
      'hover:bg-gray-50',
      'dark:text-zinc-300',
      'dark:hover:bg-zinc-700/30',
      'dark:focus:ring-zinc-700',
    ],
    danger: [
      'text-red-600',
      'hover:bg-red-50',
      'dark:text-rose-500',
      'dark:hover:bg-rose-700/30',
      'dark:focus:ring-rose-800',
    ],
    success: [
      'text-emerald-600',
      'hover:bg-emerald-50',
      'dark:text-teal-500',
      'dark:hover:bg-teal-700/30',
      'dark:focus:ring-teal-800',
    ],
  },
};

const fontBySize = {
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
  color,
  disabled,
  full,
  icon,
  innerRef,
  loading,
  shape,
  size,
  title,
  type,
  variant,
  onClick,
}) {
  const buttonProps = { disabled };
  const classNames = [
    className,
    fontBySize[size],
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
  classNames.push(...classNamesByType[variant]);
  classNames.push(...colors[variant][color]);
  buttonProps.className = classNames.join(' ');
  if (loading) {
    buttonProps.disabled = true;
    buttonProps.className = `${buttonProps.className} opacity-50 cursor-wait`;
    return (
      <button
        // eslint-disable-next-line react/button-has-type
        type={type}
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
  color: PropTypes.oneOf(['primary', 'danger']),
  disabled: PropTypes.bool,
  full: PropTypes.bool,
  icon: PropTypes.element,
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  loading: PropTypes.bool,
  shape: PropTypes.oneOf(['circle', 'round']),
  size: PropTypes.oneOf(['xs', 'sm', 'base', 'lg']),
  title: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit']),
  variant: PropTypes.oneOf(['primary', 'default', 'text', 'success']),
  onclick: PropTypes.func,
};

Button.defaultProps = {
  as: 'button',
  children: null,
  className: '',
  color: 'primary',
  disabled: false,
  full: false,
  icon: null,
  innerRef: null,
  loading: false,
  shape: 'round',
  size: 'sm',
  title: null,
  type: 'button',
  variant: 'default',
  onclick: null,
};

export default Button;
