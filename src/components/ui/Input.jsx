import React from 'react';
import PropTypes from 'prop-types';

function Input({
  autoFocus, defaultValue, error, id, label, placeholder, type, onChange,
}) {
  const borderColor = (error) ? 'border-red-500' : 'border-gray-300';
  const inputProps = {};
  if (placeholder !== null && placeholder !== undefined) {
    inputProps.placeholder = placeholder;
  }
  if (defaultValue !== null && defaultValue !== undefined) {
    inputProps.defaultValue = defaultValue;
  }
  return (
    <>
      {(label) && (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label htmlFor={id} className="block text-xs font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="w-64 mt-1 relative rounded-md shadow-sm">
        <input
          id={id}
          type={type}
          className={`w-full p-1 text-gray-800 text-sm border ${borderColor} rounded focus:outline-none focus:ring`}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={autoFocus}
          onChange={onChange}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...inputProps}
        />
      </div>
      {error && (
        <p className="text-red-500 text-xs italic mt-3">{error}</p>
      )}
    </>
  );
}

Input.propTypes = {
  autoFocus: PropTypes.bool,
  defaultValue: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  autoFocus: false,
  defaultValue: null,
  error: null,
  label: null,
  placeholder: null,
  type: 'text',
};

export default Input;
