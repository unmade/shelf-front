/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

import { Transition } from '@headlessui/react';
import { createPopper } from '@popperjs/core';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      popoverVisible: false,
    };

    this.popper = null;
    this.trigger = null;

    this.triggerRef = React.createRef();
    this.popoverRef = React.createRef();

    this.openPopover = this.openPopover.bind(this);
    this.closePopover = this.closePopover.bind(this);
    this.togglePopover = this.togglePopover.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentWillUnmount() {
    if (this.popper) {
      this.popper.destroy();
    }
    document.removeEventListener('mouseup', this.handleClickOutside);
  }

  handleClickOutside(event) {
    const shouldClose = (
      this.triggerRef && !this.triggerRef.current.contains(event.target)
      && this.popoverRef && !this.popoverRef.current.contains(event.target)
    );
    if (shouldClose) {
      this.closePopover();
    }
  }

  setPopoverVisible(value) {
    this.setState({ popoverVisible: value });
  }

  openPopover() {
    this.setPopoverVisible(true);
  }

  closePopover() {
    this.setPopoverVisible(false);
    document.removeEventListener('mouseup', this.handleClickOutside);
  }

  togglePopover(event) {
    event.stopPropagation();
    const { popoverVisible } = this.state;
    if (popoverVisible) {
      this.closePopover();
    } else {
      this.openPopover();
    }
  }

  render() {
    const { children, overlay: Overlay, overlayProps } = this.props;
    const { popoverVisible } = this.state;

    return (
      <>
        <div
          ref={this.triggerRef}
          onClick={this.togglePopover}
        >
          {children}
        </div>
        <div
          ref={this.popoverRef}
          className="absolute z-50"
        >
          <Transition
            show={popoverVisible}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
            afterEnter={() => {
              if (this.popper === null || this.popper === undefined) {
                createPopper(
                  this.triggerRef.current,
                  this.popoverRef.current,
                  {
                    placement: 'bottom-start',
                  },
                );
                document.addEventListener('mouseup', this.handleClickOutside);
              }
            }}
          >
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Overlay closeOverlay={this.closePopover} {...overlayProps} />
          </Transition>
        </div>
      </>
    );
  }
}

Dropdown.propTypes = {
  children: PropTypes.element.isRequired,
  overlay: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  overlayProps: PropTypes.objectOf(PropTypes.any),
};

Dropdown.defaultProps = {
  overlayProps: {},
};

export default Dropdown;
