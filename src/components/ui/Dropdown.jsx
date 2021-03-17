/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

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

  setPopoverVisible(value) {
    this.setState({ popoverVisible: value });
  }

  openPopover() {
    if (!this.popper) {
      createPopper(
        this.triggerRef.current,
        this.popoverRef.current,
        {
          placement: 'bottom-start',
        },
      );
      document.addEventListener('mouseup', this.handleClickOutside);
    }
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

  handleClickOutside(event) {
    const shouldClose = (
      this.triggerRef && !this.triggerRef.current.contains(event.target)
      && this.popoverRef && !this.popoverRef.current.contains(event.target)
    );
    if (shouldClose) {
      this.closePopover();
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
          {(popoverVisible) && (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Overlay closeOverlay={this.closePopover} {...overlayProps} />
          )}
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
