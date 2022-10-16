import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import { thumbnailCached } from '../store/actions/thumbnails';

import { getAccessToken } from '../store/reducers/auth';
import { getFileById } from '../store/reducers/files';
import { getThumbnailById } from '../store/reducers/thumbnails';

import ProtectedImage from './ui/ProtectedImage';

import FileIcon from './FileIcon';

function Thumbnail({ className, fileId, size }) {
  const dispatch = useDispatch();

  const accessToken = useSelector(getAccessToken);
  const cachedThumbnail = useSelector((state) => getThumbnailById(state, fileId));

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
        cachedImage={cachedThumbnail && cachedThumbnail[size]}
        onLoad={(data) => {
          dispatch(thumbnailCached(fileId, size, URL.createObjectURL(data)));
        }}
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
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']),
};

Thumbnail.defaultProps = {
  className: '',
  size: 'xs',
};

export default Thumbnail;
