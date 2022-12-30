import React from 'react';
import PropTypes from 'prop-types';

function Property({ name, value }) {
  return (
    <div className="flex justify-between py-3">
      <p className="text-gray-500 dark:text-zinc-400">{name}</p>
      <p>{value}</p>
    </div>
  );
}

Property.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
};

export default Property;
