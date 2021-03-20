import React from 'react';
import PropTypes from 'prop-types';

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
    if (!visible) {
      return null;
    }
    return (
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
