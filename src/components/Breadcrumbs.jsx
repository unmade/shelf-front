import React from 'react';
import PropTypes from 'prop-types';

const smallText = 'text-xs space-x-1';
const largeText = 'text-xl space-x-2';

function Breadcrumbs({ children, size }) {
  const classes = (size === 'small') ? smallText : largeText;

  return (
    <nav className={`flex flex-row items-center ${classes} text-gray-600`}>
      {(children.length) ? (
        children.map((child, idx) => (
          <React.Fragment key={child.key}>
            {child}
            {(idx !== (children.length - 1)) && <span>&#8250;</span>}
          </React.Fragment>
        ))
      ) : (
        children
      )}
    </nav>
  );
}

Breadcrumbs.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  size: PropTypes.oneOf(['small', 'large']),
};

Breadcrumbs.defaultProps = {
  size: 'large',
};

export default Breadcrumbs;
