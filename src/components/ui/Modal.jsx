import React from 'react';
import PropTypes from 'prop-types';

import { Transition } from '@headlessui/react';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleClickOutside() {
    const { onClose } = this.props;
    if (onClose !== null) {
      onClose();
    }
  }

  handleKeyUp(event) {
    const { onClose } = this.props;
    const { keyCode } = event;
    if (keyCode === 27 && onClose !== null) { // close on ESC
      onClose();
    }
  }

  render() {
    const { children, visible } = this.props;
    return (
      <Transition
        show={visible}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={this.handleClickOutside}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75 blur" />
            </div>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <div
              onKeyUp={this.handleKeyUp}
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full sm:w-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              {children}
            </div>
          </div>
        </div>
      </Transition>
    );
  }
}

Modal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};

Modal.defaultProps = {
  visible: false,
  onClose: null,
};

export default Modal;
