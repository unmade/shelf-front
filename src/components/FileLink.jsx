import React from 'react';
import PropTypes from 'prop-types';

import { Link, useRouteMatch } from 'react-router-dom';

import * as routes from '../routes';

function FileLink({ children, className, name, preview }) {
  const match = useRouteMatch();

  let url;
  if (name === null || name === undefined || name === '') {
    url = match.url;
  } else {
    url = (!preview) ? routes.join(match.url, name) : `${match.url}?preview=${name}`;
  }

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
  name: PropTypes.string,
  preview: PropTypes.bool,
};

FileLink.defaultProps = {
  className: '',
  name: null,
  preview: false,
};

export default FileLink;
