import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.modalRef = React.createRef();

    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleClickOutside);
  }

  handleClickOutside(event) {
    const { onClose } = this.props;
    if (onClose) {
      const shouldClose = this.modalRef && !this.modalRef.current.contains(event.target);
      if (shouldClose) {
        onClose();
      }
    }
  }

  handleKeyUp(event) {
    const { onClose } = this.props;
    const { keyCode } = event;
    if (keyCode === 27 && onClose) { // close on ESC
      onClose();
    }
  }

  render() {
    const { children, visible } = this.props;
    if (!visible) {
      return null;
    }
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        className="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center"
        onClick={this.handleClickOutside}
        onKeyUp={this.handleKeyUp}
      >
        <div ref={this.modalRef} className="z-50">
          {children}
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-gray-900" />
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
