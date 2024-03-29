import React from 'react';
import PropTypes from 'prop-types';

const fontBySize = {
  xs: {
    label: 'text-xs sm:text-xs',
    input: 'text-sm sm: text-xs',
  },
  sm: {
    label: 'text-sm sm:text-xs',
    input: 'text-base sm:text-sm',
  },
  base: {
    label: 'text-base sm:text-sm',
    input: 'text-lg sm:text-base',
  },
};

const paddingsBySize = {
  sm: 'px-3 py-2',
  base: 'px-3 py-2',
};

const borderByVariant = {
  default: 'group-first/input:border-r-0 border',
  filled: 'border-none',
};

const colorsByVariant = {
  default: 'text-gray-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-400',
  filled:
    'text-gray-900 bg-gray-100 dark:text-zinc-400 dark:bg-zinc-900 dark:placeholder:text-zinc-500',
};

function Input({
  autoFocus,
  defaultValue,
  disabled,
  error,
  id,
  label,
  name,
  placeholder,
  readOnly,
  size,
  type,
  variant,
  onChange,
}) {
  const colors = colorsByVariant[variant];
  const border = borderByVariant[variant];
  const borderColor = error
    ? 'border-red-400 focus:border-red-400 focus:ring-red-200 dark:border-rose-500 dark:focus:border-rose-300 dark:focus:ring-rose-500'
    : 'border-gray-300 focus:ring-blue-100 focus:border-blue-300 dark:border-zinc-600 dark:focus:ring-indigo-500 dark:focus:border-indigo-300';

  const inputProps = {};
  if (placeholder != null) {
    inputProps.placeholder = placeholder;
  }
  if (defaultValue != null) {
    inputProps.defaultValue = defaultValue;
  }
  if (name != null) {
    inputProps.name = name;
  }
  return (
    <div className="w-full">
      {label && (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label
          htmlFor={id}
          className={`mb-1 block text-left font-medium text-gray-700 dark:text-zinc-200 ${fontBySize[size].label}`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={type}
          readOnly={readOnly}
          disabled={disabled}
          className={`group-first/input:rounded-l-lg group-first/input:rounded-r-none w-full rounded-lg ${paddingsBySize[size]} ${colors} ${fontBySize[size].input} ${border} ${borderColor} focus:outline-none focus:ring`}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={autoFocus}
          onChange={onChange}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...inputProps}
        />
      </div>
      {error != null && (
        <p className="mt-3 text-xs italic text-red-500 dark:text-rose-500">{error}</p>
      )}
    </div>
  );
}

Input.propTypes = {
  autoFocus: PropTypes.bool,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  size: PropTypes.oneOf(['xs', 'sm', 'base']),
  type: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'filled']),
  onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  autoFocus: false,
  defaultValue: null,
  disabled: false,
  error: null,
  label: null,
  name: null,
  placeholder: null,
  readOnly: false,
  size: 'base',
  type: 'text',
  variant: 'default',
};

export default Input;
