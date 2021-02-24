import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';

import { MediaType } from '../constants';

function FileIcon({ className, item }) {
  const { hidden, mediatype } = item;

  let color;
  if (mediatype === MediaType.FOLDER) {
    color = (hidden) ? 'text-blue-200' : 'text-blue-400';
  } else {
    color = (hidden) ? 'text-gray-300' : 'text-gray-400';
  }

  const Icon = icons.getIcon(mediatype);
  return (
    <Icon className={`${color} ${className}`} />
  );
}

FileIcon.propTypes = {
  className: PropTypes.string,
  item: PropTypes.shape({
    hidden: PropTypes.bool.isRequired,
    mediatype: PropTypes.string.isRequired,
  }).isRequired,
};

FileIcon.defaultProps = {
  className: '',
};

export default FileIcon;
