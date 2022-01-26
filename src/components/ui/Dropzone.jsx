import React from 'react';
import PropType from 'prop-types';

import getFileEntries from '../../filereader';

class Dropzone extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
    };

    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setDragging(true);
  }

  handleDragLeave(event) {
    event.preventDefault();
    this.setDragging(false);
  }

  handleDrop(event) {
    event.preventDefault();
    this.setDragging(false);

    const { uploadTo, onDrop } = this.props;
    const { items } = event.dataTransfer;
    getFileEntries(items).then((files) => {
      if (onDrop) {
        onDrop(files, uploadTo);
      }
    });
  }

  setDragging(value) {
    const { dragging } = this.state;
    if (dragging !== value) {
      this.setState({ dragging: value });
    }
  }

  render() {
    const { dragging } = this.state;
    const { className, render: View } = this.props;

    return (
      <div
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
        onDrop={this.handleDrop}
        className={className}
      >
        <View dragging={dragging} />
      </div>
    );
  }
}

Dropzone.propTypes = {
  uploadTo: PropType.string,
  className: PropType.string,
  onDrop: PropType.func,
  render: PropType.func.isRequired,
};

Dropzone.defaultProps = {
  uploadTo: '',
  className: '',
  onDrop: null,
};

export default Dropzone;
