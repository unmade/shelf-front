import React from 'react';
import PropType from 'prop-types';

function ProgressBar({ progress }) {
  const fillerStyles = {
    width: `${progress}%`,
    transition: 'width 0.3s ease-in-out',
  };
  const fillerColor = progress < 100 ? 'bg-indigo-500' : 'bg-emerald-500';

  return (
    <div className="flex h-2 overflow-hidden rounded bg-gray-200 text-xs">
      <div
        style={fillerStyles}
        className={`flex flex-col justify-center whitespace-nowrap text-center text-white shadow-none ${fillerColor}`}
      />
    </div>
  );
}

ProgressBar.propTypes = {
  progress: PropType.number.isRequired,
};

export default ProgressBar;
