import React from 'react';
import PropTypes from 'prop-types';

import { Switch as UISwitch } from '@headlessui/react';

const sizes = {
  sm: {
    inner: 'h-4 w-4 sm:h-3 sm:w-3',
    outter: 'h-5 w-10 sm:h-4 sm:w-8',
    translate: 'translate-x-5 sm:translate-x-4',
  },
  base: {
    inner: 'h-5 w-5 sm:h-4 sm:w-4',
    outter: 'h-6 w-12 sm:h-5 sm:w-10',
    translate: 'translate-x-6 sm:translate-x-5',
  },
};

function Switch({ enabled, size, setEnabled }) {
  const { inner, outter, translate } = sizes[size];
  return (
    <UISwitch
      checked={enabled}
      onChange={setEnabled}
      className={`${enabled ? 'bg-teal-500 dark:bg-teal-600' : 'bg-gray-400 dark:bg-zinc-600'}
       relative inline-flex ${outter} shrink-0 cursor-pointer rounded-lg border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${enabled ? translate : 'translate-x-0'}
        pointer-events-none inline-block ${inner} transform rounded-md bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </UISwitch>
  );
}

Switch.propTypes = {
  enabled: PropTypes.bool.isRequired,
  size: PropTypes.oneOf(['sm', 'base']),
  setEnabled: PropTypes.func.isRequired,
};

Switch.defaultProps = {
  size: 'base',
};

export default Switch;
