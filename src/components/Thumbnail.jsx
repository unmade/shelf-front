import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { selectFeatureValue } from '../store/features';
import {
  selectFallbackThumbnail,
  useDownloadContentQuery,
  useGetThumbnailQuery,
} from '../store/files';

import { MediaType, ThumbnailSize, thumbnailSizes } from '../constants';
import { MEGABYTE } from '../filesize';
import { FileShape, SharedLinkFileShape } from '../types';

import Spinner from './ui/Spinner';

import FileIcon from './FileIcon';

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

function ImageThumbnail({ className, file, size, style }) {
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
  const { id, name, mtime } = file;

  const fallbackThumbnail = useSelector((state) =>
    selectFallbackThumbnail(state, { fileId: id, size, mtime }),
  );

  const { data, isFetching: loading } = useGetThumbnailQuery(
    { url: file.thumbnail_url, size, mtime },
    { skip: shouldSkip },
  );

  if (fallbackThumbnail?.content != null && data?.content == null) {
    return (
      <img className={`object-contain ${className}`} src={fallbackThumbnail?.content} alt={name} />
    );
  }

  if (loading || data?.content == null) {
    return <Spinner className={className} />;
  }

  return (
    <img
      className={`object-scale-down ${className}`}
      src={data?.content}
      alt={name}
      style={style}
      loading="lazy"
    />
  );
}

ImageThumbnail.propTypes = {
  className: PropTypes.string,
  file: PropTypes.oneOfType([FileShape.isRequired, SharedLinkFileShape]).isRequired,
  size: PropTypes.oneOf(thumbnailSizes),
  style: PropTypes.shape({
    maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
};

ImageThumbnail.defaultProps = {
  className: '',
  size: ThumbnailSize.xs,
  style: null,
};

function Thumbnail({ className, file, size, style }) {
  const { mediatype, hidden, shared, thumbnail_url: thumbnailUrl } = file;
  const maxSize = useSelector((state) => selectFeatureValue(state, 'max_file_size_to_thumbnail'));
  const fileIcon = (
    <FileIcon className={className} mediatype={mediatype} hidden={hidden} shared={shared} />
  );

  if (file.size > maxSize) {
    return fileIcon;
  }

  if (thumbnailUrl != null) {
    return <ImageThumbnail className={className} file={file} size={size} style={style} />;
  }

  if (MediaType.isSVG(mediatype)) {
    return <SVGThumbnail className={className} file={file} />;
  }

  return fileIcon;
}

Thumbnail.propTypes = {
  className: PropTypes.string,
  file: PropTypes.oneOfType([FileShape, SharedLinkFileShape]).isRequired,
  size: PropTypes.oneOf(thumbnailSizes),
};

Thumbnail.defaultProps = {
  className: '',
  size: ThumbnailSize.xs,
};

export default Thumbnail;
