import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import * as routes from '../routes';

function FileLink({ children, className, path, preview }) {
  const url = routes.makeFileRoute({ path, asPreview: preview });

  return (
    <Link to={url} className={className}>
      {children}
    </Link>
  );
}

FileLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  path: PropTypes.string.isRequired,
  preview: PropTypes.bool,
};

FileLink.defaultProps = {
  className: '',
  preview: false,
};

export default FileLink;
