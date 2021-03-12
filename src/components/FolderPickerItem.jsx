import React from 'react';
import PropTypes from 'prop-types';

import { MediaType } from '../constants';

import FileIcon from './FileIcon';

function FolderPickerItem({ className, item, onClick }) {
  const primaryText = (item.hidden) ? 'text-gray-500' : 'text-gray-800';
  const isFolder = item.mediatype === MediaType.FOLDER;
  const cursor = (isFolder) ? '' : 'cursor-default';

  return (
    <button
      type="button"
      className={`${className} w-full h-full px-4 rounded-lg ${cursor} focus:outline-none`}
      onClick={() => (isFolder) && onClick(item.path)}
      disabled={!isFolder}
    >
      <div className={`min-w-0 text-sm flex flex-row items-center space-x-2 ${primaryText}`}>
        <div>
          <FileIcon className="w-7 h-7" mediatype={item.mediatype} hidden={item.hidden} />
        </div>
        <p className="truncate">
          {item.name}
        </p>
      </div>
    </button>
  );
}

FolderPickerItem.propTypes = {
  className: PropTypes.string,
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    hidden: PropTypes.bool.isRequired,
    mediatype: PropTypes.string.isRequired,
  }).isRequired,
};

FolderPickerItem.defaultProps = {
  className: '',
};

export default FolderPickerItem;
