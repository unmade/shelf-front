import React from 'react';
import PropTypes from 'prop-types';

import { Link, useRouteMatch } from 'react-router-dom';

function FileLink({ children, name, preview }) {
  const match = useRouteMatch();

  let url;
  if (name === null || name === undefined || name === '') {
    url = match.url;
  } else {
    url = (!preview) ? `${match.url}/${name}` : `${match.url}?preview=${name}`;
  }

  return (
    <Link to={url}>
      {children}
    </Link>
  );
}

FileLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  name: PropTypes.string,
  preview: PropTypes.bool,
};

FileLink.defaultProps = {
  name: null,
  preview: false,
};

export default FileLink;
