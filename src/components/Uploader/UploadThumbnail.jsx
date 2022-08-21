import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getUploadById } from '../../store/reducers/uploads';

import FileIcon from '../FileIcon';

function UploadThumbnail({ className, uploadId }) {
  const upload = useSelector((state) => getUploadById(state, uploadId));
  if (upload.thumbnail !== null) {
    return (
      <img className={`object-scale-down ${className}`} src={upload.thumbnail} alt={upload.name} />
    );
  }
  return <FileIcon className={className} mediatype={upload.mediatype} />;
}

UploadThumbnail.propTypes = {
  className: PropTypes.string,
  uploadId: PropTypes.string.isRequired,
};

UploadThumbnail.defaultProps = {
  className: '',
};

export default UploadThumbnail;
