import React from 'react';
import PropTypes from 'prop-types';

import FileIcon from '../FileIcon';

function ImagePreview({ file, original }) {
  if (original) {
    return <img className="h-full w-full object-scale-down" src={original} alt={file.name} />;
  }
  return <FileIcon className="h-48 w-48" mediatype={file.mediatype} hidden={file.hidden} />;
}

ImagePreview.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string.isRequired,
    hidden: PropTypes.bool.isRequired,
    mediatype: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImagePreview;
