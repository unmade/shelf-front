import React from 'react';
import PropTypes from 'prop-types';

import { useFloating, offset } from '@floating-ui/react-dom';
import { Popover, Transition } from '@headlessui/react';

function OverlayWrapper({ children, open, onOpenChange }) {
  React.useEffect(() => {
    if (onOpenChange != null) {
      onOpenChange(open);
    }
  }, [open, onOpenChange]);

  return children;
}

OverlayWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
    .isRequired,
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func,
};

OverlayWrapper.defaultProps = {
  onOpenChange: null,
};

function Dropdown({ children, overlay: Overlay, onOpenChange }) {
  const { x, y, reference, floating, strategy } = useFloating({
    placement: 'bottom-end',
    middleware: [offset(0, 5)],
  });

  return (
    <Popover className="flex items-center">
      {({ open }) => (
        <>
          <Popover.Button
            ref={reference}
            className="w-full rounded-xl ring-offset-2 focus:outline-none focus:ring"
          >
            {children}
          </Popover.Button>

          <Transition
            show={open}
            className="z-10"
            enter="transition ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Popover.Panel
              static
              ref={floating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
              }}
            >
              <OverlayWrapper open={open} onOpenChange={onOpenChange}>
                <Overlay />
              </OverlayWrapper>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

Dropdown.propTypes = {
  children: PropTypes.element.isRequired,
  overlay: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  onOpenChange: PropTypes.func,
};

Dropdown.defaultProps = {
  onOpenChange: null,
};

export default Dropdown;
