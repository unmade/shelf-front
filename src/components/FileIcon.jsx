import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';

import { MediaType } from '../constants';

function FileIcon({ className, hidden, mediatype }) {
  let color;
  if (mediatype === MediaType.FOLDER) {
    color = hidden ? 'text-blue-200 dark:text-blue-500/50' : 'text-blue-400';
  } else {
    color = hidden ? 'text-gray-300 dark:text-zinc-600' : 'text-gray-400 dark:text-zinc-500';
  }

  const Icon = icons.getIcon(mediatype);
  return <Icon className={`${color} ${className}`} />;
}

FileIcon.propTypes = {
  className: PropTypes.string,
  hidden: PropTypes.bool,
  mediatype: PropTypes.string,
};

FileIcon.defaultProps = {
  className: '',
  hidden: false,
  mediatype: null,
};

export default FileIcon;
