import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectUploadById } from '../../store/uploads';

import FileIcon from '../FileIcon';

function UploadThumbnail({ className, uploadId }) {
  const { name, mediatype, thumbnail } = useSelector((state) => selectUploadById(state, uploadId));
  if (thumbnail != null) {
    return <img className={`object-scale-down ${className}`} src={thumbnail} alt={name} />;
  }
  return <FileIcon className={className} mediatype={mediatype} />;
}

UploadThumbnail.propTypes = {
  className: PropTypes.string,
  uploadId: PropTypes.string.isRequired,
};

UploadThumbnail.defaultProps = {
  className: '',
};

export default UploadThumbnail;
