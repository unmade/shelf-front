import React from 'react';
import PropTypes from 'prop-types';

import FileIcon from './FileIcon';

function Thumbnail({
  className, file, size, thumbs, fetchThumbnail,
}) {
  if (thumbs === null || thumbs === undefined || thumbs[size] === null || thumbs[size] === undefined) {
    const { id, path } = file;
    fetchThumbnail(id, path, size);
    return <FileIcon className={className} mediatype={file.mediatype} hidden={file.hidden} />;
  }
  return <img className={`object-contain ${className}`} src={thumbs[size]} alt={file.name} />;
}

Thumbnail.propTypes = {
  className: PropTypes.string,
  file: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    mediatype: PropTypes.string.isRequired,
  }).isRequired,
  size: PropTypes.string,
};

Thumbnail.defaultProps = {
  className: '',
  size: 'xs',
};

export default Thumbnail;
