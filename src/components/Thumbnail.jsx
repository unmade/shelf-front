import React from 'react';
import PropTypes from 'prop-types';

import FileIcon from './FileIcon';

function Thumbnail({
  className, deferred, file, size, thumbs, fetchThumbnail,
}) {
  const { id, path } = file;
  const hasThumbnail = (thumbs !== null && thumbs[size] !== null && thumbs[size] !== undefined);
  React.useEffect(() => {
    if (!hasThumbnail && !deferred) {
      fetchThumbnail(id, path, size);
    }
  }, [id, path, size, deferred, hasThumbnail, fetchThumbnail]);

  if (!hasThumbnail) {
    return <FileIcon className={className} mediatype={file.mediatype} hidden={file.hidden} />;
  }
  return <img className={`object-contain ${className}`} src={thumbs[size]} alt={file.name} />;
}

Thumbnail.propTypes = {
  className: PropTypes.string,
  deferred: PropTypes.bool,
  file: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    mediatype: PropTypes.string.isRequired,
  }).isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  thumbs: PropTypes.shape({
    xs: PropTypes.string,
    sm: PropTypes.string,
    md: PropTypes.string,
    lg: PropTypes.string,
    xl: PropTypes.string,
  }),
  fetchThumbnail: PropTypes.func.isRequired,
};

Thumbnail.defaultProps = {
  className: '',
  deferred: false,
  size: 'xs',
  thumbs: null,
};

export default Thumbnail;
