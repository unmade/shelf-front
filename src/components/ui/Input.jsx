import React from 'react';
import PropTypes from 'prop-types';

const fontSizes = {
  sm: {
    label: 'text-sm sm:text-xs',
    input: 'text-base sm:text-sm',
  },
  base: {
    label: 'text-base sm:text-sm',
    input: 'text-lg sm:text-base',
  },
};

const paddings = {
  sm: 'px-3 py-2 sm:p-1',
  base: 'px-3 py-2',
};

function Input({
  autoFocus, defaultValue, error, id, label, name, placeholder, size, type, onChange,
}) {
  const borderColor = (error) ? (
    'border-red-400 focus:ring-red-200 focus:border-red-400'
  ) : (
    'border-gray-300 focus:ring-blue-100 focus:border-blue-300'
  );
  const inputProps = {};
  if (placeholder !== null && placeholder !== undefined) {
    inputProps.placeholder = placeholder;
  }
  if (defaultValue !== null && defaultValue !== undefined) {
    inputProps.defaultValue = defaultValue;
  }
  if (name !== null) {
    inputProps.name = name;
  }
  return (
    <div>
      {(label) && (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label htmlFor={id} className={`mb-1 block font-medium text-left text-gray-700 ${fontSizes[size].label}`}>
          {label}
        </label>
      )}
      <div className="relative rounded-md shadow-sm">
        <input
          id={id}
          type={type}
          className={`w-full ${paddings[size]} text-gray-800 ${fontSizes[size].input} border ${borderColor} rounded-xl focus:outline-none focus:ring`}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={autoFocus}
          onChange={onChange}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...inputProps}
        />
      </div>
      {error !== null && error !== undefined && (
        <p className="text-red-500 text-xs italic mt-3">{error}</p>
      )}
    </div>
  );
}

Input.propTypes = {
  autoFocus: PropTypes.bool,
  defaultValue: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'base']),
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  autoFocus: false,
  defaultValue: null,
  error: null,
  label: null,
  name: null,
  placeholder: null,
  size: 'base',
  type: 'text',
};

export default Input;
