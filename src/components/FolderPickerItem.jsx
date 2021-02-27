/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

import { MediaType } from '../constants';

import FileIcon from './FileIcon';

function FolderPickerItem({ className, item, onClick }) {
  const primaryText = (item.hidden) ? 'text-gray-500' : 'text-gray-800';
  const isFolder = item.mediatype === MediaType.FOLDER;

  return (
    <div
      className={`${className} h-full flex flex-row items-center text-sm px-4 rounded-lg`}
      onClick={() => (isFolder) && onClick(item.path)}
    >
      <div className={`flex flex-row items-center space-x-2 ${primaryText}`}>
        <FileIcon className="w-7 h-7" mediatype={item.mediatype} hidden={item.hidden} />
        {(isFolder) ? (
          <button type="button">
            {item.name}
          </button>
        ) : (
          <div>
            {item.name}
          </div>
        )}
      </div>
    </div>
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
