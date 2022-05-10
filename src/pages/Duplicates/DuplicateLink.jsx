import React from 'react';
import PropTypes from 'prop-types';

import { Link, useParams } from 'react-router-dom';

import * as routes from '../../routes';

function usePreviewPath(path) {
  const params = useParams();
  const dirPath = decodeURIComponent(params.dirPath ?? '');
  if (path.startsWith(dirPath)) {
    return path.replace(dirPath, '').substring(1);
  }
  return path;
}

function DuplicateLink({ children, className, path, replace }) {
  const previewPath = usePreviewPath(path);
  const queryParams = { preview: previewPath };
  const defaultPrefix = routes.DUPLICATES.prefix;
  const url = routes.makeUrlFromPath({ path, queryParams, defaultPrefix });

  return (
    <Link to={url} className={className} replace={replace}>
      {children}
    </Link>
  );
}

DuplicateLink.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  className: PropTypes.string,
  path: PropTypes.string.isRequired,
  replace: PropTypes.bool,
};

DuplicateLink.defaultProps = {
  className: '',
  replace: false,
};

export default DuplicateLink;
