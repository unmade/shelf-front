/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

import { FileType } from '../constants';

import FileIcon from './FileIcon';

function FolderPickerItem({ className, item, onClick }) {
  const primaryText = (item.hidden) ? 'text-gray-500' : 'text-gray-800';
  const isFolder = (item.type === FileType.FOLDER || item.type === FileType.TRASH);

  return (
    <div
      className={`${className} h-full flex flex-row items-center text-sm px-4 rounded-lg`}
      onClick={() => (isFolder) && onClick(item.path)}
    >
      <div className={`flex flex-row items-center space-x-2 ${primaryText}`}>
        <FileIcon item={item} className="w-6 h-6" />
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
  }).isRequired,
};

FolderPickerItem.defaultProps = {
  className: '',
};

export default FolderPickerItem;
