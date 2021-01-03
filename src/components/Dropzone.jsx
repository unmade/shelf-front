import React from 'react';
import PropType from 'prop-types';

import { v4 as uuidv4 } from 'uuid';

import getFileEntries from '../filereader';

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

  setDragging(value) {
    const { dragging } = this.state;
    if (dragging !== value) {
      this.setState({ dragging: value });
    }
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

    const { baseDir, onDrop } = this.props;
    const { items } = event.dataTransfer;
    getFileEntries(items).then(
      (files) => {
        if (onDrop) {
          onDrop(files.map((file) => ({
            id: uuidv4(),
            name: file.name,
            baseDir,
            fileObj: null,
            fileEntry: file,
          })));
        }
      },
    );
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
  baseDir: PropType.string,
  className: PropType.string,
  onDrop: PropType.func,
  render: PropType.func.isRequired,
};

Dropzone.defaultProps = {
  baseDir: '.',
  className: '',
  onDrop: null,
};

export default Dropzone;