import React from 'react';
import PropType from 'prop-types';

import getFileEntries from '../../filereader';

function Dropzone({ className, render: View, uploadTo, onDrop }) {
  const [dragging, setDragging] = React.useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);

    const { items } = event.dataTransfer;
    getFileEntries(items).then((files) => {
      if (onDrop) {
        onDrop(files, uploadTo);
      }
    });
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={className}
    >
      <View dragging={dragging} />
    </div>
  );
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
