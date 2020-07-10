import React from 'react';
import PropType from 'prop-types';

function ProgressBar({ progress }) {
  const fillerStyles = {
    width: `${progress}%`,
    transition: 'width 0.3s ease-in-out',
  };
  const fillerColor = (progress < 100) ? 'bg-indigo-500' : 'bg-green-500';

  return (
    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
      <div
        style={fillerStyles}
        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${fillerColor}`}
      />
    </div>
  );
}

ProgressBar.propTypes = {
  progress: PropType.number.isRequired,
};

export default ProgressBar;
