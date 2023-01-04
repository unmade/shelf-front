import React from 'react';
import PropTypes from 'prop-types';

import { Switch as UISwitch } from '@headlessui/react';

function Switch({ enabled, setEnabled }) {
  return (
    <UISwitch
      checked={enabled}
      onChange={setEnabled}
      className={`${enabled ? 'bg-teal-500 dark:bg-teal-600' : 'bg-gray-400 dark:bg-zinc-600'}
      relative inline-flex h-6 w-12 sm:h-5 sm:w-10 shrink-0 cursor-pointer rounded-lg border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${enabled ? 'translate-x-6 sm:translate-x-5' : 'translate-x-0'}
        pointer-events-none inline-block h-5 w-5 sm:h-4 sm:w-4 transform rounded-md bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </UISwitch>
  );
}

Switch.propTypes = {
  enabled: PropTypes.bool.isRequired,
  setEnabled: PropTypes.func.isRequired,
};

export default Switch;
