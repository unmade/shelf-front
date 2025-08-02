import React from 'react';
import PropTypes from 'prop-types';

import { Children } from '../../types';

function InputGroup({ children, error }) {
  return (
    <>
      <div>
        <div className="group/input flex -space-x-px">{children}</div>
      </div>

      {error != null && (
        <p className="mt-3 text-xs text-red-500 italic dark:text-rose-500">{error}</p>
      )}
    </>
  );
}

InputGroup.propTypes = {
  children: Children.isRequired,
  error: PropTypes.string,
};

InputGroup.defaultProps = {
  error: null,
};

export default InputGroup;
