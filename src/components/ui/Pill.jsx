import React from 'react';
import PropTypes from 'prop-types';

function Pill({ children, title, active, onClick }) {
  let styles;
  if (active) {
    styles = 'text-blue-500 font-semibold bg-blue-100 hover:bg-blue-200';
  } else {
    styles = 'hover:bg-blue-200 hover:text-blue-600';
  }
  return (
    <button
      type="button"
      className={`rounded-xl py-1 px-2 ${styles} focus:outline-none focus:ring`}
      title={title}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Pill.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  title: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

Pill.defaultProps = {
  title: null,
  active: false,
  onClick: () => {},
};

export default Pill;
