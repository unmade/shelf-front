import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { getFileById } from '../store/reducers/files';

import FileIcon from './FileIcon';
import { getAccessToken } from '../store/reducers/auth';
import ProtectedImage from './ui/ProtectedImage';

function Thumbnail({ className, fileId, size }) {
  const accessToken = useSelector(getAccessToken);
  const file = useSelector((state) => getFileById(state, fileId));
  const { mtime, thumbnail_url: thumbnailUrl } = file;

  const fileIcon = (
    <FileIcon className={className} mediatype={file.mediatype} hidden={file.hidden} />
  );

  if (thumbnailUrl != null) {
    const src = new URL(thumbnailUrl);
    src.searchParams.set('size', size);
    src.searchParams.set('mtime', mtime);
    return (
      <ProtectedImage
        className={`object-scale-down ${className}`}
        src={src.toString()}
        alt={file.name}
        accessToken={accessToken}
      >
        {fileIcon}
      </ProtectedImage>
    );
  }
  return fileIcon;
}

Thumbnail.propTypes = {
  className: PropTypes.string,
  fileId: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'xxl']),
};

Thumbnail.defaultProps = {
  className: '',
  size: 'xs',
};

export default Thumbnail;
