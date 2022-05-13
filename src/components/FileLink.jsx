import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import * as routes from '../routes';

function FileLink({ children, className, path, preview, replace }) {
  let pathParams = { path };
  if (preview) {
    pathParams = {
      path: routes.parent(path),
      queryParams: {
        preview: routes.basename(path),
      },
    };
  }

  const url = routes.makeUrlFromPath(pathParams);

  return (
    <Link to={url} className={className} replace={replace}>
      {children}
    </Link>
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
