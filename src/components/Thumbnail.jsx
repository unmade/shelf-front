import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { selectFeatureMaxFileSizeToThumbnail } from 'store/features';
import {
  selectFallbackThumbnail,
  useDownloadContentQuery,
  useGetThumbnailQuery,
} from 'store/files';

import { MediaType, ThumbnailSize, thumbnailSizes } from 'constants';
import { MEGABYTE } from 'components/ui/FileSize';

import Spinner from './ui-legacy/Spinner';

import FileIcon from './FileIcon';

export { ThumbnailSize } from '../constants';

const objectFitClassNameMap = {
  'scale-down': 'object-scale-down',
  contain: 'object-contain',
  cover: 'object-cover',
  fill: 'object-fill',
  none: 'object-none',
};

const ThumbnailFileShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  thumbnail_url: PropTypes.string,
  modified_at: PropTypes.string.isRequired,
});

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
  file: ThumbnailFileShape.isRequired,
};

SVGThumbnail.defaultProps = {
  className: '',
};

function ImageThumbnail({ className, file, size, style, objectFit }) {
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
  const { id, name, modified_at: modifiedAt } = file;
  const mtime = new Date(modifiedAt).getTime();

  const fallbackThumbnail = useSelector((state) =>
    selectFallbackThumbnail(state, { fileId: id, size, mtime }),
  );

  const { data, isFetching: loading } = useGetThumbnailQuery(
    { url: file.thumbnail_url, size, mtime },
    { skip: shouldSkip || file.thumbnail_url?.startsWith('blob:') },
  );

  const objectFitClassName = objectFitClassNameMap[objectFit] || 'object-scale-down';
  if (file.thumbnail_url?.startsWith('blob:')) {
    return (
      <img
        className={`${objectFitClassName} ${className}`}
        src={file.thumbnail_url}
        alt={name}
        style={style}
        loading="lazy"
      />
    );
  }

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
      className={`${objectFitClassName} ${className}`}
      src={data?.content}
      alt={name}
      style={style}
    />
  );
}

ImageThumbnail.propTypes = {
  className: PropTypes.string,
  file: ThumbnailFileShape.isRequired,
  size: PropTypes.oneOf(thumbnailSizes),
  style: PropTypes.shape({
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  objectFit: PropTypes.oneOf(['scale-down', 'contain', 'cover', 'fill', 'none']),
};

ImageThumbnail.defaultProps = {
  className: '',
  size: ThumbnailSize.xs,
  style: null,
  objectFit: 'scale-down',
};

function Thumbnail({ className, file, size, style, objectFit }) {
  const { mediatype, hidden, shared, thumbnail_url: thumbnailUrl } = file;
  const maxSize = useSelector(selectFeatureMaxFileSizeToThumbnail);
  const fileIcon = (
    <FileIcon className={className} mediatype={mediatype} hidden={hidden} shared={shared} />
  );

  if (file.size > maxSize) {
    return fileIcon;
  }

  if (thumbnailUrl != null) {
    return (
      <ImageThumbnail
        className={className}
        file={file}
        size={size}
        style={style}
        objectFit={objectFit}
      />
    );
  }

  if (MediaType.isSVG(mediatype)) {
    return <SVGThumbnail className={className} file={file} />;
  }

  return fileIcon;
}

Thumbnail.propTypes = {
  className: PropTypes.string,
  file: ThumbnailFileShape.isRequired,
  size: PropTypes.oneOf(thumbnailSizes),
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  objectFit: PropTypes.oneOf(['scale-down', 'contain', 'cover', 'fill', 'none']),
};

Thumbnail.defaultProps = {
  className: '',
  size: ThumbnailSize.xs,
  objectFit: 'scale-down',
};

export default Thumbnail;
