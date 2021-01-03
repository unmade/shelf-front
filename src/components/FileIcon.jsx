import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';

const TYPE_FOLDER = 'folder';

function FileIcon({ className, item }) {
  const { type, name, hidden } = item;

  if (type === TYPE_FOLDER) {
    const color = (hidden) ? 'text-blue-200' : 'text-blue-400';
    return (
      <icons.Folder className={`${color} ${className}`} />
    );
  }

  const ext = `.${name.split('.').pop()}`;
  const Icon = icons.getIconByExt(ext);
  const color = (hidden) ? 'text-gray-300' : 'text-gray-400';
  return (
    <Icon className={`${color} ${className}`} />
  );
}

FileIcon.propTypes = {
  className: PropTypes.string,
  item: PropTypes.shape({
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    hidden: PropTypes.bool.isRequired,
  }).isRequired,
};

FileIcon.defaultProps = {
  className: '',
};

export default FileIcon;