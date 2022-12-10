import React from 'react';
import PropTypes from 'prop-types';

import { Link, useResolvedPath } from 'react-router-dom';

import useDirPath from '../hooks/dir-path';
import * as routes from '../routes';
import usePreviewSearchParam from '../hooks/preview-search-param';

const trashPrefix = 'trash/';

function FolderLink({ children, className, path, replace }) {
  const { pathname } = useResolvedPath(routes.encodePath(path));
  const url = pathname.replace(routes.BOOKMARKS.prefix, routes.FILES.prefix);

  return (
    <Link to={url} className={className} replace={replace}>
      {children}
    </Link>
  );
}

function PreviewLink({ children, className, path, replace }) {
  const dirPath = useDirPath();
  const previewSearchParam = usePreviewSearchParam(path);

  const url = `${routes.encodePath(dirPath)}?${previewSearchParam}`;

  return (
    <Link to={url} className={className} replace={replace}>
      {children}
    </Link>
  );
}

function FileLink({ children, className, path, preview, replace }) {
  if (path.toLowerCase().startsWith(trashPrefix)) {
    // eslint-disable-next-line no-param-reassign
    path = path.slice(trashPrefix.length);
  }
  if (path.toLowerCase() === 'trash') {
    // eslint-disable-next-line no-param-reassign
    path = '';
  }

  const Render = preview ? PreviewLink : FolderLink;

  return (
    <Render className={className} path={path} replace={replace}>
      {children}
    </Render>
  );
}

FileLink.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  className: PropTypes.string,
  path: PropTypes.string.isRequired,
  preview: PropTypes.bool,
  replace: PropTypes.bool,
};

FileLink.defaultProps = {
  className: '',
  preview: false,
  replace: false,
};

export default FileLink;
