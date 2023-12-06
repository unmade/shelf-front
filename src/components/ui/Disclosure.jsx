import React from 'react';
import PropTypes from 'prop-types';

import { Disclosure as UIDisclosure, Transition } from '@headlessui/react';

import * as icons from '../../icons';

function Disclosure({ className, title, panel }) {
  return (
    <UIDisclosure>
      {({ open }) => (
        <>
          <UIDisclosure.Button className={className}>
            <div className="flex w-full justify-between">
              {title}
              {open ? (
                <icons.ChevronDown className="w-5 h-5 lg:hidden xl:block" />
              ) : (
                <icons.ChevronRight className="w-5 h-5 lg:hidden xl:block" />
              )}
            </div>
          </UIDisclosure.Button>

          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <UIDisclosure.Panel static>{panel}</UIDisclosure.Panel>
          </Transition>
        </>
      )}
    </UIDisclosure>
  );
}

Disclosure.propTypes = {
  className: PropTypes.string.isRequired,
  panel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
};

export default Disclosure;
