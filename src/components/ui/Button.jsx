import React from 'react';

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

const shapes = {
  circle: ['rounded-full'],
  round: ['rounded-md'],
};

function Button({
  children, danger, icon, shape, size, title, type, onClick,
}) {
  const buttonProps = {};
  const classNames = [`text-${size}`, 'rounded-md', 'focus:outline-none', 'focus:ring', 'transition', 'ease-in-out', 'duration-75'];

  if (children === null || children === undefined) {
    classNames.push('p-1');
  } else {
    classNames.push('px-3', 'py-1');
  }

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
      type="button"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...buttonProps}
    >
      {(icon) && (
        <span>{icon}</span>
      )}
      {(children) && (
        <span>{children}</span>
      )}
    </button>
  );
}

Button.defaultProps = {
  danger: false,
  shape: 'round',
  size: 'sm',
};

export default Button;
