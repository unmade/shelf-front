import React, { useRef, useState } from 'react';
import PropType from 'prop-types';

import getFileEntries from '../../filereader';

function Dropzone({ className, render: View, uploadTo, onDrop }) {
  const [dragging, setDragging] = useState(false);

  const dropRef = useRef(null);

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.target !== dropRef.current) {
      setDragging(true);
    }
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (dropRef.current?.contains(event.target)) {
      setDragging(false);
    }
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    setDragging(false);

    const { items } = event.dataTransfer;
    const files = await getFileEntries(items);
    if (onDrop) {
      onDrop({ files, uploadTo });
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={className}
    >
      <View innerRef={dropRef} dragging={dragging} />
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
