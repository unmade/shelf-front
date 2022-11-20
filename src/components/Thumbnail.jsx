import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import { selectAccessToken } from '../store/auth';
import { thumbnailCached } from '../store/actions/thumbnails';
import { getThumbnailById } from '../store/reducers/thumbnails';

import { FileShape } from '../types';

import ProtectedImage from './ui/ProtectedImage';

import FileIcon from './FileIcon';
import useFileContent from '../hooks/file-content';
import { MEGABYTE } from '../filesize';
import { MediaType } from '../constants';

function SVGThumbnail({ className, file }) {
  const content = useFileContent(file.path, file.size, MEGABYTE);

  if (content == null) {
    return <FileIcon className={className} mediatype={file.mediatype} hidden={file.hidden} />;
  }
  return <img className={`object-scale-down ${className}`} src={content} alt="svg preview" />;
}

SVGThumbnail.propTypes = {
  className: PropTypes.string,
  file: FileShape.isRequired,
};

SVGThumbnail.defaultProps = {
  className: '',
};

function Thumbnail({ className, file, size }) {
  const dispatch = useDispatch();

  const accessToken = useSelector(selectAccessToken);
  const cachedThumbnail = useSelector((state) => getThumbnailById(state, file.id));

  const { name, mediatype, hidden, mtime, thumbnail_url: thumbnailUrl } = file;

  const fileIcon = <FileIcon className={className} mediatype={mediatype} hidden={hidden} />;

  if (thumbnailUrl != null) {
    const src = new URL(thumbnailUrl);
    src.searchParams.set('size', size);
    src.searchParams.set('mtime', mtime);
    return (
      <ProtectedImage
        className={`object-scale-down ${className}`}
        src={src.toString()}
        alt={name}
        accessToken={accessToken}
        cachedImage={cachedThumbnail && cachedThumbnail[size]}
        onLoad={(data) => {
          dispatch(thumbnailCached(file.id, size, URL.createObjectURL(data)));
        }}
      >
        {fileIcon}
      </ProtectedImage>
    );
  }

  if (MediaType.isSVG(mediatype)) {
    return <SVGThumbnail className={className} file={file} />;
  }
  return fileIcon;
}

Thumbnail.propTypes = {
  className: PropTypes.string,
  file: FileShape.isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']),
};

Thumbnail.defaultProps = {
  className: '',
  size: 'xs',
};

export default Thumbnail;
