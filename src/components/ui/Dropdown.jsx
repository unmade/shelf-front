import React from 'react';
import PropTypes from 'prop-types';

import { Popover, Transition } from '@headlessui/react';
import { usePopper } from 'react-popper';

function Dropdown({ children, overlay: Overlay }) {
  const [referenceElement, setReferenceElement] = React.useState();
  const [popperElement, setPopperElement] = React.useState();
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 5],
        },
      },
    ],
  });

  return (
    <Popover className="flex items-center">
      {({ open }) => (
        <>
          <Popover.Button
            ref={setReferenceElement}
            className="w-full rounded-md focus:outline-none focus:ring"
          >
            {children}
          </Popover.Button>

          <Transition
            show={open}
            className="z-10"
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              static
              ref={setPopperElement}
              style={styles.popper}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...attributes.popper}
            >
              <Overlay />
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

Dropdown.propTypes = {
  children: PropTypes.element.isRequired,
  overlay: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

export default Dropdown;
