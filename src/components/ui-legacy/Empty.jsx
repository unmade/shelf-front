import React from 'react';
import PropTypes from 'prop-types';

function Empty({ className, description, icon, title }) {
  return (
    <div className={`flex flex-1 flex-col items-center justify-center ${className}`}>
      {icon}
      <p className="mt-4 text-lg font-semibold text-gray-800 dark:text-zinc-200">{title}</p>
      {description && <p className="text-sm text-gray-600 dark:text-zinc-400">{description}</p>}
    </div>
  );
}

Empty.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
};

Empty.defaultProps = {
  className: '',
  description: null,
  icon: null,
};

export default Empty;
