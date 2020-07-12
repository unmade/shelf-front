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
    this.trigger = React.Children.only(props.children);

    this.triggerRef = React.createRef();
    this.popoverRef = React.createRef();

    this.openPopover = this.openPopover.bind(this);
    this.closePopover = this.closePopover.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentWillUnmount() {
    if (this.popper) {
      this.popper.destroy();
    }
    document.removeEventListener('mousedown', this.handleClickOutside);
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
      document.addEventListener('mousedown', this.handleClickOutside);
    }
    this.setPopoverVisible(true);
  }

  closePopover() {
    this.setPopoverVisible(false);
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.triggerRef && !this.triggerRef.current.contains(event.target)) {
      this.closePopover();
    }
  }

  render() {
    const { overlay } = this.props;
    const { popoverVisible } = this.state;

    return (
      <>
        <div
          ref={this.triggerRef}
          onClick={popoverVisible ? this.closePopover : this.openPopover}
        >
          {this.trigger}
        </div>
        <div
          ref={this.popoverRef}
          className="z-50"
        >
          {(popoverVisible) && (
            overlay
          )}
        </div>
      </>
    );
  }
}

Dropdown.propTypes = {
  children: PropTypes.element.isRequired,
  overlay: PropTypes.element.isRequired,
};

export default Dropdown;
