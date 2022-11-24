import React from 'react';
import PropTypes from 'prop-types';

import { useDownloadContentQuery, useGetThumbnailQuery } from '../store/files';

import { FileShape } from '../types';

import FileIcon from './FileIcon';
import { MEGABYTE } from '../filesize';
import { MediaType } from '../constants';

function SVGThumbnail({ className, file }) {
  const { hidden, mediatype, name, path, size } = file;
  const { data } = useDownloadContentQuery(path, { skip: size > MEGABYTE });

  if (data?.content == null) {
    return <FileIcon className={className} mediatype={mediatype} hidden={hidden} />;
  }
  return <img className={`object-scale-down ${className}`} src={data.content} alt={name} />;
}

SVGThumbnail.propTypes = {
  className: PropTypes.string,
  file: FileShape.isRequired,
};

SVGThumbnail.defaultProps = {
  className: '',
};

function ImageThumbnail({ className, file, size }) {
  const [shouldSkip, setShouldSkip] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setShouldSkip(false);
    }, 150);
    return () => {
      clearTimeout(timeout);
      setShouldSkip(true);
    };
  }, [setShouldSkip]);
  const { id, hidden, name, mediatype, mtime } = file;
  const { data, isFetching: loading } = useGetThumbnailQuery(
    { fileId: id, size, mtime },
    { skip: shouldSkip }
  );

  if (loading || data?.content == null) {
    return <FileIcon className={className} mediatype={mediatype} hidden={hidden} />;
  }

  return <img className={`object-scale-down ${className}`} src={data.content} alt={name} />;
}

ImageThumbnail.propTypes = {
  className: PropTypes.string,
  file: FileShape.isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']),
};

ImageThumbnail.defaultProps = {
  className: '',
  size: 'xs',
};

function Thumbnail({ className, file, size }) {
  const { mediatype, hidden, thumbnail_url: thumbnailUrl } = file;

  if (thumbnailUrl != null) {
    return <ImageThumbnail className={className} file={file} size={size} />;
  }

  if (MediaType.isSVG(mediatype)) {
    return <SVGThumbnail className={className} file={file} />;
  }
  return <FileIcon className={className} mediatype={mediatype} hidden={hidden} />;
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
