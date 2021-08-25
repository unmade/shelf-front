import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import { fetchThumbnail } from '../store/actions/files';

import { getFileById, getThumbnailById } from '../store/reducers/files';

import FileIcon from './FileIcon';

function Thumbnail({ className, deferred, fileId, size }) {
  const dispatch = useDispatch();

  const file = useSelector((state) => getFileById(state, fileId));
  const thumbs = useSelector((state) => getThumbnailById(state, file.id));

  const loaded = (thumbs != null && thumbs[size] != null);
  const shouldLoad = (file.has_thumbnail && !loaded && !deferred);

  const { id, path } = file;

  React.useEffect(() => {
    if (shouldLoad) {
      dispatch(fetchThumbnail(id, path, size));
    }
  }, [id, path, size, deferred, shouldLoad, dispatch]);

  if (file.has_thumbnail && loaded) {
    return <img className={`object-contain ${className}`} src={thumbs[size]} alt={file.name} />;
  }
  return <FileIcon className={className} mediatype={file.mediatype} hidden={file.hidden} />;
}

Thumbnail.propTypes = {
  className: PropTypes.string,
  deferred: PropTypes.bool,
  fileId: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
};

Thumbnail.defaultProps = {
  className: '',
  deferred: false,
  size: 'xs',
};

export default Thumbnail;
