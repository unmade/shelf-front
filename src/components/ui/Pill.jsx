import React from 'react';
import PropTypes from 'prop-types';

function Pill({ children, title, active }) {
  let styles;
  if (active) {
    styles = 'text-white font-semibold bg-blue-500 hover:bg-blue-500';
  } else {
    styles = 'hover:bg-blue-100 hover:text-blue-800';
  }
  return (
    <button
      type="button"
      className={`py-1 px-2 rounded-md ${styles}`}
      title={title}
    >
      {children}
    </button>
  );
}

Pill.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  title: PropTypes.string,
  active: PropTypes.bool,
};

Pill.defaultProps = {
  title: null,
  active: false,
};

export default Pill;
