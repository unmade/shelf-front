import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';

function FileIcon({ className, item }) {
  const { is_dir: isDir, name, hidden } = item;

  if (isDir) {
    const color = (hidden) ? 'text-blue-200' : 'text-blue-400';
    return (
      <icons.Folder className={`${color} ${className}`} />
    );
  }

  const color = (hidden) ? 'text-gray-300' : 'text-gray-400';
  const ext = `.${name.split('.').pop()}`;
  const Icon = icons.getIconByExt(ext);
  return (
    <Icon className={`${color} ${className}`} />
  );
}

FileIcon.propTypes = {
  className: PropTypes.string,
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    hidden: PropTypes.bool.isRequired,
    is_dir: PropTypes.bool.isRequired,
  }).isRequired,
};

FileIcon.defaultProps = {
  className: '',
};

export default FileIcon;
