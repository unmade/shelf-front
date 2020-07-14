import React from 'react';
import PropTypes from 'prop-types';

import * as icons from '../icons';

const TYPE_FOLDER = 'folder';

function FileIcon({ className, item }) {
  const { type, name } = item;

  if (type === TYPE_FOLDER) {
    return (
      <icons.Folder className={`text-blue-400 ${className}`} />
    );
  }

  const ext = `.${name.split('.').pop()}`;
  const Icon = icons.getIconByExt(ext);
  return (
    <Icon className={`text-gray-400 ${className}`} />
  );
}

FileIcon.propTypes = {
  className: PropTypes.string,
  item: PropTypes.shape({
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

FileIcon.defaultProps = {
  className: '',
};

export default FileIcon;
