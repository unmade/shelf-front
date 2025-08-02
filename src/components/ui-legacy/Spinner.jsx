import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../../icons';

function Spinner({ className }) {
  return (
    <div className={`flex ${className} items-center justify-center`}>
      <icons.Spinner className="h-5 w-5 animate-spin text-gray-600 dark:text-zinc-300" />
    </div>
  );
}

Spinner.propTypes = {
  className: PropTypes.string,
};

Spinner.defaultProps = {
  className: '',
};

export default Spinner;
