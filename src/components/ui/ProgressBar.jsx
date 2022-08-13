import React from 'react';
import PropTypes from 'prop-types';

const colorByVariant = {
  danger: 'bg-gradient-to-r from-red-500 to-rose-500',
  info: 'bg-gradient-to-r from-blue-500 to-indigo-500',
  success: 'bg-gradient-to-r from-teal-500 to-emerald-500',
  warning: 'bg-gradient-to-r from-yellow-500 to-orange-500',
};

const DEFAULT_VARIANT = 'info';

function ProgressBar({ progress, danger, info, success, warning }) {
  const fillerStyles = {
    width: `${progress}%`,
    transition: 'width 0.3s ease-in-out',
  };

  const variants = { danger, info, success, warning };
  const variant =
    Object.keys(variants).filter((key) => variants[key] === true)[0] ?? DEFAULT_VARIANT;

  return (
    <div className="flex h-2 overflow-hidden rounded bg-gray-200 text-xs">
      <div
        style={fillerStyles}
        className={`flex flex-col justify-center whitespace-nowrap rounded text-center text-white shadow-none ${colorByVariant[variant]}`}
      />
    </div>
  );
}

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  danger: PropTypes.bool,
  info: PropTypes.bool,
  success: PropTypes.bool,
  warning: PropTypes.bool,
};

ProgressBar.defaultProps = {
  danger: false,
  info: false,
  success: false,
  warning: false,
};

export default ProgressBar;
